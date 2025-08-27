# Global Multi-Tenant Mail Server Architecture
**Single Poste.io Instance for All Clients - Resource Optimized**

## 🎯 **Architecture Overview**

```
Optimized Server Architecture:
├── Single Poste.io Mail Server (Global)
│   ├── Web Interface: mail.[server-ip].com (Port 8080)
│   ├── Domains:
│   │   ├── aadu.online
│   │   ├── client2.com
│   │   ├── client3.org
│   │   └── clientN.net
│   └── Resource Usage: ~500MB RAM total
├── Client Applications (Separate)
│   ├── aadu.online → Port 3001
│   ├── client2.com → Port 3002
│   └── clientN.net → Port 300N
└── Nginx Proxy (Domain Routing)
    ├── mail.[server-ip].com → Poste.io
    ├── aadu.online → App (3001)
    └── client2.com → App (3002)
```

## 💰 **Resource Comparison**

### ❌ Old Architecture (Per-Client Mail Servers)
```
10 Clients = 10 × 400MB = 4,000MB RAM (4GB)
- Complex management (10 containers)
- Port conflicts
- Duplicate configurations
- Higher maintenance overhead
```

### ✅ New Architecture (Single Multi-Tenant)
```
10 Clients = 1 × 500MB = 500MB RAM
- Single management interface
- No port conflicts
- Centralized configuration
- 87.5% RAM savings!
```

## 🏗️ **Implementation Steps**

### Step 1: Install Global Mail Server
```bash
#!/bin/bash
# File: setup-global-mail-server.sh

echo "🚀 Setting up Global Multi-Tenant Mail Server"

# Create global mail directory
sudo mkdir -p /var/www/global-services/mail
cd /var/www/global-services/mail

# Create docker-compose.yml for global mail server
cat > docker-compose.yml << 'EOF'
services:
  mailserver:
    image: analogic/poste.io
    container_name: global-mailserver
    hostname: mail.server-domain.com  # Use your server's domain
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
EOF

# Start global mail server
docker-compose up -d

echo "✅ Global mail server started"
echo "🌐 Access at: http://[server-ip]:8080"
```

### Step 2: Setup Nginx for Mail Interface
```bash
# Create Nginx configuration for mail subdomain
sudo tee /etc/nginx/sites-available/global-mail << 'EOF'
server {
    listen 80;
    server_name mail.[server-domain].com;  # Or use IP: mail.194.195.90.237.com
    
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

# Enable site
sudo ln -s /etc/nginx/sites-available/global-mail /etc/nginx/sites-enabled/
sudo nginx -t && sudo systemctl reload nginx
```

### Step 3: Client Onboarding Process
```bash
#!/bin/bash
# File: add-client-domain.sh

add_client_domain() {
    local client_name=$1
    local domain=$2
    
    echo "📧 Adding domain $domain for client $client_name"
    
    # Client only needs to:
    # 1. Add DNS records pointing to our server
    # 2. Admin adds domain through Poste.io web interface
    
    cat << EOF
=================================
CLIENT SETUP INSTRUCTIONS
=================================
Client: $client_name
Domain: $domain

DNS Records to Add:
------------------
Type    Name    Value               TTL
A       mail    [server-ip]         3600
MX      @       mail.$domain        3600  (Priority: 10)
TXT     @       "v=spf1 mx ~all"    3600

Admin Tasks:
-----------
1. Login to mail.[server-domain].com
2. Add domain: $domain
3. Create email accounts for client
4. Provide SMTP settings to client

SMTP Settings for Client:
------------------------
Server: mail.[server-domain].com
Port: 587
Security: STARTTLS
Auth: Username/Password (created in admin panel)
EOF
}

# Usage: ./add-client-domain.sh client-name client-domain.com
add_client_domain "$1" "$2"
```

## 🔧 **Management Workflow**

### For New Clients:
1. **Client provides domain** (e.g., `newclient.com`)
2. **Client adds DNS records** pointing to your server
3. **You add domain** via Poste.io admin panel
4. **Create email accounts** for client:
   - `info@newclient.com`
   - `support@newclient.com` 
   - `admin@newclient.com`
5. **Provide SMTP credentials** to client
6. **Client integrates** with their contact forms

### Admin Panel Access:
- **URL**: `http://mail.[server-domain].com`
- **You control**: All domains, all email accounts
- **Client gets**: Only their email credentials
- **Security**: Clients can't access other clients' emails

## 📧 **Client Integration Example**

### Nodemailer Configuration (Client Side):
```javascript
// Client's contact form integration
const transporter = nodemailer.createTransporter({
  host: 'mail.[server-domain].com',  // Your global mail server
  port: 587,
  secure: false,
  auth: {
    user: 'contact@clientdomain.com',  // Account you created
    pass: 'password-you-provided'      // Password you set
  }
});

// Client sends emails from their domain
await transporter.sendMail({
  from: 'contact@clientdomain.com',
  to: 'info@clientdomain.com',
  subject: 'Contact Form Submission',
  html: emailContent
});
```

## 🎯 **Benefits of This Architecture**

### Resource Efficiency:
- **87.5% less RAM usage** for mail services
- **Single container** to manage and monitor
- **Shared resources** across all clients

### Management Simplicity:
- **One web interface** for all mail management
- **Centralized monitoring** and maintenance
- **Single SSL certificate** for mail interface
- **No port conflicts** between clients

### Scalability:
- **Add domains instantly** through web interface
- **No server restarts** needed for new clients
- **Unlimited domains** (within resource limits)
- **Easy backup** (single mail-data directory)

### Client Benefits:
- **Professional email** from their domain
- **Reliable delivery** through established server
- **No setup complexity** on their end
- **Standard SMTP integration** for their apps

## 🔒 **Security Considerations**

### Isolation:
- ✅ **Email isolation**: Each domain's emails are separate
- ✅ **Admin control**: Only you can manage all domains
- ✅ **Client access**: Limited to their email accounts only
- ✅ **No cross-contamination**: Clients can't see other domains

### Access Control:
- **Master admin**: You (full access)
- **Client users**: Only their domain's email accounts
- **Web interface**: Secure login per user
- **SMTP auth**: Per-account authentication

## 📊 **Migration from Current Setup**

### If You Already Have Per-Client Mail Servers:
```bash
# 1. Stop current client mail servers
docker-compose down

# 2. Backup existing mail data
tar -czf client-mail-backup.tar.gz mail-data/

# 3. Set up global mail server
./setup-global-mail-server.sh

# 4. Add domains through web interface
# 5. Migrate email accounts manually
# 6. Update client SMTP settings
# 7. Remove old mail containers
```

## 🎉 **Immediate Benefits for AADU**

### Current AADU Setup:
- Remove dedicated mail container (saves 433MB RAM)
- Keep same email addresses (`info@aadu.online`)
- Same SMTP integration (just change server address)
- Better resource utilization

### Implementation:
1. Set up global mail server
2. Add `aadu.online` domain
3. Create AADU email accounts
4. Update contact form SMTP settings
5. Remove old mail container
6. **Save 433MB RAM immediately!**

---

## 🚀 **Recommendation: IMPLEMENT THIS NOW**

**This architecture is:**
- ✅ **More resource efficient** (87.5% RAM savings)
- ✅ **Easier to manage** (single interface)
- ✅ **More scalable** (add domains instantly)
- ✅ **More professional** (centralized mail server)
- ✅ **Cost effective** (one mail server for all clients)

**Next Steps:**
1. Set up global mail server
2. Test with AADU domain
3. Migrate existing setup
4. Update documentation
5. Ready for unlimited client domains!

This is definitely the way to go! 🎯

