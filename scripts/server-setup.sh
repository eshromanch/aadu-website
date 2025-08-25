#!/bin/bash

# AADU Website Server Setup Script for Contabo VPS
# This script sets up a production server for the AADU website

set -e  # Exit on any error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
PROJECT_NAME="aadu-website"
PROJECT_DIR="/var/www/projects/$PROJECT_NAME"
DOMAIN="your-domain.com"  # Change this to your actual domain
EMAIL="your-email@example.com"  # Change this to your email
GITHUB_REPO="https://github.com/eshromanch/aadu-website.git"

# Logging function
log() {
    echo -e "${GREEN}[$(date +'%Y-%m-%d %H:%M:%S')] $1${NC}"
}

warn() {
    echo -e "${YELLOW}[$(date +'%Y-%m-%d %H:%M:%S')] WARNING: $1${NC}"
}

error() {
    echo -e "${RED}[$(date +'%Y-%m-%d %H:%M:%S')] ERROR: $1${NC}"
    exit 1
}

# Check if running as root
if [[ $EUID -eq 0 ]]; then
   error "This script should not be run as root. Please run as a regular user with sudo privileges."
fi

log "Starting AADU Website server setup..."

# Update system
log "Updating system packages..."
sudo apt update && sudo apt upgrade -y

# Install essential packages
log "Installing essential packages..."
sudo apt install -y curl wget git unzip software-properties-common apt-transport-https ca-certificates gnupg lsb-release

# Install Node.js 20.x
log "Installing Node.js 20.x..."
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs

# Verify Node.js installation
NODE_VERSION=$(node --version)
NPM_VERSION=$(npm --version)
log "Node.js version: $NODE_VERSION"
log "npm version: $NPM_VERSION"

# Install PM2 globally
log "Installing PM2 process manager..."
sudo npm install -g pm2

# Install Nginx
log "Installing Nginx..."
sudo apt install -y nginx

# Install MongoDB
log "Installing MongoDB..."
wget -qO - https://www.mongodb.org/static/pgp/server-7.0.asc | sudo apt-key add -
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu jammy/mongodb-org/7.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-7.0.list
sudo apt update
sudo apt install -y mongodb-org

# Start and enable MongoDB
log "Starting MongoDB service..."
sudo systemctl start mongod
sudo systemctl enable mongod

# Install Certbot for SSL
log "Installing Certbot for SSL certificates..."
sudo apt install -y certbot python3-certbot-nginx

# Create project directory
log "Creating project directory..."
sudo mkdir -p $PROJECT_DIR
sudo chown $USER:$USER $PROJECT_DIR

# Create backups directory
mkdir -p $PROJECT_DIR/backups

# Clone the repository
log "Cloning the repository..."
cd $PROJECT_DIR
git clone $GITHUB_REPO app

# Create ecosystem.config.js for PM2
log "Creating PM2 ecosystem configuration..."
cat > $PROJECT_DIR/ecosystem.config.js << 'EOF'
module.exports = {
  apps: [{
    name: 'aadu-website',
    script: 'npm',
    args: 'start',
    cwd: './app',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'production',
      PORT: 3001
    },
    error_file: './logs/err.log',
    out_file: './logs/out.log',
    log_file: './logs/combined.log',
    time: true
  }]
};
EOF

# Create logs directory
mkdir -p $PROJECT_DIR/logs

# Create .env.production template
log "Creating environment file template..."
cat > $PROJECT_DIR/app/.env.production.template << 'EOF'
# Database Configuration
MONGODB_URI=mongodb://localhost:27017/aadu_website

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-change-this

# Application Configuration
NODE_ENV=production
PORT=3001

# Optional: External MongoDB (if using MongoDB Atlas)
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/aadu_website
EOF

# Create Nginx configuration
log "Creating Nginx configuration..."
sudo tee /etc/nginx/sites-available/$PROJECT_NAME > /dev/null << EOF
server {
    listen 80;
    server_name $DOMAIN www.$DOMAIN;
    
    # Redirect HTTP to HTTPS
    return 301 https://\$server_name\$request_uri;
}

