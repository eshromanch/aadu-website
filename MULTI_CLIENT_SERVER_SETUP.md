# Multi-Client Server Setup Guide
**Complete Production Setup for Multiple Client Websites with Email**

## 🏗️ Architecture Overview

```
Server (Ubuntu 24.04 - Contabo VPS)
├── Main Nginx (Port 80/443) - Domain routing
├── Client Projects
│   ├── aadu-website (Port 3001)
│   │   ├── Next.js App (PM2)
│   │   ├── MongoDB Database
│   │   └── Mail Server (Poste.io)
│   └── [future-client] (Port 3002)
└── Automated Deployment (GitHub Actions)
```

## 📋 System Requirements

- **OS**: Ubuntu 24.04 LTS
- **RAM**: 8GB+ (Current usage: ~2GB with one client)
- **Storage**: 50GB+ SSD
- **Ports**: 22 (SSH), 80 (HTTP), 443 (HTTPS), 25 (SMTP), 587, 993, 995

## 🛠️ Initial Server Setup

### 1. Basic Server Configuration
```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install essential packages
sudo apt install -y curl wget git nginx certbot python3-certbot-nginx ufw fail2ban htop

# Install Node.js 20 LTS
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install PM2 for process management
sudo npm install -g pm2

# Install Docker and Docker Compose
sudo apt install -y docker.io docker-compose-plugin
sudo systemctl enable docker
sudo systemctl start docker
sudo usermod -aG docker $USER

# Install MongoDB
wget -qO - https://www.mongodb.org/static/pgp/server-6.0.asc | sudo apt-key add -
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu jammy/mongodb-org/6.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-6.0.list
sudo apt update
sudo apt install -y mongodb-org mongodb-mongosh
sudo systemctl enable mongod
sudo systemctl start mongod

# Setup firewall
sudo ufw allow OpenSSH
sudo ufw allow 'Nginx Full'
sudo ufw allow 25/tcp    # SMTP
sudo ufw allow 587/tcp   # SMTP Submission
sudo ufw allow 993/tcp   # IMAP SSL
sudo ufw allow 995/tcp   # POP3 SSL
sudo ufw --force enable

# Create directory structure
sudo mkdir -p /var/www/projects
sudo chown -R $USER:www-data /var/www/projects
```

## 🏢 Client Project Setup

### Enhanced Project Structure Script
```bash
#!/bin/bash
# File: scripts/enhanced-project-structure.sh

create_client_project() {
    local client_name=$1
    local domain=$2
    local port=${3:-3001}
    
    echo "Creating project structure for client: $client_name"
    
    # Create client directories
    sudo mkdir -p /var/www/projects/$client_name/{app,logs,backups,ssl,mail}
    
    # Set permissions
    sudo chown -R $USER:www-data /var/www/projects/$client_name
    sudo chmod -R 755 /var/www/projects/$client_name
    
    # Create PM2 ecosystem config
    cat > /var/www/projects/$client_name/ecosystem.config.js << EOF
module.exports = {
  apps: [{
    name: '$client_name',
    script: 'npm',
    args: 'start',
    cwd: '/var/www/projects/$client_name/app',
    env: {
      NODE_ENV: 'production',
      PORT: $port
    },
    log_file: '/var/www/projects/$client_name/logs/combined.log',
    out_file: '/var/www/projects/$client_name/logs/out.log',
    error_file: '/var/www/projects/$client_name/logs/error.log',
    instances: 1,
    exec_mode: 'cluster'
  }]
};
EOF
    
    # Create client info file
    cat > /var/www/projects/$client_name/client-info.json << EOF
{
  "client_name": "$client_name",
  "domain": "$domain",
  "port": $port,
  "mail_port": 8080,
  "created_at": "$(date -u +%Y-%m-%dT%H:%M:%SZ)"
}
EOF
    
    echo "✅ Project structure created for $client_name"
}

# Usage: ./enhanced-project-structure.sh create client-name domain.com [port]
case "$1" in
    create)
        create_client_project "$2" "$3" "$4"
        ;;
    *)
        echo "Usage: $0 create <client-name> <domain> [port]"
        exit 1
        ;;
esac
```

