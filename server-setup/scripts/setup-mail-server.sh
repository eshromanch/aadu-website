#!/bin/bash

# =============================================================================
# Global Mail Server Setup Script
# Poste.io multi-tenant mail server installation
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

log "Starting global mail server setup..."

# =============================================================================
# Step 1: Create Mail Server Directory
# =============================================================================

log "Step 1: Creating mail server directory structure..."

# Create global services directory
mkdir -p /var/www/global-services/mail
cd /var/www/global-services/mail

# =============================================================================
# Step 2: Create Docker Compose Configuration
# =============================================================================

log "Step 2: Creating Docker Compose configuration..."

cat > docker-compose.yml << 'EOF'
services:
  global-mailserver:
    image: analogic/poste.io
    container_name: global-mailserver
    hostname: mail.athenadevtech.com
    ports:
      - "25:25"      # SMTP
      - "110:110"    # POP3  
      - "143:143"    # IMAP
      - "587:587"    # SMTP Submission
      - "993:993"    # IMAP SSL
      - "995:995"    # POP3 SSL
      - "8080:80"    # Web interface
      - "8443:443"   # Web interface SSL
    environment:
      - HTTPS=OFF
      - DISABLE_CLAMAV=TRUE
    volumes:
      - ./global-mail-data:/data
    restart: unless-stopped
EOF

# =============================================================================
# Step 3: Start Mail Server
# =============================================================================

log "Step 3: Starting mail server..."

# Start the mail server
docker-compose up -d

# Wait for startup
log "Waiting for mail server to start..."
sleep 30

# Check status
if docker-compose ps | grep -q "Up"; then
    log "✓ Mail server is running"
else
    error "Mail server failed to start"
fi

# =============================================================================
# Step 4: Configure Nginx for Mail Server
# =============================================================================

log "Step 4: Configuring Nginx for mail server..."

# Create Nginx configuration for mail server
cat > /etc/nginx/sites-available/global-mail << 'EOF'
server {
    listen 80;
    server_name mail.athenadevtech.com;
    
    # Increase buffer sizes for mail interface
    client_max_body_size 50M;
    proxy_buffering off;
    
    location / {
        proxy_pass http://127.0.0.1:8080;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_set_header X-Forwarded-Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_redirect off;
        
        # Timeout settings
        proxy_connect_timeout 60s;
        proxy_send_timeout 60s;
        proxy_read_timeout 60s;
    }
}
EOF

# Enable the configuration
ln -sf /etc/nginx/sites-available/global-mail /etc/nginx/sites-enabled/

# Test and reload Nginx
if nginx -t; then
    systemctl reload nginx
    log "✓ Nginx configuration updated"
else
    error "Nginx configuration test failed"
fi

# =============================================================================
# Step 5: Create DNS Configuration Guide
# =============================================================================

log "Step 5: Creating DNS configuration guide..."

cat > /var/www/global-services/mail/dns-setup-guide.txt << EOF
DNS Configuration Required
==========================

For mail server to work properly, add these DNS records:

1. A Record for Mail Subdomain:
   Name: mail
   Type: A
   Value: $SERVER_IP
   TTL: 3600

2. SPF Record:
   Name: @
   Type: TXT
   Value: v=spf1 ip4:$SERVER_IP ~all
   TTL: 3600

3. DKIM Record (will be generated after setup):
   Name: [selector]._domainkey
   Type: TXT
   Value: [Copy from Poste.io admin panel]
   TTL: 3600

Setup Instructions:
1. Add the A record first
2. Add the SPF record
3. Complete Poste.io setup wizard
4. Generate DKIM key in admin panel
5. Add DKIM record to DNS
6. Wait for DNS propagation (5-15 minutes)
7. Test email delivery

Access URLs:
- Setup Wizard: http://$SERVER_IP:8080/admin/install/server
- Admin Panel: http://$SERVER_IP:8080/admin/
- Webmail: http://$SERVER_IP:8080
- Domain Access: http://mail.athenadevtech.com (after DNS setup)
EOF

# =============================================================================
# Step 6: Create Setup Instructions
# =============================================================================

log "Step 6: Creating setup instructions..."

cat > /var/www/global-services/mail/setup-instructions.md << 'EOF'
# Mail Server Setup Instructions

## Initial Setup

1. **Access Setup Wizard:**
   ```
   http://194.195.90.237:8080/admin/install/server
   ```

2. **Complete Initial Configuration:**
   - Admin Email: admin@athenadevtech.com
   - Organization: Athena Dev Tech
   - Admin Password: [Choose strong password]
   - Hostname: mail.athenadevtech.com

## Adding Client Domains

1. **Access Admin Panel:**
   ```
   http://194.195.90.237:8080/admin/
   ```

2. **Add New Domain:**
   - Go to "Virtual domains"
   - Click "Add Domain"
   - Enter: client-domain.com

3. **Generate DKIM Key:**
   - Click on the domain
   - Note the DKIM selector
   - Copy the DKIM DNS record

4. **Configure Client DNS:**
   - Add SPF record: v=spf1 ip4:194.195.90.237 ~all
   - Add DKIM record: [Copy from admin panel]

