#!/bin/bash

# SSL Certificate Setup Script for AADU Website
# This script sets up SSL certificates using Let's Encrypt

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
PROJECT_NAME="aadu-website"
DOMAIN="your-domain.com"  # Change this to your actual domain
EMAIL="your-email@example.com"  # Change this to your email

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

log "Starting SSL certificate setup for $DOMAIN..."

# Check if domain is configured
if [ "$DOMAIN" = "your-domain.com" ]; then
    error "Please update the DOMAIN variable in this script with your actual domain name"
fi

if [ "$EMAIL" = "your-email@example.com" ]; then
    error "Please update the EMAIL variable in this script with your actual email address"
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
sudo nginx -t

# Obtain SSL certificate
log "Obtaining SSL certificate for $DOMAIN..."
sudo certbot --nginx -d $DOMAIN -d www.$DOMAIN --email $EMAIL --agree-tos --non-interactive

# Test certificate renewal
log "Testing certificate renewal..."
sudo certbot renew --dry-run

# Set up automatic renewal
log "Setting up automatic certificate renewal..."
sudo crontab -l 2>/dev/null | { cat; echo "0 12 * * * /usr/bin/certbot renew --quiet"; } | sudo crontab -

# Verify SSL configuration
log "Verifying SSL configuration..."
if curl -I https://$DOMAIN > /dev/null 2>&1; then
    log "✅ SSL certificate is working correctly"
else
    warn "SSL certificate might not be working. Please check your domain DNS settings."
fi

# Show certificate information
log "Certificate information:"
sudo certbot certificates

log "SSL setup completed successfully!"
echo ""
echo -e "${BLUE}SSL Certificate Information:${NC}"
echo "- Domain: $DOMAIN"
echo "- Certificate will auto-renew"
echo "- Renewal cron job has been set up"
echo ""
echo -e "${YELLOW}Next steps:${NC}"
echo "1. Test your website at https://$DOMAIN"
echo "2. Set up monitoring for certificate expiration"
echo "3. Consider setting up HSTS headers for additional security"

