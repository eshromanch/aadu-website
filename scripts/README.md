# AADU Website Server Setup Scripts

This directory contains comprehensive server setup scripts for deploying the AADU website on a Contabo VPS.

## 📋 Prerequisites

- Ubuntu 20.04+ or Debian-based system
- Root or sudo access
- Domain name pointing to your server
- SSH access to your VPS

## 🚀 Quick Start

### 1. Initial Server Setup

```bash
# Download and run the main setup script
wget https://raw.githubusercontent.com/eshromanch/aadu-website/main/scripts/server-setup.sh
chmod +x server-setup.sh
./server-setup.sh
```

### 2. Configure Environment Variables

```bash
# Edit the environment file
nano /var/www/projects/aadu-website/app/.env.production
```

Update the following variables:
- `MONGODB_URI` - Your MongoDB connection string
- `JWT_SECRET` - A strong secret key for JWT tokens
- `NODE_ENV` - Set to "production"
- `PORT` - Set to 3001

### 3. Deploy the Application

```bash
# Run the deployment script
cd /var/www/projects/aadu-website
./deploy.sh
```

### 4. Set Up SSL Certificate

```bash
# Update domain in SSL script first
nano scripts/ssl-setup.sh

# Run SSL setup
./scripts/ssl-setup.sh
```

## 📁 Scripts Overview

### Core Setup Scripts

| Script | Purpose | Usage |
|--------|---------|-------|
| `server-setup.sh` | Main server setup | Initial server configuration |
| `ssl-setup.sh` | SSL certificate setup | Configure HTTPS |
| `backup-setup.sh` | Backup system setup | Automated backups |
| `monitoring-setup.sh` | Monitoring setup | System monitoring |

### Management Scripts

| Script | Purpose | Location |
|--------|---------|----------|
| `deploy.sh` | Deploy application | `/var/www/projects/aadu-website/` |
| `maintenance.sh` | Maintenance tasks | `/var/www/projects/aadu-website/` |
| `health-check.sh` | Health monitoring | `/var/monitoring/aadu-website/` |
| `dashboard.sh` | Monitoring dashboard | `/var/monitoring/aadu-website/` |

## 🔧 Configuration

### Domain Configuration

Update the domain name in these files:
- `server-setup.sh` - Line 18: `DOMAIN="your-domain.com"`
- `ssl-setup.sh` - Line 15: `DOMAIN="your-domain.com"`

### Email Configuration

Update email addresses in:
- `server-setup.sh` - Line 19: `EMAIL="your-email@example.com"`
- `ssl-setup.sh` - Line 16: `EMAIL="your-email@example.com"`
- `monitoring-setup.sh` - Line 108: `EMAIL="your-email@example.com"`

### Environment Variables

Create `/var/www/projects/aadu-website/app/.env.production`:

```env
# Database Configuration
MONGODB_URI=mongodb://localhost:27017/aadu_website

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-change-this

# Application Configuration
NODE_ENV=production
PORT=3001
```

## 🛠️ Management Commands

### Application Management

```bash
# View application status
pm2 list

# View logs
pm2 logs aadu-website

# Restart application
pm2 restart aadu-website

# Monitor resources
pm2 monit
```

### Deployment

```bash
# Deploy latest code
cd /var/www/projects/aadu-website
./deploy.sh
```

### Maintenance

```bash
# Run maintenance tasks
cd /var/www/projects/aadu-website
./maintenance.sh
```

### Monitoring

```bash
# View monitoring dashboard
/var/monitoring/aadu-website/dashboard.sh

# Check system health
/var/monitoring/aadu-website/health-check.sh

# Analyze logs
/var/monitoring/aadu-website/analyze-logs.sh
```

### Backups

```bash
# Create manual backup
/var/backups/aadu-website/backup-full.sh

# Monitor backup status
/var/backups/aadu-website/monitor-backups.sh

# Restore from backup
/var/backups/aadu-website/restore.sh
```

## 🔒 Security Features

- **Firewall**: UFW configured with SSH, HTTP, HTTPS, and application port
- **Fail2ban**: Protection against brute force attacks
- **SSL/TLS**: Automatic Let's Encrypt certificates
- **Security Headers**: Nginx configured with security headers
- **Process Management**: PM2 for application process management

## 📊 Monitoring Features

- **Health Checks**: Every 5 minutes
- **System Monitoring**: Every hour
- **Daily Reports**: Generated at 6 AM
- **Alert System**: Email and Slack notifications
- **Log Analysis**: Comprehensive log monitoring

## 💾 Backup Features

- **Database Backups**: Daily at 2 AM
- **Application Backups**: Weekly on Sunday at 3 AM
- **Retention**: 30 days
- **Compression**: Automatic compression of backups
- **Restore**: Easy restore procedures

## 🚨 Troubleshooting

### Common Issues

1. **Application not starting**
   ```bash
   pm2 logs aadu-website
   cd /var/www/projects/aadu-website/app && npm start
   ```

2. **Nginx configuration errors**
   ```bash
   sudo nginx -t
   sudo systemctl restart nginx
   ```

3. **MongoDB connection issues**
   ```bash
   sudo systemctl status mongod
   sudo systemctl restart mongod
   ```

4. **SSL certificate issues**
   ```bash
   sudo certbot certificates
   sudo certbot renew --dry-run
   ```

### Log Locations

- **Application logs**: `/var/www/projects/aadu-website/logs/`
- **Nginx logs**: `/var/log/nginx/`
- **MongoDB logs**: `/var/log/mongodb/`
- **System logs**: `journalctl -u nginx`, `journalctl -u mongod`

### Performance Monitoring

```bash
# System resources
htop
iotop
nethogs

# Application performance
pm2 monit
pm2 logs aadu-website --lines 100
```

## 🔄 Updates and Maintenance

### System Updates

```bash
sudo apt update && sudo apt upgrade -y
```

### Application Updates

```bash
cd /var/www/projects/aadu-website
./deploy.sh
```

### SSL Certificate Renewal

```bash
sudo certbot renew
```

### Backup Verification

```bash
/var/backups/aadu-website/monitor-backups.sh
```

## 📞 Support

For issues with the server setup:

1. Check the logs: `/var/monitoring/aadu-website/analyze-logs.sh`
2. Verify configuration: `/var/monitoring/aadu-website/dashboard.sh`
3. Check system resources: `htop`, `df -h`, `free -h`

## 📝 Notes

- All scripts include error handling and logging
- Scripts are idempotent (safe to run multiple times)
- Automatic cleanup of old logs and backups
- Comprehensive monitoring and alerting
- Security best practices implemented

## 🔗 Related Documentation

- [AADU Website Deployment Guide](../aadu_website_deploy.md)
- [Admin Setup Guide](../ADMIN_SETUP.md)
- [Contact Management Guide](../CONTACT_MANAGEMENT_GUIDE.md)
- [File Upload Guide](../FILE_UPLOAD_GUIDE.md)
- [Verification System Guide](../VERIFICATION_SYSTEM_GUIDE.md)