5. **Create Email Accounts:**
   - contact@client-domain.com
   - info@client-domain.com
   - support@client-domain.com

## Client Access Information

### Webmail:
- URL: http://194.195.90.237:8080
- Login: email@client-domain.com

### Email Client Settings:
- IMAP Server: 194.195.90.237
- IMAP Port: 993 (SSL) or 143 (non-SSL)
- SMTP Server: 194.195.90.237
- SMTP Port: 587 (STARTTLS) or 25
- Username: email@client-domain.com

### Mobile Setup:
- iPhone: Settings → Mail → Add Account → Other
- Android: Email app → Add account → IMAP
- Gmail App: Add as "Other" provider

## Troubleshooting

### Email Delivery Issues:
1. Check DNS propagation
2. Verify SPF/DKIM records
3. Check mail server logs
4. Test with different email providers

### Web Interface Issues:
1. Check Docker container status
2. Verify Nginx configuration
3. Check firewall settings
4. Test local access

## Maintenance

### Daily:
- Check container status: docker-compose ps
- Monitor logs: docker-compose logs global-mailserver

### Weekly:
- Update Docker images: docker-compose pull
- Restart services: docker-compose restart
- Check disk space: df -h

### Monthly:
- Backup mail data: tar -czf mail-backup.tar.gz global-mail-data/
- Review logs for issues
- Update documentation
EOF

# =============================================================================
# Step 7: Create Management Scripts
# =============================================================================

log "Step 7: Creating management scripts..."

# Create mail server management script
cat > /var/www/global-services/mail/manage-mail.sh << 'EOF'
#!/bin/bash

# Mail Server Management Script

case "$1" in
    start)
        echo "Starting mail server..."
        docker-compose up -d
        ;;
    stop)
        echo "Stopping mail server..."
        docker-compose down
        ;;
    restart)
        echo "Restarting mail server..."
        docker-compose restart
        ;;
    status)
        echo "Mail server status:"
        docker-compose ps
        ;;
    logs)
        echo "Mail server logs:"
        docker-compose logs -f global-mailserver
        ;;
    backup)
        echo "Creating mail server backup..."
        tar -czf mail-backup-$(date +%Y%m%d_%H%M%S).tar.gz global-mail-data/
        echo "Backup created"
        ;;
    update)
        echo "Updating mail server..."
        docker-compose pull
        docker-compose up -d
        ;;
    *)
        echo "Usage: $0 {start|stop|restart|status|logs|backup|update}"
        exit 1
        ;;
esac
EOF

chmod +x /var/www/global-services/mail/manage-mail.sh

# =============================================================================
# Step 8: Verification
# =============================================================================

log "Step 8: Verifying mail server setup..."

# Check if container is running
if docker ps | grep -q "global-mailserver"; then
    log "✓ Mail server container is running"
else
    error "Mail server container is not running"
fi

# Check if web interface is accessible
if curl -s -o /dev/null -w "%{http_code}" http://localhost:8080 | grep -q "200\|302"; then
    log "✓ Mail server web interface is accessible"
else
    warn "Mail server web interface may not be accessible yet"
fi

# Check Nginx configuration
if nginx -t > /dev/null 2>&1; then
    log "✓ Nginx configuration is valid"
else
    error "Nginx configuration is invalid"
fi

# =============================================================================
# Step 9: Create Monitoring Script
# =============================================================================

log "Step 9: Creating monitoring script..."

cat > /var/www/global-services/mail/monitor-mail.sh << 'EOF'
#!/bin/bash

# Mail Server Monitoring Script

echo "=== Mail Server Status ==="
echo "Date: $(date)"
echo ""

echo "=== Container Status ==="
docker-compose ps
echo ""

echo "=== Resource Usage ==="
docker stats --no-stream global-mailserver
echo ""

echo "=== Recent Logs ==="
docker-compose logs --tail=20 global-mailserver
echo ""

echo "=== Port Status ==="
netstat -tuln | grep -E ':(25|110|143|587|993|995|8080)'
echo ""

echo "=== Disk Usage ==="
df -h /var/www/global-services/mail/
echo ""

echo "=== Memory Usage ==="
free -h
echo ""
EOF

chmod +x /var/www/global-services/mail/monitor-mail.sh

# =============================================================================
# Completion
# =============================================================================

log "Global mail server setup completed successfully!"
log ""
log "Next steps:"
log "1. Add DNS records (see dns-setup-guide.txt)"
log "2. Access setup wizard: http://$SERVER_IP:8080/admin/install/server"
log "3. Complete Poste.io configuration"
log "4. Add client domains"
log ""
log "Management commands:"
log "- Start/Stop: ./manage-mail.sh {start|stop|restart}"
log "- Status: ./manage-mail.sh status"
log "- Logs: ./manage-mail.sh logs"
log "- Backup: ./manage-mail.sh backup"
log "- Monitor: ./monitor-mail.sh"
log ""
log "Mail server is ready for multi-tenant email hosting! 📧"

# Save setup log
echo "Mail server setup completed at $(date)" >> /var/www/mail-setup.log
