# Server Architecture Documentation
**Complete Multi-Tenant Hosting Infrastructure**

## 🏗️ **System Overview**

### **Current Infrastructure:**
- **VPS Provider**: Contabo
- **OS**: Ubuntu 24.04.3 LTS
- **IP Address**: 194.195.90.237
- **Architecture**: Multi-tenant hosting platform
- **Purpose**: Web hosting + Email services for multiple clients

### **Resource Allocation:**
```
Total Server Resources:
├── CPU: 8 vCores
├── RAM: 7.8GB
├── Storage: 72GB SSD
└── Bandwidth: Unlimited

Current Usage:
├── System: ~800MB RAM
├── AADU Website: ~100MB RAM
├── Global Mail Server: ~500MB RAM
├── MongoDB: ~120MB RAM
├── Nginx: ~5MB RAM
└── Available: ~6.3GB RAM
```

## 🏢 **Service Architecture**

### **1. Web Hosting Layer**
```
┌─────────────────────────────────────────────────────────────┐
│                    Nginx (Reverse Proxy)                    │
│  Port 80/443 → Route to appropriate application            │
└─────────────────────────────────────────────────────────────┘
                                │
                ┌───────────────┼───────────────┐
                │               │               │
        ┌───────▼──────┐ ┌──────▼──────┐ ┌─────▼─────┐
        │ AADU Website │ │ Client 2    │ │ Client N  │
        │ Port 3001    │ │ Port 3002   │ │ Port 300N │
        └──────────────┘ └─────────────┘ └───────────┘
```

### **2. Email Services Layer**
```
┌─────────────────────────────────────────────────────────────┐
│                Global Mail Server (Poste.io)                │
│  Single instance serving multiple client domains           │
└─────────────────────────────────────────────────────────────┘
                                │
                ┌───────────────┼───────────────┐
                │               │               │
        ┌───────▼──────┐ ┌──────▼──────┐ ┌─────▼─────┐
        │ athenadevtech│ │ aadu.online │ │ Client N  │
        │ .com emails  │ │ emails      │ │ emails    │
        └──────────────┘ └─────────────┘ └───────────┘
```

### **3. Database Layer**
```
┌─────────────────────────────────────────────────────────────┐
│                    MongoDB Database                         │
│  Centralized database for all applications                 │
└─────────────────────────────────────────────────────────────┘
                                │
                ┌───────────────┼───────────────┐
                │               │               │
        ┌───────▼──────┐ ┌──────▼──────┐ ┌─────▼─────┐
        │ AADU Data    │ │ Client 2    │ │ Client N  │
        │ Collections  │ │ Collections │ │ Collections│
        └──────────────┘ └─────────────┘ └───────────┘
```

## 📁 **Directory Structure**

```
/var/www/
├── projects/                    # Client websites
│   ├── aadu-website/           # AADU project
│   │   ├── app/               # Application code
│   │   ├── logs/              # Application logs
│   │   ├── backups/           # Application backups
│   │   ├── ssl/               # SSL certificates
│   │   └── config/            # Configuration files
│   ├── client-2-website/      # Client 2 project
│   └── client-n-website/      # Client N project
├── global-services/            # Global services
│   ├── mail/                  # Mail server
│   │   ├── docker-compose.yml
│   │   ├── global-mail-data/
│   │   ├── manage-mail.sh
│   │   └── monitor-mail.sh
│   ├── monitoring/            # Monitoring tools
│   └── backup/                # Backup services
├── backups/                   # System backups
├── logs/                      # System logs
└── ssl/                       # SSL certificates
```

## 🔧 **Technology Stack**

### **Core Technologies:**
- **Web Server**: Nginx (Reverse proxy + Static files)
- **Application Server**: Node.js + PM2 (Process manager)
- **Database**: MongoDB (NoSQL database)
- **Mail Server**: Poste.io (Docker-based)
- **Containerization**: Docker + Docker Compose
- **SSL/TLS**: Let's Encrypt (Certbot)

### **Development Stack:**
- **Frontend**: Next.js (React framework)
- **Backend**: Node.js + Express
- **Database**: MongoDB + Mongoose
- **Authentication**: JWT tokens
- **File Upload**: Multer + Cloud storage

### **Monitoring & Security:**
- **Firewall**: UFW (Uncomplicated Firewall)
- **Intrusion Detection**: Fail2ban
- **Monitoring**: Built-in system monitoring
- **Backup**: Automated daily backups
- **Logging**: Centralized logging system

## 🌐 **Network Architecture**

### **Port Allocation:**
```
Port 22    → SSH (Secure Shell)
Port 25    → SMTP (Mail sending)
Port 80    → HTTP (Web traffic)
Port 443   → HTTPS (Secure web traffic)
Port 587   → SMTP Submission (Mail sending)
Port 993   → IMAP SSL (Mail receiving)
Port 995   → POP3 SSL (Mail receiving)
Port 3001  → AADU Website
Port 3002  → Client 2 Website
Port 300N  → Client N Website
Port 8080  → Mail Server Web Interface
Port 27017 → MongoDB Database
```