### Nginx Configuration Script
```bash
#!/bin/bash
# File: scripts/setup-nginx.sh

setup_nginx_for_client() {
    local action=$1
    local client_name=$2
    local domain=$3
    
    case "$action" in
        create)
            echo "Creating Nginx configuration for $client_name"
            
            # Read port from client info
            local port=$(jq -r '.port' /var/www/projects/$client_name/client-info.json 2>/dev/null || echo "3001")
            
            # Create Nginx site config
            sudo tee /etc/nginx/sites-available/$client_name << EOF
server {
    listen 80;
    server_name $domain www.$domain;
    
    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header Referrer-Policy "no-referrer-when-downgrade" always;
    
    # Gzip compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_proxied any;
    gzip_types text/plain text/css text/xml text/javascript application/javascript application/xml+rss;
    
    # Proxy to Next.js application
    location / {
        proxy_pass http://localhost:$port;
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
    
    # Static files caching
    location /_next/static/ {
        proxy_pass http://localhost:$port;
        add_header Cache-Control "public, immutable, max-age=31536000";
    }
    
    # API routes
    location /api/ {
        proxy_pass http://localhost:$port;
        proxy_http_version 1.1;
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
    }
}
EOF
            
            # Enable site
            sudo ln -sf /etc/nginx/sites-available/$client_name /etc/nginx/sites-enabled/
            
            # Test and reload
            sudo nginx -t && sudo systemctl reload nginx
            echo "✅ Nginx configuration created for $client_name"
            ;;
        *)
            echo "Usage: $0 create <client-name> <domain>"
            ;;
    esac
}

setup_nginx_for_client "$@"
```

### SSL Setup Script
```bash
#!/bin/bash
# File: scripts/setup-ssl.sh

setup_ssl() {
    local domain=$1
    local email=$2
    
    echo "Setting up SSL certificate for $domain"
    
    # Test Nginx configuration
    sudo nginx -t || exit 1
    
    # Obtain SSL certificate
    sudo certbot --nginx -d $domain -d www.$domain --email $email --agree-tos --non-interactive
    
    if [ $? -eq 0 ]; then
        echo "✅ SSL certificate successfully installed for $domain"
    else
        echo "❌ Failed to obtain SSL certificate for $domain"
        exit 1
    fi
}

# Usage: ./setup-ssl.sh setup domain.com email@example.com
case "$1" in
    setup)
        setup_ssl "$2" "$3"
        ;;
    *)
        echo "Usage: $0 setup <domain> <email>"
        exit 1
        ;;
esac
```

## 📧 Mail Server Setup (Poste.io)

### Installation for Each Client
```bash
# Navigate to client's mail directory
cd /var/www/projects/[client-name]/mail

# Create docker-compose.yml for Poste.io
cat > docker-compose.yml << 'EOF'
services:
  mailserver:
    image: analogic/poste.io
    container_name: [client-name]-mailserver
    hostname: mail.[domain.com]
    ports:
      - "25:25"
      - "110:110"
      - "143:143"
      - "587:587"
      - "993:993"
      - "995:995"
      - "8080:80"
      - "8443:443"
    environment:
      - HTTPS=OFF
      - DISABLE_CLAMAV=TRUE
    volumes:
      - ./mail-data:/data
    restart: unless-stopped
EOF

# Start mail server
docker-compose up -d

# Create Nginx proxy for mail subdomain
sudo tee /etc/nginx/sites-available/mail-[client-name] << 'EOF'
server {
    listen 80;
    server_name mail.[domain.com];
    
    location / {
        proxy_pass http://localhost:8080;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_set_header X-Forwarded-Host $host;
    }
}
EOF

# Enable mail site
sudo ln -s /etc/nginx/sites-available/mail-[client-name] /etc/nginx/sites-enabled/
sudo nginx -t && sudo systemctl reload nginx
```

### Mail Server Features
- **Resource Usage**: ~400-500MB RAM per client
- **Web Interface**: http://mail.[domain.com]
- **SMTP Settings**: 
  - Server: mail.[domain.com]
  - Port: 587 (STARTTLS) or 25
  - Authentication: Yes
- **IMAP Settings**:
  - Server: mail.[domain.com]
  - Port: 993 (SSL) or 143
- **POP3 Settings**:
  - Server: mail.[domain.com]
  - Port: 995 (SSL) or 110

## 🚀 Automated Deployment (GitHub Actions)

### GitHub Actions Workflow
```yaml
# File: .github/workflows/deploy.yml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
    - name: Checkout code
      uses: actions/checkout@v4
      
    - name: Setup Node.js
      uses: actions/setup-node@v4
      with:
        node-version: '20'
        cache: 'npm'
        
    - name: Install dependencies
      run: npm ci
      
    - name: Run linter
      run: npm run lint
      
    - name: Type check
      run: npm run type-check
      
    - name: Security audit
      run: npm audit --audit-level=high
      
    - name: Deploy to server
      uses: appleboy/ssh-action@v1.0.3
      with:
        host: ${{ secrets.HOST }}
        username: ${{ secrets.USERNAME }}
        key: ${{ secrets.SSH_KEY }}
        script: |
          cd /var/www/projects/[client-name]/app
          
          # Backup current version
          timestamp=$(date +%Y%m%d_%H%M%S)
          cp -r . ../backups/app-$timestamp/
          
          # Pull latest code
          git pull origin main
          
          # Create production environment file
          cat > .env.production << 'ENV_EOF'
          MONGODB_URI=${{ secrets.MONGODB_URI }}
          JWT_SECRET=${{ secrets.JWT_SECRET }}
          NODE_ENV=production
          PORT=3001
          ENV_EOF
          
          # Install dependencies and build
          npm ci --production=false
          rm -rf .next
          npm run build
          
          # Restart application
          pm2 delete [client-name] || true
          pm2 start ../ecosystem.config.js
          pm2 save
          
          # Reload Nginx
          sudo nginx -t && sudo systemctl reload nginx
          
          # Health check
          sleep 10
          curl -f http://localhost:3001/api/health || exit 1
          
          echo "✅ Deployment completed successfully"
```

