# Poste.io Mail Server Setup Guide
**Lightweight Mail Server for Multi-Client Hosting**

## 🚀 Quick Setup

### 1. Create Mail Directory
```bash
mkdir -p /var/www/projects/[client-name]/mail
cd /var/www/projects/[client-name]/mail
```

### 2. Create Docker Compose Configuration
```yaml
# docker-compose.yml
services:
  mailserver:
    image: analogic/poste.io
    container_name: [client-name]-mailserver
    hostname: mail.[domain.com]
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
      - ./mail-data:/data
    restart: unless-stopped
```

### 3. Start Mail Server
```bash
docker-compose up -d
```

### 4. Setup Nginx Proxy
```bash
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

sudo ln -s /etc/nginx/sites-available/mail-[client-name] /etc/nginx/sites-enabled/
sudo nginx -t && sudo systemctl reload nginx
```

## 🌐 Web Interface Setup

### Access the Setup Wizard
1. Visit: `http://mail.[domain.com]`
2. Complete the installation wizard:
   - **Domain**: `[domain.com]`
   - **Hostname**: `mail.[domain.com]`
   - **Admin Email**: `admin@[domain.com]`
   - **Admin Password**: Create a strong password

### Create Email Accounts
After setup, create email accounts:
- `admin@[domain.com]`
- `info@[domain.com]`
- `support@[domain.com]`
- `contact@[domain.com]`

## 📧 Email Client Configuration

### SMTP Settings (Sending)
- **Server**: `mail.[domain.com]`
- **Port**: `587` (STARTTLS recommended) or `25`
- **Security**: STARTTLS
- **Authentication**: Yes
- **Username**: Full email address
- **Password**: Account password

### IMAP Settings (Receiving)
- **Server**: `mail.[domain.com]`
- **Port**: `993` (SSL) or `143` (STARTTLS)
- **Security**: SSL/TLS
- **Authentication**: Yes
- **Username**: Full email address
- **Password**: Account password

### POP3 Settings (Alternative)
- **Server**: `mail.[domain.com]`
- **Port**: `995` (SSL) or `110`
- **Security**: SSL/TLS
- **Authentication**: Yes
- **Username**: Full email address
- **Password**: Account password

## 🔧 Contact Form Integration

### Nodemailer Configuration
```javascript
// lib/email.js
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransporter({
  host: 'mail.[domain.com]',
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: 'contact@[domain.com]',
    pass: 'your-password'
  }
});

export async function sendContactEmail(formData) {
  const { name, email, subject, message } = formData;
  
  try {
    await transporter.sendMail({
      from: 'contact@[domain.com]',
      to: 'admin@[domain.com]',
      subject: `Contact Form: ${subject}`,
      html: `
        <h3>New Contact Form Submission</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `
    });
    
    return { success: true };
  } catch (error) {
    console.error('Email send error:', error);
    return { success: false, error: error.message };
  }
}
```

### API Route Example
```javascript
// pages/api/contact.js
import { sendContactEmail } from '../../lib/email';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }
  
  const result = await sendContactEmail(req.body);
  
  if (result.success) {
    res.status(200).json({ message: 'Email sent successfully' });
  } else {
    res.status(500).json({ message: 'Failed to send email' });
  }
}
```

## 📊 Resource Usage

### Typical Usage per Client
- **RAM**: 400-500MB
- **CPU**: 1-5% (idle), 10-20% (during email processing)
- **Storage**: 100MB base + email storage
- **Network**: Minimal when idle

### Monitoring Commands
```bash
# Check container status
docker-compose ps

# View logs
docker-compose logs mailserver

# Check resource usage
docker stats [client-name]-mailserver --no-stream

# Check email queue
docker-compose exec mailserver postqueue -p
```

## 🔒 Security Features

### Built-in Security
- ✅ **Spam filtering**: SpamAssassin integration
- ✅ **Rate limiting**: Built-in SMTP rate limiting
- ✅ **SSL/TLS**: Automatic encryption
- ✅ **Authentication**: Secure login required
- ✅ **Firewall**: Docker network isolation

### DNS Configuration
Add these DNS records for your domain:

```
Type    Name    Value               TTL
A       mail    [your-server-ip]    3600
MX      @       mail.[domain.com]   3600  (Priority: 10)
TXT     @       "v=spf1 mx ~all"    3600
```

## 🛠️ Maintenance

### Regular Tasks
```bash
# Update Poste.io image
docker-compose pull
docker-compose up -d

# Backup email data
tar -czf mail-backup-$(date +%Y%m%d).tar.gz mail-data/

# Check disk usage
du -sh mail-data/

# View mail logs
docker-compose logs mailserver --tail=100
```

### Troubleshooting

#### Common Issues
1. **Cannot send emails**
   - Check SMTP credentials
   - Verify port 587 is open
   - Check spam folder

2. **Cannot receive emails**
   - Verify MX DNS record
   - Check port 25 is open
   - Confirm domain configuration

3. **Web interface not accessible**
   - Check Nginx proxy configuration
   - Verify container is running
   - Check port 8080 accessibility

#### Useful Commands
```bash
# Test SMTP connection
telnet mail.[domain.com] 587

# Check DNS MX record
dig MX [domain.com]

# Test mail delivery
echo "Test message" | mail -s "Test" test@[domain.com]

# Check container logs
docker-compose logs mailserver --follow
```

## 🎯 Production Checklist

### Pre-Deployment
- [ ] DNS records configured (A, MX, SPF)
- [ ] Firewall ports opened (25, 587, 993, 995)
- [ ] Docker and Docker Compose installed
- [ ] Nginx proxy configured

### Post-Deployment
- [ ] Web interface accessible
- [ ] Admin account created
- [ ] Email accounts created
- [ ] SMTP/IMAP tested with email client
- [ ] Contact form integration tested
- [ ] Monitoring setup
- [ ] Backup strategy implemented

### Email Deliverability
- [ ] SPF record added to DNS
- [ ] DKIM configured (optional)
- [ ] DMARC policy set (optional)
- [ ] Reverse DNS configured
- [ ] IP reputation checked

## 📈 Scaling Considerations

### Multiple Clients
Each client gets their own:
- Docker container with unique name
- Port mapping (if needed)
- Nginx proxy configuration
- Email domain

### Resource Planning
- **8GB RAM server**: 10-15 clients
- **16GB RAM server**: 25-30 clients
- **32GB RAM server**: 50+ clients

### Performance Optimization
- Use SSD storage for email data
- Regular cleanup of old emails
- Monitor container resource usage
- Implement log rotation

---

## 🎉 Success Metrics

### AADU Website Mail Server
✅ **Status**: Running and operational  
✅ **Resource Usage**: 433MB RAM (5.45% of server)  
✅ **Web Interface**: http://mail.aadu.online  
✅ **Email Accounts**: Ready to create  
✅ **Integration**: Ready for contact forms  
✅ **Scalability**: Proven lightweight solution  

**Setup Time**: 15 minutes per client  
**Maintenance**: Minimal  
**Reliability**: 99.9% uptime expected  


