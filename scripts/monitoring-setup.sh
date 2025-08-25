#!/bin/bash

# Monitoring Setup Script for AADU Website
# This script sets up monitoring for the application and system

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
MONITORING_DIR="/var/monitoring/$PROJECT_NAME"

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

log "Setting up monitoring system for AADU Website..."

# Create monitoring directories
log "Creating monitoring directories..."
sudo mkdir -p $MONITORING_DIR/{logs,alerts,reports}
sudo chown -R $USER:$USER $MONITORING_DIR

# Install monitoring tools
log "Installing monitoring tools..."
sudo apt update
sudo apt install -y htop iotop nethogs fail2ban logwatch

# Create application health check script
log "Creating application health check script..."
cat > $MONITORING_DIR/health-check.sh << 'EOF'
#!/bin/bash

# Application health check script for AADU Website

PROJECT_DIR="/var/www/projects/aadu-website"
MONITORING_DIR="/var/monitoring/aadu-website"
LOG_FILE="$MONITORING_DIR/logs/health-check.log"

# Function to log messages
log_message() {
    echo "$(date '+%Y-%m-%d %H:%M:%S') - $1" >> $LOG_FILE
}

# Check if PM2 process is running
if ! pm2 list | grep -q "aadu-website.*online"; then
    log_message "ERROR: Application is not running"
    pm2 restart aadu-website
    log_message "INFO: Attempted to restart application"
    exit 1
fi

# Check if application responds
if ! curl -f http://localhost:3001/api/health > /dev/null 2>&1; then
    log_message "ERROR: Application is not responding to health check"
    exit 1
fi

# Check disk space
DISK_USAGE=$(df / | awk 'NR==2 {print $5}' | sed 's/%//')
if [ $DISK_USAGE -gt 90 ]; then
    log_message "WARNING: Disk usage is high: ${DISK_USAGE}%"
fi

# Check memory usage
MEMORY_USAGE=$(free | awk 'NR==2{printf "%.0f", $3*100/$2}')
if [ $MEMORY_USAGE -gt 90 ]; then
    log_message "WARNING: Memory usage is high: ${MEMORY_USAGE}%"
fi

# Check MongoDB
if ! systemctl is-active --quiet mongod; then
    log_message "ERROR: MongoDB is not running"
    exit 1
fi

log_message "INFO: Health check passed"
exit 0
EOF

chmod +x $MONITORING_DIR/health-check.sh

# Create system monitoring script
log "Creating system monitoring script..."
cat > $MONITORING_DIR/system-monitor.sh << 'EOF'
#!/bin/bash

# System monitoring script for AADU Website

MONITORING_DIR="/var/monitoring/aadu-website"
REPORT_FILE="$MONITORING_DIR/reports/system-report-$(date +%Y%m%d).txt"

# Create report header
cat > $REPORT_FILE << HEADER
System Report - $(date)
================================

HEADER

# System information
echo "System Information:" >> $REPORT_FILE
echo "==================" >> $REPORT_FILE
echo "Hostname: $(hostname)" >> $REPORT_FILE
echo "Uptime: $(uptime)" >> $REPORT_FILE
echo "Kernel: $(uname -r)" >> $REPORT_FILE
echo "" >> $REPORT_FILE

# CPU and Memory usage
echo "Resource Usage:" >> $REPORT_FILE
echo "==============" >> $REPORT_FILE
echo "CPU Usage:" >> $REPORT_FILE
top -bn1 | grep "Cpu(s)" | awk '{print $2}' | cut -d'%' -f1 >> $REPORT_FILE
echo "Memory Usage:" >> $REPORT_FILE
free -h >> $REPORT_FILE
echo "" >> $REPORT_FILE

# Disk usage
echo "Disk Usage:" >> $REPORT_FILE
echo "===========" >> $REPORT_FILE
df -h >> $REPORT_FILE
echo "" >> $REPORT_FILE

# Process information
echo "Top Processes:" >> $REPORT_FILE
echo "==============" >> $REPORT_FILE
ps aux --sort=-%cpu | head -10 >> $REPORT_FILE
echo "" >> $REPORT_FILE

# Network connections
echo "Network Connections:" >> $REPORT_FILE
echo "===================" >> $REPORT_FILE
netstat -tuln | grep LISTEN >> $REPORT_FILE
echo "" >> $REPORT_FILE

# Service status
echo "Service Status:" >> $REPORT_FILE
echo "==============" >> $REPORT_FILE
systemctl is-active nginx >> $REPORT_FILE
systemctl is-active mongod >> $REPORT_FILE
pm2 list >> $REPORT_FILE