## 📊 Resource Management

### Current Usage (1 Client - AADU)
```
Total RAM: 7.8GB
Used RAM: ~2GB (25%)
├── System: ~800MB
├── MongoDB: ~200MB
├── Node.js App: ~100MB
├── Poste.io Mail: ~433MB
├── Nginx: ~20MB
└── Other: ~400MB

Available for more clients: ~5.8GB
Estimated clients per server: 8-10
```

### Per Client Resource Estimation
- **Next.js App**: ~100-150MB RAM
- **Mail Server**: ~400-500MB RAM
- **Total per client**: ~500-650MB RAM

## 🔧 Management Commands

### Client Management
```bash
# Create new client
./scripts/enhanced-project-structure.sh create client-name domain.com 3002

# Setup Nginx for client
./scripts/setup-nginx.sh create client-name domain.com

# Setup SSL for client
./scripts/setup-ssl.sh setup domain.com email@domain.com

# Setup mail server for client
cd /var/www/projects/client-name/mail
# Follow mail server setup steps above
```

### Monitoring
```bash
# Check all PM2 processes
pm2 list

# Check specific client logs
pm2 logs client-name

# Check system resources
htop
free -h

# Check mail server status
docker ps
docker stats --no-stream

# Check Nginx status
sudo nginx -t
sudo systemctl status nginx
```

### Backup
```bash
# Backup client data
cd /var/www/projects/client-name
tar -czf ../backups/client-name-$(date +%Y%m%d).tar.gz app/ mail/

# Backup MongoDB
mongodump --out /var/www/projects/client-name/backups/mongodb-$(date +%Y%m%d)
```

## 🔒 Security Considerations

1. **Firewall**: UFW configured with minimal open ports
2. **SSL**: Automatic SSL certificates via Let's Encrypt
3. **Fail2Ban**: Protection against brute force attacks
4. **Regular Updates**: Automated security updates
5. **Access Control**: SSH key authentication only
6. **Mail Security**: Spam filtering and rate limiting built-in

## 📈 Scaling Strategy

### Adding New Clients
1. Run project structure script with new port
2. Deploy client application
3. Configure Nginx with domain routing
4. Setup SSL certificate
5. Install mail server (if needed)
6. Configure DNS A records

### Server Scaling
- **Vertical**: Upgrade RAM/CPU when reaching 80% usage
- **Horizontal**: Move clients to new servers when needed
- **Database**: Consider MongoDB replica sets for high availability

## 🎯 Production Checklist

### Initial Setup
- [ ] Server provisioned and configured
- [ ] Domain DNS configured (A records)
- [ ] SSL certificates installed
- [ ] Mail server configured
- [ ] GitHub Actions configured
- [ ] Monitoring setup

### Per Client Deployment
- [ ] Project structure created
- [ ] Application deployed and running
- [ ] Nginx configuration active
- [ ] SSL certificate obtained
- [ ] Mail server running and configured
- [ ] Email accounts created
- [ ] Contact forms tested
- [ ] Monitoring configured

## 📞 Support & Troubleshooting

### Common Issues
1. **Port conflicts**: Check `ss -tuln` for used ports
2. **SSL issues**: Verify DNS propagation and certificate paths
3. **Mail delivery**: Check spam folders and DNS MX records
4. **Performance**: Monitor RAM usage and optimize if needed

### Log Locations
- **Application logs**: `/var/www/projects/[client]/logs/`
- **Nginx logs**: `/var/log/nginx/`
- **Mail server logs**: `docker-compose logs mailserver`
- **System logs**: `/var/log/syslog`

---

## 🎉 Current Status: AADU Website

✅ **Website**: https://aadu.online - Fully operational  
✅ **Admin Panel**: Working with secure login  
✅ **Mail Server**: http://mail.aadu.online - Poste.io running  
✅ **Resource Usage**: 433MB RAM for mail server  
✅ **Automated Deployment**: GitHub Actions configured  
✅ **SSL**: Auto-renewal setup  
✅ **Ready for**: Multiple client deployments  

**Total Setup Time**: ~4 hours  
**Maintenance**: Minimal - automated updates and monitoring  
**Scalability**: Ready for 8-10 clients on current server  


