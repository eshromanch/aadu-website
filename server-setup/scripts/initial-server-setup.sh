#!/bin/bash

# =============================================================================
# Initial Server Setup Script
# Complete server initialization for multi-tenant hosting
# =============================================================================

set -e  # Exit on any error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

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

# Configuration
SERVER_IP="194.195.90.237"
DOMAIN="athenadevtech.com"
MAIL_DOMAIN="mail.athenadevtech.com"

log "Starting initial server setup for multi-tenant hosting..."

# =============================================================================
# Step 1: System Update and Basic Packages
# =============================================================================

log "Step 1: Updating system and installing basic packages..."

# Update system
apt update && apt upgrade -y

# Install essential packages
apt install -y \
    curl \
    wget \
    git \
    htop \
    vim \
    nano \
    unzip \
    zip \
    ufw \
    fail2ban \
    certbot \
    python3-certbot-nginx \
    software-properties-common \
    apt-transport-https \
    ca-certificates \
    gnupg \
    lsb-release

# =============================================================================
# Step 2: Install Node.js and PM2
# =============================================================================

log "Step 2: Installing Node.js and PM2..."

# Install Node.js 20 LTS
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt-get install -y nodejs

# Install PM2 globally
npm install -g pm2

# Verify installations
log "Node.js version: $(node --version)"
log "NPM version: $(npm --version)"
log "PM2 version: $(pm2 --version)"

# =============================================================================
# Step 3: Install Docker and Docker Compose
# =============================================================================

log "Step 3: Installing Docker and Docker Compose..."

# Install Docker
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg

echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | tee /etc/apt/sources.list.d/docker.list > /dev/null

apt update
apt install -y docker-ce docker-ce-cli containerd.io docker-compose-plugin

# Add current user to docker group
usermod -aG docker $USER

# Start and enable Docker
systemctl start docker
systemctl enable docker

# Verify Docker installation
log "Docker version: $(docker --version)"
log "Docker Compose version: $(docker compose version)"

# =============================================================================
# Step 4: Install and Configure Nginx
# =============================================================================

log "Step 4: Installing and configuring Nginx..."

# Install Nginx
apt install -y nginx

# Create Nginx configuration directory
mkdir -p /etc/nginx/sites-available
mkdir -p /etc/nginx/sites-enabled

# Backup default Nginx configuration
cp /etc/nginx/nginx.conf /etc/nginx/nginx.conf.backup