echo "Report generated at $(date)" >> $REPORT_FILE
EOF

chmod +x $MONITORING_DIR/system-monitor.sh

# Create alert script
log "Creating alert script..."
cat > $MONITORING_DIR/send-alert.sh << 'EOF'
#!/bin/bash

# Alert script for AADU Website monitoring

ALERT_TYPE=$1
MESSAGE=$2
EMAIL="your-email@example.com"  # Change this to your email

# Function to send email alert
send_email_alert() {
    local subject="AADU Website Alert: $ALERT_TYPE"
    local body="$MESSAGE"
    
    echo "$body" | mail -s "$subject" $EMAIL
}

# Function to send Slack alert (if configured)
send_slack_alert() {
    local webhook_url="YOUR_SLACK_WEBHOOK_URL"  # Change this if using Slack
    
    if [ "$webhook_url" != "YOUR_SLACK_WEBHOOK_URL" ]; then
        curl -X POST -H 'Content-type: application/json' \
            --data "{\"text\":\"🚨 AADU Website Alert: $ALERT_TYPE\n$MESSAGE\"}" \
            $webhook_url
    fi
}

# Send alerts
send_email_alert
send_slack_alert

echo "Alert sent: $ALERT_TYPE - $MESSAGE"
EOF

chmod +x $MONITORING_DIR/send-alert.sh

# Create comprehensive monitoring script
log "Creating comprehensive monitoring script..."
cat > $MONITORING_DIR/monitor.sh << 'EOF'
#!/bin/bash

# Comprehensive monitoring script for AADU Website

MONITORING_DIR="/var/monitoring/aadu-website"
ALERT_SCRIPT="$MONITORING_DIR/send-alert.sh"

# Run health check
if ! $MONITORING_DIR/health-check.sh; then
    $ALERT_SCRIPT "Application Failure" "The AADU website application is not responding"
fi

# Check disk space
DISK_USAGE=$(df / | awk 'NR==2 {print $5}' | sed 's/%//')
if [ $DISK_USAGE -gt 95 ]; then
    $ALERT_SCRIPT "Critical Disk Usage" "Disk usage is at ${DISK_USAGE}%"
elif [ $DISK_USAGE -gt 85 ]; then
    $ALERT_SCRIPT "High Disk Usage" "Disk usage is at ${DISK_USAGE}%"
fi

# Check memory usage
MEMORY_USAGE=$(free | awk 'NR==2{printf "%.0f", $3*100/$2}')
if [ $MEMORY_USAGE -gt 95 ]; then
    $ALERT_SCRIPT "Critical Memory Usage" "Memory usage is at ${MEMORY_USAGE}%"
elif [ $MEMORY_USAGE -gt 85 ]; then
    $ALERT_SCRIPT "High Memory Usage" "Memory usage is at ${MEMORY_USAGE}%"
fi

# Check if services are running
if ! systemctl is-active --quiet nginx; then
    $ALERT_SCRIPT "Service Failure" "Nginx is not running"
fi

if ! systemctl is-active --quiet mongod; then
    $ALERT_SCRIPT "Service Failure" "MongoDB is not running"
fi

# Generate system report
$MONITORING_DIR/system-monitor.sh

echo "Monitoring check completed at $(date)"
EOF

chmod +x $MONITORING_DIR/monitor.sh

# Set up cron jobs for monitoring
log "Setting up monitoring cron jobs..."

# Health check every 5 minutes
(crontab -l 2>/dev/null; echo "*/5 * * * * $MONITORING_DIR/health-check.sh >> $MONITORING_DIR/logs/health.log 2>&1") | crontab -

# Comprehensive monitoring every hour
(crontab -l 2>/dev/null; echo "0 * * * * $MONITORING_DIR/monitor.sh >> $MONITORING_DIR/logs/monitor.log 2>&1") | crontab -

# Daily system report
(crontab -l 2>/dev/null; echo "0 6 * * * $MONITORING_DIR/system-monitor.sh") | crontab -

