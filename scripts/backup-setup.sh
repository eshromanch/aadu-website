#!/bin/bash

# Backup Setup Script for AADU Website
# This script sets up automated backups for the database and application files

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
BACKUP_DIR="/var/backups/$PROJECT_NAME"
RETENTION_DAYS=30

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

log "Setting up backup system for AADU Website..."

# Create backup directories
log "Creating backup directories..."
sudo mkdir -p $BACKUP_DIR/{database,application,logs}
sudo chown -R $USER:$USER $BACKUP_DIR

# Create database backup script
log "Creating database backup script..."
cat > $BACKUP_DIR/backup-database.sh << 'EOF'
#!/bin/bash

# Database backup script for AADU Website

BACKUP_DIR="/var/backups/aadu-website"
DATE=$(date +%Y%m%d_%H%M%S)
DB_NAME="aadu_website"

# Create backup
mongodump --db $DB_NAME --out $BACKUP_DIR/database/backup_$DATE

# Compress backup
cd $BACKUP_DIR/database
tar -czf backup_$DATE.tar.gz backup_$DATE
rm -rf backup_$DATE

# Remove old backups (keep last 30 days)
find $BACKUP_DIR/database -name "backup_*.tar.gz" -mtime +30 -delete

echo "Database backup completed: backup_$DATE.tar.gz"
EOF

chmod +x $BACKUP_DIR/backup-database.sh

# Create application backup script
log "Creating application backup script..."
cat > $BACKUP_DIR/backup-application.sh << 'EOF'
#!/bin/bash

# Application backup script for AADU Website

PROJECT_DIR="/var/www/projects/aadu-website"
BACKUP_DIR="/var/backups/aadu-website"
DATE=$(date +%Y%m%d_%H%M%S)

# Create application backup
cd $PROJECT_DIR
tar -czf $BACKUP_DIR/application/app_backup_$DATE.tar.gz \
    --exclude='app/node_modules' \
    --exclude='app/.next' \
    --exclude='app/.git' \
    --exclude='backups' \
    --exclude='logs' \
    .

# Remove old backups (keep last 30 days)
find $BACKUP_DIR/application -name "app_backup_*.tar.gz" -mtime +30 -delete

echo "Application backup completed: app_backup_$DATE.tar.gz"
EOF

chmod +x $BACKUP_DIR/backup-application.sh

# Create full backup script
log "Creating full backup script..."
cat > $BACKUP_DIR/backup-full.sh << 'EOF'
#!/bin/bash

# Full backup script for AADU Website

BACKUP_DIR="/var/backups/aadu-website"
DATE=$(date +%Y%m%d_%H%M%S)

echo "Starting full backup..."

# Backup database
$BACKUP_DIR/backup-database.sh

# Backup application
$BACKUP_DIR/backup-application.sh

# Create backup log
echo "Full backup completed at $(date)" >> $BACKUP_DIR/logs/backup.log

echo "Full backup completed successfully!"
EOF

chmod +x $BACKUP_DIR/backup-full.sh

# Create restore script
log "Creating restore script..."
cat > $BACKUP_DIR/restore.sh << 'EOF'
#!/bin/bash

# Restore script for AADU Website

BACKUP_DIR="/var/backups/aadu-website"
PROJECT_DIR="/var/www/projects/aadu-website"

echo "AADU Website Restore Script"
echo "==========================="
echo "1. Restore database from backup"
echo "2. Restore application from backup"
echo "3. Exit"

read -p "Choose an option (1-3): " choice

case $choice in
    1)
        echo "Available database backups:"
        ls -la $BACKUP_DIR/database/backup_*.tar.gz 2>/dev/null || echo "No database backups found"
        read -p "Enter backup filename (e.g., backup_20231201_120000.tar.gz): " db_backup
        if [ -f "$BACKUP_DIR/database/$db_backup" ]; then
            echo "Restoring database from $db_backup..."
            cd $BACKUP_DIR/database
            tar -xzf $db_backup
            mongorestore --db aadu_website backup_*/aadu_website/
            rm -rf backup_*
            echo "Database restore completed"
        else
            echo "Backup file not found"
        fi
        ;;
    2)
        echo "Available application backups:"
        ls -la $BACKUP_DIR/application/app_backup_*.tar.gz 2>/dev/null || echo "No application backups found"
        read -p "Enter backup filename (e.g., app_backup_20231201_120000.tar.gz): " app_backup
        if [ -f "$BACKUP_DIR/application/$app_backup" ]; then
            echo "Restoring application from $app_backup..."
            cd $PROJECT_DIR
            tar -xzf $BACKUP_DIR/application/$app_backup
            echo "Application restore completed"
        else
            echo "Backup file not found"
        fi
        ;;
    3)
        echo "Exiting..."
        exit 0
        ;;
    *)
        echo "Invalid option"
        ;;
esac
EOF

chmod +x $BACKUP_DIR/restore.sh