### **Firewall Rules:**
```bash
# Allow SSH
ufw allow ssh

# Allow HTTP/HTTPS
ufw allow 'Nginx Full'

# Allow Mail ports
ufw allow 25/tcp   # SMTP
ufw allow 587/tcp  # SMTP Submission
ufw allow 993/tcp  # IMAP SSL
ufw allow 995/tcp  # POP3 SSL

# Allow Application ports
ufw allow 3001/tcp # AADU Website
ufw allow 8080/tcp # Mail Server Web Interface
```

## 📊 **Scaling Strategy**

### **Current Capacity:**
- **Websites**: 10+ client websites
- **Email Domains**: Unlimited
- **Storage**: 72GB available
- **Bandwidth**: Unlimited

### **Vertical Scaling (Current):**
- Upgrade VPS resources (CPU, RAM, Storage)
- Optimize application performance
- Implement caching strategies

### **Horizontal Scaling (Future):**
```
Load Balancer (HAProxy/Nginx)
    ├── Server 1 (Web + Mail)
    ├── Server 2 (Web + Mail)
    └── Server 3 (Database + Storage)
```

### **Microservices Architecture (Future):**
```
┌─────────────────┐ ┌─────────────────┐ ┌─────────────────┐
│   Web Server    │ │  Mail Server    │ │  Database       │
│   (Nginx)       │ │  (Poste.io)     │ │  (MongoDB)      │
└─────────────────┘ └─────────────────┘ └─────────────────┘
         │                    │                    │
         └────────────────────┼────────────────────┘
                              │
                    ┌─────────▼─────────┐
                    │   Load Balancer   │
                    │   (HAProxy)       │
                    └───────────────────┘
```

## 🔒 **Security Architecture**

### **Network Security:**
- **Firewall**: UFW with strict rules
- **SSH**: Key-based authentication only
- **Fail2ban**: Intrusion detection
- **Rate Limiting**: Nginx rate limiting

### **Application Security:**
- **HTTPS**: SSL/TLS encryption
- **Headers**: Security headers in Nginx
- **Authentication**: JWT tokens
- **Input Validation**: Server-side validation

### **Data Security:**
- **Backups**: Encrypted daily backups
- **Database**: Access control
- **File Uploads**: Validation and scanning
- **Logs**: Secure logging practices

## 📈 **Performance Optimization**

### **Web Performance:**
- **Gzip Compression**: Enabled in Nginx
- **Caching**: Browser and server caching
- **CDN**: Static asset delivery
- **Image Optimization**: Compressed images

### **Database Performance:**
- **Indexing**: Proper MongoDB indexes
- **Connection Pooling**: Optimized connections
- **Query Optimization**: Efficient queries
- **Monitoring**: Performance monitoring

### **Mail Performance:**
- **ClamAV**: Disabled for performance
- **Connection Pooling**: Optimized mail connections
- **Rate Limiting**: Prevent abuse
- **Monitoring**: Mail delivery monitoring

## 🔄 **Deployment Architecture**

### **GitHub Actions Workflow:**
```
Push to Main Branch
        │
        ▼
┌─────────────────┐
│   Build & Test  │
└─────────────────┘
        │
        ▼
┌─────────────────┐
│  Deploy to VPS  │
└─────────────────┘
        │
        ▼
┌─────────────────┐
│  Health Check   │
└─────────────────┘
```

### **Deployment Process:**
1. **Code Push**: Developer pushes to main branch
2. **Automated Build**: GitHub Actions builds application
3. **Testing**: Automated tests run
4. **Deployment**: Code deployed to VPS
5. **Health Check**: Application health verified
6. **Rollback**: Automatic rollback on failure

## 📋 **Monitoring & Maintenance**

### **System Monitoring:**
- **Resource Usage**: CPU, RAM, Disk, Network
- **Service Status**: All services monitored
- **Log Analysis**: Centralized logging
- **Performance Metrics**: Response times, throughput

### **Application Monitoring:**
- **Health Checks**: Regular health checks
- **Error Tracking**: Error logging and alerting
- **Performance Monitoring**: Application performance
- **User Analytics**: Usage statistics

### **Maintenance Schedule:**
- **Daily**: Health checks, log review
- **Weekly**: Security updates, performance review
- **Monthly**: Full system backup, optimization
- **Quarterly**: Security audit, capacity planning

## 🚀 **Future Enhancements**

### **Short Term (1-3 months):**
- [ ] SSL certificates for all domains
- [ ] Automated monitoring dashboard
- [ ] Enhanced backup system
- [ ] Performance optimization

### **Medium Term (3-6 months):**
- [ ] Load balancer implementation
- [ ] CDN integration
- [ ] Advanced monitoring (Prometheus + Grafana)
- [ ] Automated scaling

### **Long Term (6+ months):**
- [ ] Microservices architecture
- [ ] Kubernetes deployment
- [ ] Multi-region deployment
- [ ] Advanced analytics

---

## 📞 **Support & Documentation**

### **Documentation:**
- **Setup Guides**: Complete setup instructions
- **Troubleshooting**: Common issues and solutions
- **API Documentation**: Application APIs
- **Client Guides**: Client onboarding procedures

### **Support Procedures:**
- **Emergency Contacts**: Key personnel contacts
- **Escalation Matrix**: Issue escalation procedures
- **Response Times**: SLA commitments
- **Communication Channels**: Support communication

---

**Architecture Version**: 1.0  
**Last Updated**: August 27, 2025  
**Status**: Production Ready 🚀
