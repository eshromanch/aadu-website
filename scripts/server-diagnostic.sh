#!/bin/bash

# Server Diagnostic Script for AADU Website
# This script checks your server setup and provides recommendations

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
PROJECT_NAME="aadu-website"
PROJECT_DIR="/var/www/projects/$PROJECT_NAME"

# Logging function
log() {
    echo -e "${GREEN}[$(date +'%Y-%m-%d %H:%M:%S')] $1${NC}"
}

warn() {
    echo -e "${YELLOW}[$(date +'%Y-%m-%d %H:%M:%S')] WARNING: $1${NC}"
}

error() {
    echo -e "${RED}[$(date +'%Y-%m-%d %H:%M:%S')] ERROR: $1${NC}"
}

info() {
    echo -e "${BLUE}[$(date +'%Y-%m-%d %H:%M:%S')] INFO: $1${NC}"
}

echo "🔍 AADU Website Server Diagnostic"
echo "================================="
echo ""

# Check if running as root
if [[ $EUID -eq 0 ]]; then
   warn "Running as root - some checks may not work properly"
fi

# System Information
echo "📊 System Information"
echo "---------------------"
echo "Hostname: $(hostname)"
echo "OS: $(lsb_release -d | cut -f2)"
echo "Kernel: $(uname -r)"
echo "Uptime: $(uptime -p)"
echo ""

# Check essential services
echo "🔧 Essential Services"
echo "-------------------"

# Check Node.js
if command -v node &> /dev/null; then
    NODE_VERSION=$(node --version)
    log "✅ Node.js: $NODE_VERSION"
else
    error "❌ Node.js not installed"
fi

# Check npm
if command -v npm &> /dev/null; then
    NPM_VERSION=$(npm --version)
    log "✅ npm: $NPM_VERSION"
else
    error "❌ npm not installed"
fi

# Check PM2
if command -v pm2 &> /dev/null; then
    log "✅ PM2 installed"
    pm2 list
else
    error "❌ PM2 not installed"
fi

# Check Nginx
if systemctl is-active --quiet nginx; then
    log "✅ Nginx is running"
    echo "Nginx version: $(nginx -v 2>&1)"
else
    error "❌ Nginx is not running"
fi

# Check MongoDB
if systemctl is-active --quiet mongod; then
    log "✅ MongoDB is running"
else
    error "❌ MongoDB is not running"
fi

echo ""

# Check project directory
echo "📁 Project Directory"
echo "-------------------"
if [ -d "$PROJECT_DIR" ]; then
    log "✅ Project directory exists: $PROJECT_DIR"
    
    if [ -d "$PROJECT_DIR/app" ]; then
        log "✅ Application directory exists"
        
        if [ -f "$PROJECT_DIR/app/.env.production" ]; then
            log "✅ Environment file exists"
        else
            warn "⚠️  Environment file missing"
        fi
        
        if [ -f "$PROJECT_DIR/app/package.json" ]; then
            log "✅ package.json exists"
        else
            error "❌ package.json missing"
        fi
    else
        error "❌ Application directory missing"
    fi
    
    if [ -d "$PROJECT_DIR/backups" ]; then
        log "✅ Backups directory exists"
    else
        warn "⚠️  Backups directory missing"
    fi
    
    if [ -d "$PROJECT_DIR/logs" ]; then
        log "✅ Logs directory exists"
    else
        warn "⚠️  Logs directory missing"
    fi
else
    error "❌ Project directory missing: $PROJECT_DIR"
fi

echo ""

# Check monitoring setup
echo "📊 Monitoring Setup"
echo "------------------"
MONITORING_DIR="/var/monitoring/$PROJECT_NAME"

if [ -d "$MONITORING_DIR" ]; then
    log "✅ Monitoring directory exists: $MONITORING_DIR"
    
    if [ -f "$MONITORING_DIR/health-check.sh" ]; then
        log "✅ Health check script exists"
    else
        warn "⚠️  Health check script missing"
    fi
    
    if [ -f "$MONITORING_DIR/dashboard.sh" ]; then
        log "✅ Dashboard script exists"
    else
        warn "⚠️  Dashboard script missing"
    fi
else
    warn "⚠️  Monitoring directory missing: $MONITORING_DIR"
