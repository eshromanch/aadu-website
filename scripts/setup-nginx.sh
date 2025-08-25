#!/bin/bash

# Enhanced Nginx Setup Script for Multi-Client Hosting
# Based on your existing server_setup.sh

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
PROJECTS_DIR="/var/www/projects"
NGINX_SITES_AVAILABLE="/etc/nginx/sites-available"
NGINX_SITES_ENABLED="/etc/nginx/sites-enabled"

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

# Function to create Nginx configuration for a client
create_nginx_config() {
    local client_name=$1
    local client_domain=$2
    local port=$3
    
    log "Creating Nginx configuration for $client_name ($client_domain -> port $port)"
    
    # Create Nginx configuration
    cat > $NGINX_SITES_AVAILABLE/$client_name << EOF
# Nginx configuration for $client_name
# Domain: $client_domain
# Port: $port

server {
    listen 80;
    server_name $client_domain www.$client_domain;
    
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
    gzip_proxied any;
    gzip_types text/plain text/css text/xml text/javascript application/x-javascript application/xml+rss application/javascript;
    
    # Client max body size for file uploads
    client_max_body_size 50M;
    
    # Proxy to Next.js application
                location / {
                proxy_pass http://localhost:3000;
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
        proxy_pass http://localhost:3000;
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
    
    # Serve public files
    location /public/ {
        proxy_pass http://localhost:3000;
        expires 1y;
        add_header Cache-Control "public";
    }
    
    # API routes
    location /api/ {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
    }
    
    # Health check endpoint
    location /health {
        access_log off;
        return 200 "healthy\n";
        add_header Content-Type text/plain;
    }
    
    # Logs
    access_log /var/log/nginx/$client_name.access.log;
    error_log /var/log/nginx/$client_name.error.log;
}
EOF
    
    # Enable the site
    sudo ln -sf $NGINX_SITES_AVAILABLE/$client_name $NGINX_SITES_ENABLED/
    
    log "Nginx configuration created for $client_name"
}

# Function to remove Nginx configuration
remove_nginx_config() {
    local client_name=$1
    
    log "Removing Nginx configuration for $client_name"
    
    # Remove from sites-enabled
    sudo rm -f $NGINX_SITES_ENABLED/$client_name
    
    # Remove from sites-available
    sudo rm -f $NGINX_SITES_AVAILABLE/$client_name
    
    log "Nginx configuration removed for $client_name"
}

# Function to list all Nginx configurations
list_nginx_configs() {
    echo "📋 Current Nginx Configurations:"
    echo "================================"
    
    for config in $NGINX_SITES_AVAILABLE/*; do
        if [ -f "$config" ]; then
            client_name=$(basename "$config")
            echo "✅ $client_name"
            
            # Extract domain and port from config
            domain=$(grep "server_name" "$config" | head -1 | awk '{print $2}' | sed 's/;//')
            port=$(grep "proxy_pass.*localhost:" "$config" | head -1 | sed 's/.*localhost://' | sed 's/;.*//')
            
            echo "   Domain: $domain"
            echo "   Port: $port"
            echo ""
        fi
    done
}

# Function to test Nginx configuration
test_nginx_config() {
    log "Testing Nginx configuration..."
    
    if sudo nginx -t; then
        log "✅ Nginx configuration is valid"
        return 0
    else
        error "❌ Nginx configuration has errors"
        return 1
    fi
}

# Function to reload Nginx
reload_nginx() {
    log "Reloading Nginx..."
    
    if test_nginx_config; then
        sudo systemctl reload nginx
        log "✅ Nginx reloaded successfully"
    else
        error "❌ Failed to reload Nginx"
    fi
}

# Main execution
echo "🌐 Enhanced Nginx Setup for Multi-Client Hosting"
echo "================================================"

# Check if Nginx is installed
if ! command -v nginx &> /dev/null; then
    error "Nginx is not installed. Please run server_setup.sh first."
fi

# Check arguments
if [ "$1" = "create" ] && [ -n "$2" ] && [ -n "$3" ]; then
    client_name=$2
    client_domain=$3
    
    # Get port from client info
    if [ -f "$PROJECTS_DIR/$client_name/client-info.txt" ]; then
        port=$(grep "Port:" "$PROJECTS_DIR/$client_name/client-info.txt" | cut -d' ' -f2)
    else
        error "Client info not found. Please create client first with enhanced-project-structure.sh"
    fi
    
    create_nginx_config "$client_name" "$client_domain" "$port"
    reload_nginx
    
    log "Nginx setup completed for $client_name!"
    log "Next steps:"
    log "1. Update DNS: Point $client_domain to your server IP"
    log "2. Run: ./scripts/setup-ssl.sh $client_domain"
    
elif [ "$1" = "remove" ] && [ -n "$2" ]; then
    client_name=$2
    remove_nginx_config "$client_name"
    reload_nginx
    log "Nginx configuration removed for $client_name"
    
elif [ "$1" = "list" ]; then
    list_nginx_configs
    
elif [ "$1" = "test" ]; then
    test_nginx_config
    
elif [ "$1" = "reload" ]; then
    reload_nginx
    
elif [ "$1" = "create" ]; then
    error "Usage: $0 create <client_name> <domain>"
    echo "Example: $0 create aadu-website aadu.online"
    
else
    echo "Usage:"
    echo "  $0 create <client_name> <domain>  - Create Nginx config for client"
    echo "  $0 remove <client_name>           - Remove Nginx config for client"
    echo "  $0 list                           - List all Nginx configurations"
    echo "  $0 test                           - Test Nginx configuration"
    echo "  $0 reload                         - Reload Nginx"
    echo ""
    echo "Examples:"
    echo "  $0 create aadu-website aadu.online"
    echo "  $0 remove aadu-website"
fi