# Configure Nginx main settings
cat > /etc/nginx/nginx.conf << 'EOF'
user www-data;
worker_processes auto;
pid /run/nginx.pid;
include /etc/nginx/modules-enabled/*.conf;

events {
    worker_connections 768;
    multi_accept on;
}

http {
    sendfile on;
    tcp_nopush on;
    tcp_nodelay on;
    keepalive_timeout 65;
    types_hash_max_size 2048;
    server_tokens off;

    include /etc/nginx/mime.types;
    default_type application/octet-stream;

    # Logging
    access_log /var/log/nginx/access.log;
    error_log /var/log/nginx/error.log;

    # Gzip compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_proxied any;
    gzip_comp_level 6;
    gzip_types
        text/plain
        text/css
        text/xml
        text/javascript
        application/json
        application/javascript
        application/xml+rss
        application/atom+xml
        image/svg+xml;

    # Rate limiting
    limit_req_zone $binary_remote_addr zone=api:10m rate=10r/s;
    limit_req_zone $binary_remote_addr zone=login:10m rate=1r/s;

    # Include site configurations
    include /etc/nginx/conf.d/*.conf;
    include /etc/nginx/sites-enabled/*;
}
EOF

# Start and enable Nginx
systemctl start nginx
systemctl enable nginx

# =============================================================================
# Step 5: Install and Configure MongoDB
# =============================================================================

log "Step 5: Installing and configuring MongoDB..."

# Import MongoDB public key
wget -qO - https://www.mongodb.org/static/pgp/server-6.0.asc | apt-key add -

# Add MongoDB repository
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu jammy/mongodb-org/6.0 multiverse" | tee /etc/apt/sources.list.d/mongodb-org-6.0.list

# Update and install MongoDB
apt update
apt install -y mongodb-org

# Create MongoDB data directory
mkdir -p /data/db
chown -R mongodb:mongodb /data/db

# Configure MongoDB
cat > /etc/mongod.conf << 'EOF'
# mongod.conf

# for documentation of all options, see:
#   http://docs.mongodb.org/manual/reference/configuration-options/

# Where and how to store data.
storage:
  dbPath: /var/lib/mongodb
  journal:
    enabled: true

# where to write logging data.
systemLog:
  destination: file
  logAppend: true
  path: /var/log/mongodb/mongod.log

# network interfaces
net:
  port: 27017
  bindIp: 127.0.0.1

# how the process runs
processManagement:
  timeZoneInfo: /usr/share/zoneinfo

# security
security:
  authorization: disabled
EOF

# Start and enable MongoDB
systemctl start mongod
systemctl enable mongod

# =============================================================================
# Step 6: Configure Firewall (UFW)
# =============================================================================

log "Step 6: Configuring firewall..."

# Reset UFW to default
ufw --force reset

# Set default policies
ufw default deny incoming
ufw default allow outgoing

# Allow SSH
ufw allow ssh

# Allow HTTP and HTTPS
ufw allow 'Nginx Full'

# Allow mail ports
ufw allow 25/tcp   # SMTP
ufw allow 587/tcp  # SMTP Submission
ufw allow 993/tcp  # IMAP SSL
ufw allow 995/tcp  # POP3 SSL

# Allow Docker ports
ufw allow 8080/tcp # Mail server web interface

# Enable UFW
ufw --force enable

# =============================================================================
# Step 7: Configure Fail2ban
# =============================================================================

log "Step 7: Configuring Fail2ban..."

# Configure Fail2ban for SSH
cat > /etc/fail2ban/jail.local << 'EOF'
[DEFAULT]
bantime = 3600
findtime = 600
maxretry = 3

[sshd]
enabled = true
port = ssh
filter = sshd
logpath = /var/log/auth.log
maxretry = 3

[nginx-http-auth]
enabled = true
filter = nginx-http-auth
port = http,https
logpath = /var/log/nginx/error.log
maxretry = 3
EOF

# Start and enable Fail2ban
systemctl start fail2ban
systemctl enable fail2ban

# =============================================================================
# Step 8: Create Directory Structure
# =============================================================================

log "Step 8: Creating directory structure..."

# Create main directories
mkdir -p /var/www/projects
mkdir -p /var/www/global-services
mkdir -p /var/www/backups
mkdir -p /var/www/logs
mkdir -p /var/www/ssl

# Set permissions
chown -R $USER:$USER /var/www
chmod -R 755 /var/www

# Create project structure for AADU
mkdir -p /var/www/projects/aadu-website/{app,logs,backups,ssl,config}

# =============================================================================
# Step 9: Setup Monitoring and Logging
# =============================================================================

log "Step 9: Setting up monitoring and logging..."

# Install monitoring tools
apt install -y htop iotop nethogs

# Create log rotation for applications
cat > /etc/logrotate.d/applications << 'EOF'
/var/www/projects/*/logs/*.log {
    daily
    missingok
    rotate 52
    compress
    delaycompress
    notifempty
    create 644 www-data www-data
}
EOF

# =============================================================================
# Step 10: Setup Backup System
# =============================================================================

log "Step 10: Setting up backup system..."

# Create backup script
cat > /var/www/backups/backup.sh << 'EOF'
#!/bin/bash

BACKUP_DIR="/var/www/backups"
DATE=$(date +%Y%m%d_%H%M%S)

# Create backup directory
mkdir -p $BACKUP_DIR/$DATE

# Backup MongoDB
mongodump --out $BACKUP_DIR/$DATE/mongodb

# Backup application data
tar -czf $BACKUP_DIR/$DATE/applications.tar.gz /var/www/projects

# Backup configurations
tar -czf $BACKUP_DIR/$DATE/configs.tar.gz /etc/nginx /etc/mongod.conf

# Backup mail server data
if [ -d "/var/www/global-services/mail" ]; then
    tar -czf $BACKUP_DIR/$DATE/mail-server.tar.gz /var/www/global-services/mail
fi

# Keep only last 7 days of backups
find $BACKUP_DIR -type d -mtime +7 -exec rm -rf {} \;

echo "Backup completed: $BACKUP_DIR/$DATE"
EOF

chmod +x /var/www/backups/backup.sh

# Add to crontab for daily backups
(crontab -l 2>/dev/null; echo "0 2 * * * /var/www/backups/backup.sh") | crontab -

# =============================================================================
# Step 11: Final Configuration
# =============================================================================

log "Step 11: Final configuration..."

# Create system information file
cat > /var/www/server-info.txt << EOF
Server Setup Information
========================

Server IP: $SERVER_IP
Domain: $DOMAIN
Mail Domain: $MAIL_DOMAIN
Setup Date: $(date)

Services Installed:
- Node.js $(node --version)
- NPM $(npm --version)
- PM2 $(pm2 --version)
- Docker $(docker --version)
- Nginx $(nginx -v 2>&1)
- MongoDB $(mongod --version | head -1)

Directory Structure:
- /var/www/projects/ (Client projects)
- /var/www/global-services/ (Global services)
- /var/www/backups/ (Backup files)
- /var/www/logs/ (Application logs)

Next Steps:
1. Configure SSL certificates
2. Setup mail server
3. Deploy applications
4. Configure monitoring
EOF

# =============================================================================
# Step 12: Verification
# =============================================================================

log "Step 12: Verifying installation..."

# Check all services
log "Checking service status..."

services=("nginx" "mongod" "docker" "fail2ban")
for service in "${services[@]}"; do
    if systemctl is-active --quiet $service; then
        log "✓ $service is running"
    else
        error "$service is not running"
    fi
done

# Check ports
log "Checking open ports..."
ss -tuln | grep -E ':(80|443|22|27017|8080)' || warn "Some expected ports not found"

# Check disk space
log "Checking disk space..."
df -h /

# =============================================================================
# Completion
# =============================================================================

log "Initial server setup completed successfully!"
log "Server information saved to: /var/www/server-info.txt"
log ""
log "Next steps:"
log "1. Reboot the server: sudo reboot"
log "2. Run mail server setup: ./setup-mail-server.sh"
log "3. Configure SSL certificates: ./setup-ssl.sh"
log "4. Deploy applications"
log ""
log "Server is ready for multi-tenant hosting! 🚀"

# Save setup log
echo "Setup completed at $(date)" >> /var/www/setup.log