fi

echo ""

# Check backup setup
echo "💾 Backup Setup"
echo "--------------"
BACKUP_DIR="/var/backups/$PROJECT_NAME"

if [ -d "$BACKUP_DIR" ]; then
    log "✅ Backup directory exists: $BACKUP_DIR"
    
    if [ -f "$BACKUP_DIR/backup-full.sh" ]; then
        log "✅ Full backup script exists"
    else
        warn "⚠️  Full backup script missing"
    fi
    
    if [ -f "$BACKUP_DIR/restore.sh" ]; then
        log "✅ Restore script exists"
    else
        warn "⚠️  Restore script missing"
    fi
else
    warn "⚠️  Backup directory missing: $BACKUP_DIR"
fi

echo ""

# Check firewall
echo "🔥 Firewall Status"
echo "-----------------"
if command -v ufw &> /dev/null; then
    UFW_STATUS=$(sudo ufw status | head -1)
    if [[ $UFW_STATUS == *"active"* ]]; then
        log "✅ UFW is active"
        echo "Firewall rules:"
        sudo ufw status numbered
    else
        warn "⚠️  UFW is not active"
    fi
else
    warn "⚠️  UFW not installed"
fi

echo ""

# Check SSL certificates
echo "🔒 SSL Certificates"
echo "------------------"
if command -v certbot &> /dev/null; then
    log "✅ Certbot installed"
    echo "Certificates:"
    sudo certbot certificates 2>/dev/null || echo "No certificates found"
else
    warn "⚠️  Certbot not installed"
fi

echo ""

# Check disk space
echo "💿 Disk Usage"
echo "------------"
df -h | grep -E '^/dev/'
echo ""

# Check memory usage
echo "🧠 Memory Usage"
echo "-------------"
free -h
echo ""

# Check running processes
echo "🔄 Running Processes"
echo "------------------"
echo "PM2 processes:"
pm2 list 2>/dev/null || echo "No PM2 processes found"
echo ""

# Check network ports
echo "🌐 Network Ports"
echo "--------------"
echo "Listening ports:"
sudo netstat -tuln | grep LISTEN | head -10
echo ""

# Check cron jobs
echo "⏰ Cron Jobs"
echo "----------"
crontab -l 2>/dev/null || echo "No cron jobs found"
echo ""

# Application health check
echo "🏥 Application Health"
echo "-------------------"
if [ -d "$PROJECT_DIR/app" ]; then
    cd "$PROJECT_DIR/app"
    
    if [ -f ".env.production" ]; then
        log "✅ Environment file found"
    else
        warn "⚠️  Environment file missing"
    fi
    
    if [ -d "node_modules" ]; then
        log "✅ Dependencies installed"
    else
        warn "⚠️  Dependencies not installed"
    fi
    
    if [ -d ".next" ]; then
        log "✅ Application built"
    else
        warn "⚠️  Application not built"
    fi
else
    error "❌ Application directory not found"
fi

echo ""

# Test application response
echo "🌐 Application Response"
echo "---------------------"
if curl -f http://localhost:3001 > /dev/null 2>&1; then
    log "✅ Application responding on port 3001"
elif curl -f http://localhost:3000 > /dev/null 2>&1; then
    log "✅ Application responding on port 3000"
else
    error "❌ Application not responding"
fi

echo ""

# Recommendations
echo "💡 Recommendations"
echo "-----------------"
echo ""

if [ ! -d "$PROJECT_DIR" ]; then
    echo "1. Run server setup script: ./scripts/server-setup.sh"
fi

if [ ! -d "$MONITORING_DIR" ]; then
    echo "2. Set up monitoring: ./scripts/monitoring-setup.sh"
fi

if [ ! -d "$BACKUP_DIR" ]; then
    echo "3. Set up backups: ./scripts/backup-setup.sh"
fi

if ! command -v certbot &> /dev/null; then
    echo "4. Set up SSL: ./scripts/ssl-setup.sh"
fi

if [ ! -f "$PROJECT_DIR/app/.env.production" ]; then
    echo "5. Create environment file: $PROJECT_DIR/app/.env.production"
fi

echo ""
echo "🔍 Diagnostic completed!"
echo "Check the output above for any issues that need to be addressed."