server {
    listen 443 ssl http2;
    server_name $DOMAIN www.$DOMAIN;
    
    # SSL configuration will be added by Certbot
    
    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header Referrer-Policy "no-referrer-when-downgrade" always;
    add_header Content-Security-Policy "default-src 'self' http: https: data: blob: 'unsafe-inline'" always;
    
    # Gzip compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_proxied expired no-cache no-store private must-revalidate auth;
    gzip_types text/plain text/css text/xml text/javascript application/x-javascript application/xml+rss application/javascript;
    
    # Client max body size for file uploads
    client_max_body_size 50M;
    
    # Proxy to Next.js application
    location / {
        proxy_pass http://localhost:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
        proxy_cache_bypass \$http_upgrade;
        proxy_read_timeout 86400;
    }
    
    # Serve static files directly
    location /_next/static/ {
        alias /var/www/projects/$PROJECT_NAME/app/.next/static/;
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
    
    # Serve public files
    location /public/ {
        alias /var/www/projects/$PROJECT_NAME/app/public/;
        expires 1y;
        add_header Cache-Control "public";
    }
    
    # Health check endpoint
    location /health {
        access_log off;
        return 200 "healthy\n";
        add_header Content-Type text/plain;
    }
}
EOF

# Enable the site
sudo ln -sf /etc/nginx/sites-available/$PROJECT_NAME /etc/nginx/sites-enabled/
sudo rm -f /etc/nginx/sites-enabled/default

# Test Nginx configuration
log "Testing Nginx configuration..."
sudo nginx -t

# Create firewall rules
log "Setting up firewall..."
sudo ufw allow ssh
sudo ufw allow 'Nginx Full'
sudo ufw allow 3001
sudo ufw --force enable

# Create deployment script
log "Creating deployment script..."
cat > $PROJECT_DIR/deploy.sh << 'EOF'
#!/bin/bash

set -e

PROJECT_DIR="/var/www/projects/aadu-website"
cd $PROJECT_DIR

# Stop the application
pm2 stop aadu-website || true

# Backup current version
if [ -d "app" ]; then
    cp -r app backups/app-$(date +%Y%m%d_%H%M%S)
    # Keep only last 5 backups
    ls -t backups/ | tail -n +6 | xargs -I {} rm -rf backups/{}
fi

# Remove existing app directory for fresh clone
rm -rf app

# Clone latest code
git clone https://github.com/eshromanch/aadu-website.git app

cd app

# Copy environment file if it exists
if [ -f "../.env.production" ]; then
    cp ../.env.production .
fi

# Install dependencies and build
npm ci
npm run build

# Copy ecosystem config to app directory
cp ../ecosystem.config.js .

# Start/restart with PM2
pm2 start ecosystem.config.js || pm2 restart aadu-website

# Test and reload Nginx
sudo nginx -t && sudo systemctl reload nginx

# Wait for application to start
sleep 10

# Health check
if curl -f http://localhost:3001/api/health || curl -f http://localhost:3001; then
    echo "✅ Application is running successfully"
else
    echo "❌ Application failed to start"
    exit 1
fi

echo "Deployment completed successfully!"
EOF

chmod +x $PROJECT_DIR/deploy.sh

# Create maintenance script
log "Creating maintenance script..."
cat > $PROJECT_DIR/maintenance.sh << 'EOF'
#!/bin/bash

PROJECT_DIR="/var/www/projects/aadu-website"

echo "AADU Website Maintenance Script"
echo "================================"
echo "1. View application logs"
echo "2. Restart application"
echo "3. View system resources"
echo "4. Backup database"
echo "5. Update system packages"
echo "6. Exit"

read -p "Choose an option (1-6): " choice

case $choice in
    1)
        echo "Application logs:"
        pm2 logs aadu-website --lines 50
        ;;
    2)
        echo "Restarting application..."
        pm2 restart aadu-website
        ;;
    3)
        echo "System resources:"
        pm2 monit
        ;;
    4)
        echo "Backing up database..."
        mongodump --db aadu_website --out $PROJECT_DIR/backups/db-$(date +%Y%m%d_%H%M%S)
        echo "Database backup completed"
        ;;
    5)
        echo "Updating system packages..."
        sudo apt update && sudo apt upgrade -y
        ;;
    6)
        echo "Exiting..."
        exit 0
        ;;
    *)
        echo "Invalid option"
        ;;
esac
EOF

chmod +x $PROJECT_DIR/maintenance.sh

# Create systemd service for PM2
log "Setting up PM2 startup script..."
pm2 startup
pm2 save

# Set proper permissions
log "Setting proper permissions..."
sudo chown -R $USER:$USER $PROJECT_DIR
sudo chmod -R 755 $PROJECT_DIR

# Create a simple health check script
log "Creating health check script..."
cat > $PROJECT_DIR/health-check.sh << 'EOF'
#!/bin/bash

# Health check for AADU website
if curl -f http://localhost:3001/api/health > /dev/null 2>&1; then
    echo "✅ Application is healthy"
    exit 0
else
    echo "❌ Application is not responding"
    exit 1
fi
EOF

chmod +x $PROJECT_DIR/health-check.sh

# Final instructions
log "Server setup completed!"
echo ""
echo -e "${BLUE}Next steps:${NC}"
echo "1. Update the domain name in /etc/nginx/sites-available/$PROJECT_NAME"
echo "2. Configure your environment variables in $PROJECT_DIR/app/.env.production"
echo "3. Run the deployment script: cd $PROJECT_DIR && ./deploy.sh"
echo "4. Set up SSL certificate: sudo certbot --nginx -d $DOMAIN"
echo "5. Configure your domain DNS to point to this server's IP"
echo ""
echo -e "${BLUE}Useful commands:${NC}"
echo "- View logs: pm2 logs aadu-website"
echo "- Monitor: pm2 monit"
echo "- Restart: pm2 restart aadu-website"
echo "- Maintenance: cd $PROJECT_DIR && ./maintenance.sh"
echo ""
echo -e "${YELLOW}Don't forget to:${NC}"
echo "- Change the JWT_SECRET in .env.production"
echo "- Update MongoDB connection string if using external database"
echo "- Configure your domain DNS settings"
echo "- Set up regular backups"

