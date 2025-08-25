# Multi-Client Hosting System - Server Deployment Guide

## 🏗️ **Enhanced Multi-Client Hosting System**

This system allows you to host multiple client projects on a single server, each with their own domain, port, and SSL certificate.

## 📁 **System Architecture**

```
Server IP: 194.195.90.237
├── aadu-website (Port 3001) → aadu.online
├── client-01 (Port 3002) → client1.com
├── client-02 (Port 3003) → client2.com
├── client-03 (Port 3004) → client3.com
└── ... (up to 10 clients)
```

## 🎉 **Current Progress - AADU Website Deployed!**

### **✅ Completed:**
- [x] Enhanced scripts uploaded to server
- [x] AADU project structure created (Port 3001)
- [x] Nginx configuration created and active
- [x] DNS configured for aadu.online → 194.195.90.237
- [x] SSL certificate installed (Let's Encrypt)
- [x] GitHub token configured for automated deployment
- [x] AADU application deployed and running
- [x] Website accessible at https://aadu.online
- [x] **MongoDB database running and accessible** ✅

### **📊 Current Status:**
- **Server**: 194.195.90.237 ✅
- **Domain**: aadu.online ✅
- **SSL**: HTTPS enabled ✅
- **Application**: Running on port 3001 ✅
- **PM2**: Process managed ✅
- **Nginx**: Proxying correctly ✅
- **MongoDB**: Database connected and working ✅

### **🌐 Live Website:**
- **HTTPS**: https://aadu.online ✅
- **HTTP**: http://aadu.online (redirects to HTTPS) ✅
- **Database**: MongoDB connection successful ✅

## 🔄 **Git Workflow Guidelines**

### **📋 Development Workflow**

#### **1. Local Development:**
```bash
# Clone the repository
git clone https://github.com/eshromanch/aadu-website.git
cd aadu-website

# Create feature branch
git checkout -b feature/new-feature

# Make changes and commit
git add .
git commit -m "feat: add new feature"

# Push to GitHub
git push origin feature/new-feature
```

#### **2. Pull Request Process:**
1. **Create Pull Request** on GitHub
2. **Code Review** by team members
3. **Automated Tests** run (linting, type checking, build)
4. **Merge to main** when approved

#### **3. Deployment Process:**
```bash
# Automatic deployment on push to main/master
git push origin main

# Manual deployment (if needed)
# Go to GitHub → Actions → Deploy Aadu Website → Run workflow
```

### **🚀 GitHub Actions Workflow**

#### **Current Workflow Status:**
- ✅ **Trigger**: Push to `main` or `master` branch
- ✅ **Manual Trigger**: Available via GitHub Actions
- ✅ **Tests**: Linting, type checking, build
- ✅ **Security**: npm audit
- ✅ **Deployment**: Automatic to server

#### **Workflow Steps:**
1. **Checkout code**
2. **Setup Node.js 20**
3. **Install dependencies**
4. **Run linting**
5. **Type checking**
6. **Build application**
7. **Security audit**
8. **Deploy to server**

#### **Deployment Process:**
- ✅ **Backup** current version
- ✅ **Clone** latest code
- ✅ **Install** dependencies
- ✅ **Build** application
- ✅ **Restart** PM2 process
- ✅ **Health check**
- ✅ **Log deployment**

### **🔧 GitHub Secrets Required**

#### **Server Configuration:**
- `HOST`: 194.195.90.237
- `USERNAME`: root
- `SSH_PRIVATE_KEY`: Your server SSH key
- `PORT`: 22

#### **Application Configuration:**
- `MONGODB_URI`: mongodb://localhost:27017/aadu_website_db
- `JWT_SECRET`: Your JWT secret key

### **📝 Commit Message Guidelines**

#### **Conventional Commits:**
```bash
# Feature
git commit -m "feat: add user authentication"

# Bug fix
git commit -m "fix: resolve login issue"

# Documentation
git commit -m "docs: update README"

# Style changes
git commit -m "style: format code"

# Refactor
git commit -m "refactor: improve performance"

# Test
git commit -m "test: add unit tests"
```

#### **Branch Naming:**
```bash
feature/user-auth      # New features
bugfix/login-issue     # Bug fixes
hotfix/security-patch  # Urgent fixes
docs/readme-update     # Documentation
```

### **🔄 Deployment Triggers**

#### **Automatic Deployment:**
- ✅ **Push to main/master** → Automatic deployment
- ✅ **Pull Request merge** → Automatic deployment

#### **Manual Deployment:**
- ✅ **GitHub Actions** → Manual trigger available
- ✅ **Server deployment** → `./deploy.sh` script

### **📊 Deployment Monitoring**

#### **GitHub Actions:**
- ✅ **Workflow status** in Actions tab
- ✅ **Deployment logs** for debugging
- ✅ **Success/failure notifications**

#### **Server Monitoring:**
```bash
# Check deployment status
pm2 list
pm2 logs aadu-website

# Check application health
curl -I http://localhost:3001
curl -I https://aadu.online
```

## 🚀 **Quick Start - Deploy Your AADU Website**

### **Step 1: Upload Scripts to Server**
```bash
# Upload the enhanced scripts to your server
scp -r scripts/ root@194.195.90.237:/root/
```