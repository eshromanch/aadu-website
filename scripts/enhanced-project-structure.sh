#!/bin/bash

# Enhanced Project Structure Script for Multi-Client Hosting
# Based on your existing project_structure.sh

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
PROJECTS_DIR="/var/www/projects"
SCRIPTS_DIR="/var/www/scripts"
START_PORT=3001
MAX_CLIENTS=10

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

# Function to create a new client project with port allocation
create_client_project() {
    local client_name=$1
    local client_domain=$2
    local port=$3
    
    log "Creating project structure for client: $client_name (Port: $port)"
    
    # Create client directory
    sudo mkdir -p $PROJECTS_DIR/$client_name
    
    # Create subdirectories
    sudo mkdir -p $PROJECTS_DIR/$client_name/{app,logs,backups,ssl,config}
    
    # Create ecosystem.config.js for PM2
    cat > $PROJECTS_DIR/$client_name/ecosystem.config.js << EOF
module.exports = {
  apps: [{
    name: '$client_name',
    script: 'npm',
    args: 'start',
    cwd: './app',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'production',
      PORT: $port
    },
    error_file: './logs/err.log',
    out_file: './logs/out.log',
    log_file: './logs/combined.log',
    time: true
  }]
};
EOF
    
    # Create .env.production template
    cat > $PROJECTS_DIR/$client_name/app/.env.production.template << EOF
# Database Configuration
MONGODB_URI=mongodb://localhost:27017/${client_name}_db

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-change-this

# Application Configuration
NODE_ENV=production
PORT=$port

# Domain Configuration
DOMAIN=$client_domain
EOF
    
    # Create deployment script
    cat > $PROJECTS_DIR/$client_name/deploy.sh << 'EOF'
#!/bin/bash

set -e

PROJECT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
CLIENT_NAME=$(basename $PROJECT_DIR)

echo "🚀 Deploying $CLIENT_NAME..."

# Stop the application
pm2 stop $CLIENT_NAME || true

# Backup current version
if [ -d "app" ]; then
    mkdir -p backups
    cp -r app backups/app-$(date +%Y%m%d_%H%M%S)
    # Keep only last 5 backups
    ls -t backups/ | tail -n +6 | xargs -I {} rm -rf backups/{}
fi

# Remove existing app directory for fresh clone
rm -rf app

# Clone latest code (you'll need to update this for each client)
git clone https://github.com/your-username/$CLIENT_NAME.git app

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
pm2 start ecosystem.config.js || pm2 restart $CLIENT_NAME

# Test and reload Nginx
sudo nginx -t && sudo systemctl reload nginx

# Wait for application to start
sleep 10

# Health check
if curl -f http://localhost:$(grep PORT .env.production | cut -d'=' -f2) > /dev/null 2>&1; then
    echo "✅ $CLIENT_NAME is running successfully"
else
    echo "❌ $CLIENT_NAME failed to start"
    exit 1
fi

echo "Deployment completed successfully!"
EOF
    
    chmod +x $PROJECTS_DIR/$client_name/deploy.sh
    
    # Set ownership
    sudo chown -R $USER:www-data $PROJECTS_DIR/$client_name
    sudo chmod -R 755 $PROJECTS_DIR/$client_name
    
    # Create client info file
    cat > $PROJECTS_DIR/$client_name/client-info.txt << EOF
Client Name: $client_name
Domain: $client_domain
Port: $port
Created: $(date)
Status: Active
EOF
    
    log "Project structure created for $client_name (Port: $port)"
}

# Function to list all clients
list_clients() {
    echo "📋 Current Clients:"
    echo "=================="
    
    for dir in $PROJECTS_DIR/*; do
        if [ -d "$dir" ]; then
            client_name=$(basename "$dir")
            if [ -f "$dir/client-info.txt" ]; then
                echo "✅ $client_name"
                cat "$dir/client-info.txt" | grep -E "(Domain|Port|Status)"
            else
                echo "⚠️  $client_name (No info file)"
            fi
            echo ""
        fi
    done
}

# Function to get next available port
get_next_port() {
    local used_ports=()
    
    # Get currently used ports
    for dir in $PROJECTS_DIR/*; do
        if [ -d "$dir" ] && [ -f "$dir/client-info.txt" ]; then
            port=$(grep "Port:" "$dir/client-info.txt" | cut -d' ' -f2)
            used_ports+=($port)
        fi
    done
    
    # Find next available port
    local port=$START_PORT
    while [[ " ${used_ports[@]} " =~ " ${port} " ]]; do
        ((port++))
    done
    
    echo $port
}

# Main execution
echo "🏗️  Enhanced Project Structure Setup"
echo "=================================="

# Create main directories
log "Creating main project directories..."
sudo mkdir -p $PROJECTS_DIR
sudo mkdir -p $SCRIPTS_DIR

# Set ownership
sudo chown -R $USER:$USER $PROJECTS_DIR
sudo chown -R $USER:$USER $SCRIPTS_DIR

# Check if we're creating a specific client or listing
if [ "$1" = "list" ]; then
    list_clients
    exit 0
fi

if [ "$1" = "create" ] && [ -n "$2" ] && [ -n "$3" ]; then
    client_name=$2
    client_domain=$3
    port=$(get_next_port)
    
    if [ $port -gt $((START_PORT + MAX_CLIENTS - 1)) ]; then
        error "Maximum number of clients reached ($MAX_CLIENTS)"
    fi
    
    create_client_project "$client_name" "$client_domain" "$port"
    
    log "Client $client_name created successfully!"
    log "Next steps:"
    log "1. Update DNS: Point $client_domain to your server IP"
    log "2. Run: ./scripts/setup-nginx.sh $client_name $client_domain"
    log "3. Run: ./scripts/setup-ssl.sh $client_domain"
    
elif [ "$1" = "create" ]; then
    error "Usage: $0 create <client_name> <domain>"
    echo "Example: $0 create aadu-website aadu.online"
    
else
    echo "Usage:"
    echo "  $0 list                           - List all clients"
    echo "  $0 create <client_name> <domain>  - Create new client"
    echo ""
    echo "Examples:"
    echo "  $0 create aadu-website aadu.online"
    echo "  $0 create client-01 client1.com"
fi