# Set up cron jobs for automated backups
log "Setting up automated backup cron jobs..."

# Daily database backup at 2 AM
(crontab -l 2>/dev/null; echo "0 2 * * * $BACKUP_DIR/backup-database.sh >> $BACKUP_DIR/logs/cron.log 2>&1") | crontab -

# Weekly full backup on Sunday at 3 AM
(crontab -l 2>/dev/null; echo "0 3 * * 0 $BACKUP_DIR/backup-full.sh >> $BACKUP_DIR/logs/cron.log 2>&1") | crontab -

# Create backup monitoring script
log "Creating backup monitoring script..."
cat > $BACKUP_DIR/monitor-backups.sh << 'EOF'
#!/bin/bash

# Backup monitoring script for AADU Website

BACKUP_DIR="/var/backups/aadu-website"
RETENTION_DAYS=30

echo "Backup Status Report"
echo "==================="

# Check database backups
echo "Database Backups:"
db_backups=$(find $BACKUP_DIR/database -name "backup_*.tar.gz" -type f 2>/dev/null | wc -l)
if [ $db_backups -gt 0 ]; then
    echo "  - Found $db_backups database backup(s)"
    echo "  - Latest: $(ls -t $BACKUP_DIR/database/backup_*.tar.gz 2>/dev/null | head -1 | xargs basename 2>/dev/null || echo 'None')"
else
    echo "  - No database backups found"
fi

# Check application backups
echo "Application Backups:"
app_backups=$(find $BACKUP_DIR/application -name "app_backup_*.tar.gz" -type f 2>/dev/null | wc -l)
if [ $app_backups -gt 0 ]; then
    echo "  - Found $app_backups application backup(s)"
    echo "  - Latest: $(ls -t $BACKUP_DIR/application/app_backup_*.tar.gz 2>/dev/null | head -1 | xargs basename 2>/dev/null || echo 'None')"
else
    echo "  - No application backups found"
fi

# Check backup disk usage
echo "Backup Disk Usage:"
du -sh $BACKUP_DIR

# Check for old backups
echo "Old Backups (>$RETENTION_DAYS days):"
find $BACKUP_DIR -name "*.tar.gz" -mtime +$RETENTION_DAYS 2>/dev/null | wc -l | xargs echo "  - Count:"
EOF

chmod +x $BACKUP_DIR/monitor-backups.sh

# Create backup cleanup script
log "Creating backup cleanup script..."
cat > $BACKUP_DIR/cleanup-old-backups.sh << 'EOF'
#!/bin/bash

# Cleanup old backups script for AADU Website

BACKUP_DIR="/var/backups/aadu-website"
RETENTION_DAYS=30

echo "Cleaning up backups older than $RETENTION_DAYS days..."

# Count files to be deleted
old_files=$(find $BACKUP_DIR -name "*.tar.gz" -mtime +$RETENTION_DAYS 2>/dev/null | wc -l)

if [ $old_files -gt 0 ]; then
    echo "Found $old_files old backup file(s) to delete"
    find $BACKUP_DIR -name "*.tar.gz" -mtime +$RETENTION_DAYS -delete
    echo "Cleanup completed"
else
    echo "No old backups to clean up"
fi
EOF

chmod +x $BACKUP_DIR/cleanup-old-backups.sh

# Set up log rotation for backup logs
log "Setting up log rotation..."
sudo tee /etc/logrotate.d/aadu-backups > /dev/null << EOF
$BACKUP_DIR/logs/*.log {
    daily
    missingok
    rotate 30
    compress
    delaycompress
    notifempty
    create 644 $USER $USER
}
EOF

# Create initial backup
log "Creating initial backup..."
$BACKUP_DIR/backup-full.sh

log "Backup system setup completed!"
echo ""
echo -e "${BLUE}Backup Configuration:${NC}"
echo "- Backup directory: $BACKUP_DIR"
echo "- Database backups: Daily at 2 AM"
echo "- Full backups: Weekly on Sunday at 3 AM"
echo "- Retention period: $RETENTION_DAYS days"
echo ""
echo -e "${BLUE}Available scripts:${NC}"
echo "- $BACKUP_DIR/backup-database.sh - Database backup only"
echo "- $BACKUP_DIR/backup-application.sh - Application backup only"
echo "- $BACKUP_DIR/backup-full.sh - Full backup"
echo "- $BACKUP_DIR/restore.sh - Restore from backup"
echo "- $BACKUP_DIR/monitor-backups.sh - Check backup status"
echo "- $BACKUP_DIR/cleanup-old-backups.sh - Clean old backups"
echo ""
echo -e "${YELLOW}Next steps:${NC}"
echo "1. Test the backup system: $BACKUP_DIR/backup-full.sh"
echo "2. Set up monitoring for backup failures"
echo "3. Consider setting up off-site backups"
echo "4. Test restore procedures regularly"

