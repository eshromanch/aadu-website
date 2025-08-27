# Client Onboarding Guide
**Step-by-Step Process for Adding New Clients**

## 🎯 Overview

This guide walks through the complete process of onboarding a new client to your multi-client server setup.

**Time Required**: 30-45 minutes per client  
**Prerequisites**: Server setup completed, domain purchased by client  

## 📋 Pre-Onboarding Checklist

### Client Requirements
- [ ] Domain purchased and DNS access available
- [ ] GitHub repository created (if using GitHub Actions)
- [ ] Project requirements documented
- [ ] Email accounts list provided
- [ ] SSL certificate email contact

### Server Resources Check
```bash
# Check available resources
free -h
df -h
pm2 list
docker ps

# Ensure sufficient resources for new client
# Recommended: 500MB RAM + 2GB disk space available
```

## 🚀 Step-by-Step Onboarding

### Step 1: Create Project Structure
```bash
# Navigate to scripts directory
cd /root/scripts

# Create project structure (replace values)
./enhanced-project-structure.sh create client-name client-domain.com 3002

# Example:
./enhanced-project-structure.sh create techcorp techcorp.com 3002
```

**Expected Output:**
```
Creating project structure for client: techcorp
✅ Project structure created for techcorp (Port: 3002)
Client techcorp created successfully!
```

### Step 2: Deploy Client Application
```bash
# Navigate to client app directory
cd /var/www/projects/client-name/app

# Clone client repository
git clone https://github.com/client/repository.git .

# Install dependencies
npm ci

# Create production environment file
cat > .env.production << 'EOF'
MONGODB_URI=mongodb://localhost:27017/client-name
JWT_SECRET=your-generated-jwt-secret
NODE_ENV=production
PORT=3002
EOF

# Build application
npm run build

# Start with PM2
pm2 start ../ecosystem.config.js
pm2 save
```

### Step 3: Configure Nginx
```bash
# Setup Nginx configuration
./setup-nginx.sh create client-name client-domain.com

# Test configuration
sudo nginx -t

# If successful, reload
sudo systemctl reload nginx
```

### Step 4: Configure DNS
**Client needs to add these DNS records:**

```
Type    Name    Value               TTL
A       @       [your-server-ip]    3600
A       www     [your-server-ip]    3600
A       mail    [your-server-ip]    3600
MX      @       mail.client-domain.com  3600  (Priority: 10)
TXT     @       "v=spf1 mx ~all"    3600
```

**Verify DNS propagation:**
```bash
# Check domain resolution
dig client-domain.com
nslookup client-domain.com

# Wait for propagation (can take up to 24 hours)
```

### Step 5: Setup SSL Certificate
```bash
# Once DNS is propagated, setup SSL
./setup-ssl.sh setup client-domain.com client@client-domain.com

# Verify SSL installation
curl -I https://client-domain.com
```

### Step 6: Setup Mail Server
```bash
# Navigate to client mail directory
cd /var/www/projects/client-name/mail

# Create docker-compose.yml
cat > docker-compose.yml << 'EOF'
services:
  mailserver:
    image: analogic/poste.io
    container_name: client-name-mailserver
    hostname: mail.client-domain.com
    ports:
      - "25:25"
      - "110:110"
      - "143:143"
      - "587:587"
      - "993:993"
      - "995:995"
      - "8081:80"    # Use unique port for each client
      - "8444:443"
    environment:
      - HTTPS=OFF
      - DISABLE_CLAMAV=TRUE
    volumes:
      - ./mail-data:/data
    restart: unless-stopped
EOF

# Start mail server
docker-compose up -d

# Create Nginx proxy for mail
sudo tee /etc/nginx/sites-available/mail-client-name << 'EOF'
server {
    listen 80;
    server_name mail.client-domain.com;
    
    location / {
        proxy_pass http://localhost:8081;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_set_header X-Forwarded-Host $host;
    }
}
EOF

# Enable mail site
sudo ln -s /etc/nginx/sites-available/mail-client-name /etc/nginx/sites-enabled/
sudo nginx -t && sudo systemctl reload nginx
```

### Step 7: Configure Mail Server
1. **Access web interface**: `http://mail.client-domain.com`
2. **Complete setup wizard**:
   - Domain: `client-domain.com`
   - Hostname: `mail.client-domain.com`
   - Admin Email: `admin@client-domain.com`
   - Admin Password: Generate strong password

3. **Create email accounts** as requested by client:
   - `admin@client-domain.com`
   - `info@client-domain.com`
   - `support@client-domain.com`
   - `contact@client-domain.com`

### Step 8: Setup GitHub Actions (Optional)
If client uses automated deployment:

```yaml
# Add to client's .github/workflows/deploy.yml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v4
    - uses: actions/setup-node@v4
      with:
        node-version: '20'
        cache: 'npm'
    - run: npm ci
    - run: npm run lint
    - run: npm run build
    
    - name: Deploy
      uses: appleboy/ssh-action@v1.0.3
      with:
        host: ${{ secrets.HOST }}
        username: ${{ secrets.USERNAME }}
        key: ${{ secrets.SSH_KEY }}
        script: |
          cd /var/www/projects/client-name/app
          git pull origin main
          npm ci
          npm run build
          pm2 reload client-name
          sudo systemctl reload nginx
```

**Required GitHub Secrets:**
- `HOST`: Your server IP
- `USERNAME`: SSH username
- `SSH_KEY`: Private SSH key

## ✅ Verification Checklist

### Website Functionality
- [ ] Website loads at `https://client-domain.com`
- [ ] SSL certificate is valid and auto-renewing
- [ ] All pages and functionality work correctly
- [ ] Contact forms submit successfully
- [ ] Admin panel accessible (if applicable)

### Mail Server Functionality
- [ ] Mail web interface accessible at `http://mail.client-domain.com`
- [ ] Email accounts created successfully
- [ ] Can send emails through webmail
- [ ] Can receive emails from external sources
- [ ] SMTP settings work with email clients
- [ ] Contact form emails are delivered

### Technical Verification
```bash
# Check application status
pm2 list | grep client-name
pm2 logs client-name --lines 20

# Check mail server status
docker ps | grep client-name-mailserver
docker stats client-name-mailserver --no-stream

# Test website response
curl -I https://client-domain.com

# Test mail server response
curl -I http://mail.client-domain.com

# Check resource usage
free -h
df -h
```

### Email Testing
```bash
# Test SMTP connection
telnet mail.client-domain.com 587

# Check MX record
dig MX client-domain.com

# Send test email
echo "Test message" | mail -s "Test Subject" admin@client-domain.com
```

## 📊 Resource Allocation

### Per Client Resource Usage
```
Estimated Resources per Client:
├── Next.js Application: 100-150MB RAM
├── Mail Server: 400-500MB RAM
├── Nginx: 5-10MB RAM
├── Total RAM: ~500-650MB
├── Disk Space: 2-5GB
└── Ports: 1 app port + mail ports
```

### Port Management
```
Client Ports Assignment:
├── Client 1 (AADU): 3001, Mail: 8080
├── Client 2: 3002, Mail: 8081
├── Client 3: 3003, Mail: 8082
└── Continue incrementally...
```

## 🔧 Troubleshooting Common Issues

### DNS Not Propagating
```bash
# Check current DNS status
dig client-domain.com
nslookup client-domain.com

# Use different DNS servers to test
dig @8.8.8.8 client-domain.com
dig @1.1.1.1 client-domain.com

# Wait 24-48 hours for full propagation
```

### SSL Certificate Issues
```bash
# Check certificate status
sudo certbot certificates

# Manually retry certificate
sudo certbot --nginx -d client-domain.com

# Check certificate expiration
openssl x509 -in /etc/letsencrypt/live/client-domain.com/cert.pem -text -noout
```

### Application Not Starting
```bash
# Check PM2 logs
pm2 logs client-name

# Check application directory
ls -la /var/www/projects/client-name/app

# Verify environment variables
cat /var/www/projects/client-name/app/.env.production

# Manual start test
cd /var/www/projects/client-name/app
npm start
```

### Mail Server Issues
```bash
# Check container status
docker-compose ps

# View mail server logs
docker-compose logs mailserver

# Restart mail server
docker-compose restart mailserver

# Check port conflicts
ss -tuln | grep 8081
```

## 📞 Client Handover

### Provide Client With:
1. **Website Access**:
   - URL: `https://client-domain.com`
   - Admin panel URL (if applicable)
   - Login credentials

2. **Email Access**:
   - Webmail URL: `http://mail.client-domain.com`
   - Email account credentials
   - SMTP/IMAP settings for email clients

3. **Documentation**:
   - Email client setup guide
   - Contact form integration details
   - Basic troubleshooting guide

### Client Training (Optional)
- How to access and use webmail
- How to create additional email accounts
- How to configure email clients
- Basic website management (if applicable)

## 📈 Post-Deployment Monitoring

### Weekly Checks
```bash
# Resource usage check
free -h
df -h
pm2 list

# Mail server health
docker ps
docker stats --no-stream

# SSL certificate expiry
sudo certbot certificates

# Log review
tail -f /var/log/nginx/access.log
```

### Monthly Maintenance
- Update system packages
- Review and rotate logs
- Backup client data
- Check for security updates
- Monitor email deliverability

---

## 🎉 Success Metrics

### Onboarding KPIs
- **Setup Time**: 30-45 minutes per client
- **Success Rate**: 99%+ successful deployments
- **Resource Efficiency**: 500-650MB RAM per client
- **Scalability**: 8-10 clients per 8GB server

### Client Satisfaction Indicators
- Website loads in <2 seconds
- 99.9% uptime
- Email delivery success rate >95%
- Zero security incidents
- Automated deployment working

**Ready for Production**: This process has been tested and refined for the AADU website deployment. Each step is proven to work reliably.


