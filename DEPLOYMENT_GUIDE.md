# AADU Project Deployment Guide
**Complete deployment instructions for AADU website with email functionality**

## 🚀 **Pre-Deployment Checklist**

### **1. Environment Variables Setup**
Create `.env.production` file on the server with:
```bash
# Database Configuration
MONGODB_URI=mongodb://localhost:27017/aadu-website

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-here

# Email Configuration
AADU_EMAIL_PASSWORD=your-aadu-email-password-here

# Application Configuration
NODE_ENV=production
PORT=3001
```

### **2. Email Server Setup**
Ensure the global mail server is running:
```bash
cd /var/www/global-services/mail
docker-compose ps
```

### **3. Create AADU Email Account**
In Poste.io admin panel:
1. Add domain: `aadu.online`
2. Create email: `info@aadu.online`
3. Set password for `AADU_EMAIL_PASSWORD`

## 📋 **Deployment Steps**

### **Step 1: Server Preparation**
```bash
# SSH into server
ssh root@194.195.90.237

# Navigate to project directory
cd /var/www/projects/aadu-website
```

### **Step 2: Update Code**
```bash
# Pull latest code
git pull origin main

# Install dependencies
npm ci --production
```

### **Step 3: Build Application**
```bash
# Build the application
npm run build
```

### **Step 4: Environment Setup**
```bash
# Create production environment file
cat > .env.production << 'EOF'
MONGODB_URI=mongodb://localhost:27017/aadu-website
JWT_SECRET=your-super-secret-jwt-key-here
AADU_EMAIL_PASSWORD=your-aadu-email-password-here
NODE_ENV=production
PORT=3001
EOF
```

### **Step 5: Restart Application**
```bash
# Restart PM2 process
pm2 restart aadu-website

# Check status
pm2 status
pm2 logs aadu-website
```

### **Step 6: Test Email Functionality**
```bash
# Test contact form
curl -X POST http://localhost:3001/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "phone": "1234567890",
    "subject": "Test Message",
    "message": "This is a test message"
  }'
```

## 🔧 **Email Configuration**

### **Mail Server Settings**
- **Host**: 194.195.90.237
- **Port**: 587
- **Security**: STARTTLS
- **Username**: info@aadu.online
- **Password**: Set in environment variable

### **DNS Records for AADU Domain**
```
# A Record
Name: @
Type: A
Value: 194.195.90.237

# SPF Record
Name: @
Type: TXT
Value: v=spf1 ip4:194.195.90.237 ~all

# DKIM Record (get from Poste.io admin)
Name: [selector]._domainkey
Type: TXT
Value: [Copy from Poste.io admin panel]
```

## 📧 **Email Features**

### **Contact Form Emails**
- **Admin Notification**: Sent to info@aadu.online
- **User Confirmation**: Sent to contact form submitter
- **Reply-To**: Set to user's email for easy response

### **Application Form Emails**
- **Admin Notification**: New application details
- **User Confirmation**: Application received confirmation
- **Next Steps**: Information about review process

## 🧪 **Testing**

### **Contact Form Test**
1. Go to `/contact` page
2. Fill out contact form
3. Submit form
4. Check admin email received
5. Check user confirmation email

### **Application Form Test**
1. Go to `/apply` page
2. Fill out application form
3. Submit application
4. Check admin notification email
5. Check applicant confirmation email

## 🔍 **Troubleshooting**

### **Email Not Sending**
```bash
# Check email configuration
cd /var/www/projects/aadu-website
node -e "
const { verifyEmailConfig } = require('./src/lib/email');
verifyEmailConfig().then(console.log);
"

# Check mail server status
cd /var/www/global-services/mail
docker-compose logs global-mailserver

# Check application logs
pm2 logs aadu-website
```

### **Common Issues**
1. **Email Password**: Ensure `AADU_EMAIL_PASSWORD` is set correctly
2. **Mail Server**: Verify Poste.io container is running
3. **DNS**: Check SPF/DKIM records are propagated
4. **Firewall**: Ensure port 587 is open

## 📊 **Monitoring**

### **Health Checks**
```bash
# Application health
curl http://localhost:3001/api/health

# Email server health
curl http://localhost:8080

# Database health
mongosh --eval "db.runCommand('ping')"
```

### **Log Monitoring**
```bash
# Application logs
pm2 logs aadu-website -f

# Mail server logs
docker-compose logs -f global-mailserver

# Nginx logs
tail -f /var/log/nginx/access.log
```

## 🎯 **Success Criteria**

### **Deployment Success**
- [ ] Application builds without errors
- [ ] PM2 process is running
- [ ] Website is accessible
- [ ] Contact form sends emails
- [ ] Application form sends emails
- [ ] Admin panel is functional

### **Email Success**
- [ ] Contact form emails received by admin
- [ ] User confirmation emails sent
- [ ] Application notification emails sent
- [ ] Emails delivered to Gmail/other providers
- [ ] No authentication errors in logs

---

## 🚀 **Quick Deploy Command**

```bash
# One-command deployment
cd /var/www/projects/aadu-website && \
git pull origin main && \
npm ci --production && \
npm run build && \
pm2 restart aadu-website && \
echo "✅ Deployment completed!"
```

---

**Deployment Guide Version**: 1.0  
**Last Updated**: August 27, 2025  
**Status**: Ready for Production 🚀
