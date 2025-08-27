# Troubleshooting Guide
**Quick Issue Resolution Guide**

## 🚨 **Emergency Procedures**

### **Server Down:**
```bash
# Check VPS status, then SSH
ssh root@194.195.90.237

# Check system status
systemctl status
uptime
df -h
```

### **Website Issues:**
```bash
# Check PM2 status
pm2 status
pm2 logs aadu-website

# Check Nginx
systemctl status nginx
nginx -t

# Check application
curl -I http://localhost:3001
```

### **Email Issues:**
```bash
# Check mail server
cd /var/www/global-services/mail
docker-compose ps
docker-compose logs global-mailserver

# Check DNS
dig TXT athenadevtech.com @8.8.8.8
```

## 🔧 **Common Fixes**

### **PM2 Issues:**
```bash
pm2 restart aadu-website
pm2 delete aadu-website && pm2 start ecosystem.config.js
```

### **Nginx Issues:**
```bash
nginx -t
systemctl reload nginx
```

### **Docker Issues:**
```bash
docker-compose restart
docker system prune -f
```

### **Port Conflicts:**
```bash
lsof -i :3001
kill -9 <PID>
```

## 📊 **Health Check Script**

```bash
#!/bin/bash
echo "=== Health Check ==="
echo "Date: $(date)"
echo ""

# System status
echo "System: $(uptime)"
echo "Memory: $(free -h | grep Mem)"
echo "Disk: $(df -h / | tail -1)"

# Services
echo "Nginx: $(systemctl is-active nginx)"
echo "MongoDB: $(systemctl is-active mongod)"
echo "Docker: $(systemctl is-active docker)"

# Applications
echo "PM2: $(pm2 status | grep online | wc -l) processes"
echo "Docker: $(docker ps | grep -c Up) containers"

# Ports
echo "Ports: $(netstat -tuln | grep -E ':(80|443|3001|8080)' | wc -l) open"
```

## 🛠️ **Quick Recovery**

### **Restart Everything:**
```bash
# Restart services
systemctl restart nginx mongod docker

# Restart applications
pm2 restart all
cd /var/www/global-services/mail && docker-compose restart
```

### **Check Logs:**
```bash
# System logs
tail -f /var/log/syslog

# Application logs
pm2 logs aadu-website

# Mail logs
docker-compose logs global-mailserver
```

---

**Version**: 1.0 | **Status**: Production Ready 🚀