# Set up log rotation for monitoring logs
log "Setting up log rotation for monitoring..."
sudo tee /etc/logrotate.d/aadu-monitoring > /dev/null << EOF
$MONITORING_DIR/logs/*.log {
    daily
    missingok
    rotate 30
    compress
    delaycompress
    notifempty
    create 644 $USER $USER
}
EOF

# Create monitoring dashboard script
log "Creating monitoring dashboard script..."
cat > $MONITORING_DIR/dashboard.sh << 'EOF'
#!/bin/bash

# Monitoring dashboard for AADU Website

MONITORING_DIR="/var/monitoring/aadu-website"

echo "AADU Website Monitoring Dashboard"
echo "================================="
echo ""

# Application status
echo "Application Status:"
echo "------------------"
if pm2 list | grep -q "aadu-website.*online"; then
    echo "✅ Application is running"
else
    echo "❌ Application is not running"
fi

# Health check
if curl -f http://localhost:3001/api/health > /dev/null 2>&1; then
    echo "✅ Application is responding"
else
    echo "❌ Application is not responding"
fi

echo ""

# System resources
echo "System Resources:"
echo "----------------"
echo "CPU Usage: $(top -bn1 | grep "Cpu(s)" | awk '{print $2}' | cut -d'%' -f1)%"
echo "Memory Usage: $(free | awk 'NR==2{printf "%.1f", $3*100/$2}')%"
echo "Disk Usage: $(df / | awk 'NR==2 {print $5}')"

echo ""

# Service status
echo "Service Status:"
echo "---------------"
echo "Nginx: $(systemctl is-active nginx)"
echo "MongoDB: $(systemctl is-active mongod)"
echo "PM2: $(pm2 ping 2>/dev/null && echo 'running' || echo 'not running')"

echo ""

# Recent logs
echo "Recent Health Check Logs:"
echo "------------------------"
tail -10 $MONITORING_DIR/logs/health.log 2>/dev/null || echo "No health check logs found"

echo ""

# Recent alerts
echo "Recent Alerts:"
echo "--------------"
tail -10 $MONITORING_DIR/logs/monitor.log 2>/dev/null || echo "No monitoring logs found"
EOF

chmod +x $MONITORING_DIR/dashboard.sh

# Create log analysis script
log "Creating log analysis script..."
cat > $MONITORING_DIR/analyze-logs.sh << 'EOF'
#!/bin/bash

# Log analysis script for AADU Website

PROJECT_DIR="/var/www/projects/aadu-website"
MONITORING_DIR="/var/monitoring/aadu-website"

echo "AADU Website Log Analysis"
echo "========================"
echo ""

# Application logs
echo "Application Logs (PM2):"
echo "----------------------"
pm2 logs aadu-website --lines 20

echo ""

# Nginx access logs
echo "Nginx Access Logs (last 20 lines):"
echo "----------------------------------"
sudo tail -20 /var/log/nginx/access.log

echo ""

# Nginx error logs
echo "Nginx Error Logs (last 20 lines):"
echo "---------------------------------"
sudo tail -20 /var/log/nginx/error.log

echo ""

# MongoDB logs
echo "MongoDB Logs (last 20 lines):"
echo "----------------------------"
sudo tail -20 /var/log/mongodb/mongod.log

echo ""

# System logs
echo "System Logs (last 20 lines):"
echo "---------------------------"
sudo journalctl -n 20 --no-pager
EOF

chmod +x $MONITORING_DIR/analyze-logs.sh

# Set up fail2ban for security monitoring
log "Setting up fail2ban..."
sudo systemctl enable fail2ban
sudo systemctl start fail2ban

# Create fail2ban configuration for Nginx
sudo tee /etc/fail2ban/jail.local > /dev/null << EOF
[nginx-http-auth]
enabled = true
port = http,https
logpath = /var/log/nginx/error.log

[nginx-botsearch]
enabled = true
port = http,https
logpath = /var/log/nginx/access.log

[nginx-limit-req]
enabled = true
port = http,https
logpath = /var/log/nginx/error.log
EOF

sudo systemctl restart fail2ban

log "Monitoring system setup completed!"
echo ""
echo -e "${BLUE}Monitoring Configuration:${NC}"
echo "- Health checks: Every 5 minutes"
echo "- System monitoring: Every hour"
echo "- Daily reports: 6 AM"
echo "- Log retention: 30 days"
echo ""
echo -e "${BLUE}Available scripts:${NC}"
echo "- $MONITORING_DIR/health-check.sh - Application health check"
echo "- $MONITORING_DIR/system-monitor.sh - System resource monitoring"
echo "- $MONITORING_DIR/monitor.sh - Comprehensive monitoring"
echo "- $MONITORING_DIR/dashboard.sh - Monitoring dashboard"
echo "- $MONITORING_DIR/analyze-logs.sh - Log analysis"
echo "- $MONITORING_DIR/send-alert.sh - Send alerts"
echo ""
echo -e "${YELLOW}Next steps:${NC}"
echo "1. Update email address in $MONITORING_DIR/send-alert.sh"
echo "2. Configure Slack webhook if desired"
echo "3. Test monitoring: $MONITORING_DIR/dashboard.sh"
echo "4. Set up external monitoring services"
echo "5. Configure alert thresholds as needed"

