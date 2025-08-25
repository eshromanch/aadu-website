#!/bin/bash

# Enhanced SSL Setup Script for Multi-Client Hosting
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

# Function to setup SSL for a domain
setup_ssl() {
    local domain=$1
    local email=$2
    
    log "Setting up SSL certificate for $domain"
    
    # Check if domain is provided
    if [ -z "$domain" ]; then
        error "Domain name is required"
    fi
    
    # Check if email is provided
    if [ -z "$email" ]; then
        error "Email address is required for SSL certificates"
    fi
    
    # Check if Certbot is installed
    if ! command -v certbot &> /dev/null; then
        log "Installing Certbot..."
        sudo apt update
        sudo apt install -y certbot python3-certbot-nginx
    fi
    
    # Check if Nginx is running
    if ! sudo systemctl is-active --quiet nginx; then
        log "Starting Nginx..."
        sudo systemctl start nginx
    fi
    
    # Test Nginx configuration
    log "Testing Nginx configuration..."
    if ! sudo nginx -t; then
        error "Nginx configuration has errors. Please fix them first."
    fi
    
    # Check if domain is already configured in Nginx
    if ! grep -q "server_name.*$domain" /etc/nginx/sites-available/*; then
        error "Domain $domain is not configured in Nginx. Please run setup-nginx.sh first."
    fi
    
    # Obtain SSL certificate
    log "Obtaining SSL certificate for $domain..."
    if sudo certbot --nginx -d $domain -d www.$domain --email $email --agree-tos --non-interactive; then
        log "✅ SSL certificate obtained successfully for $domain"
    else
        error "❌ Failed to obtain SSL certificate for $domain"
    fi
    
    # Test certificate renewal
    log "Testing certificate renewal..."
    if sudo certbot renew --dry-run; then
        log "✅ Certificate renewal test passed"
    else
        warn "⚠️  Certificate renewal test failed"
    fi
    
    # Set up automatic renewal
    log "Setting up automatic certificate renewal..."
    (sudo crontab -l 2>/dev/null; echo "0 12 * * * /usr/bin/certbot renew --quiet") | sudo crontab -
    
    log "SSL setup completed for $domain!"
}

# Function to remove SSL certificate
remove_ssl() {
    local domain=$1
    
    log "Removing SSL certificate for $domain"
    
    if sudo certbot delete --cert-name $domain; then
        log "✅ SSL certificate removed for $domain"
    else
        warn "⚠️  No SSL certificate found for $domain"
    fi
}

# Function to list all SSL certificates
list_ssl_certs() {
    echo "🔒 Current SSL Certificates:"
    echo "============================"
    
    if sudo certbot certificates 2>/dev/null; then
        echo ""
        log "SSL certificates listed successfully"
    else
        echo "No SSL certificates found"
    fi
}

# Function to renew all certificates
renew_all_certs() {
    log "Renewing all SSL certificates..."
    
    if sudo certbot renew; then
        log "✅ All SSL certificates renewed successfully"
    else
        error "❌ Failed to renew SSL certificates"
    fi
}

# Function to check certificate status
check_cert_status() {
    local domain=$1
    
    if [ -z "$domain" ]; then
        error "Domain name is required"
    fi
    
    log "Checking SSL certificate status for $domain..."
    
    # Check if certificate exists
    if sudo certbot certificates | grep -q "$domain"; then
        log "✅ SSL certificate exists for $domain"
        
        # Get expiration date
        expiry=$(sudo certbot certificates | grep -A 5 "$domain" | grep "VALID" | awk '{print $2}')
        echo "   Expires: $expiry"
        
        # Check if certificate is valid
        if sudo certbot certificates | grep -A 5 "$domain" | grep -q "VALID"; then
            log "✅ Certificate is valid"
        else
            warn "⚠️  Certificate may be expired or invalid"
        fi
    else
        warn "⚠️  No SSL certificate found for $domain"
    fi
}

# Main execution
echo "🔒 Enhanced SSL Setup for Multi-Client Hosting"
echo "=============================================="

# Check arguments
if [ "$1" = "setup" ] && [ -n "$2" ] && [ -n "$3" ]; then
    domain=$2
    email=$3
    setup_ssl "$domain" "$email"
    
elif [ "$1" = "remove" ] && [ -n "$2" ]; then
    domain=$2
    remove_ssl "$domain"
    
elif [ "$1" = "list" ]; then
    list_ssl_certs
    
elif [ "$1" = "renew" ]; then
    renew_all_certs
    
elif [ "$1" = "check" ] && [ -n "$2" ]; then
    domain=$2
    check_cert_status "$domain"
    
elif [ "$1" = "setup" ]; then
    error "Usage: $0 setup <domain> <email>"
    echo "Example: $0 setup aadu.online your-email@example.com"
    
else
    echo "Usage:"
    echo "  $0 setup <domain> <email>     - Setup SSL for domain"
    echo "  $0 remove <domain>            - Remove SSL for domain"
    echo "  $0 list                       - List all SSL certificates"
    echo "  $0 renew                      - Renew all certificates"
    echo "  $0 check <domain>             - Check certificate status"
    echo ""
    echo "Examples:"
    echo "  $0 setup aadu.online your-email@example.com"
    echo "  $0 remove aadu.online"
    echo "  $0 check aadu.online"
    echo ""
    echo "Note: Make sure to:"
    echo "1. Configure DNS to point domain to your server IP"
    echo "2. Run setup-nginx.sh first to configure Nginx"
    echo "3. Use a valid email address for SSL notifications"
fi
