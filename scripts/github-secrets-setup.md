# GitHub Secrets Setup for Automatic Deployment

This guide explains how to set up GitHub Secrets to enable automatic deployment when you push code to GitHub.

## 🔐 Required GitHub Secrets

You need to add these secrets to your GitHub repository:

### 1. Go to Your Repository Settings

1. Navigate to your GitHub repository: `https://github.com/eshromanch/aadu-website`
2. Click on **Settings** tab
3. In the left sidebar, click on **Secrets and variables** → **Actions**

### 2. Add the Following Secrets

Click **New repository secret** for each of these:

| Secret Name | Description | Value |
|-------------|-------------|-------|
| `HOST` | Your VPS IP address | `your-vps-ip-address` |
| `USERNAME` | SSH username | `your-ssh-username` |
| `SSH_PRIVATE_KEY` | Your SSH private key | `-----BEGIN OPENSSH PRIVATE KEY-----...` |
| `PORT` | SSH port (usually 22) | `22` |
| `MONGODB_URI` | MongoDB connection string | `mongodb://localhost:27017/aadu_website` |
| `JWT_SECRET` | JWT secret key | `your-super-secret-jwt-key` |

## 🔑 SSH Key Setup

### Generate SSH Key (if you don't have one)

```bash
# Generate a new SSH key pair
ssh-keygen -t ed25519 -C "your-email@example.com" -f ~/.ssh/aadu_deploy

# This creates:
# - ~/.ssh/aadu_deploy (private key)
# - ~/.ssh/aadu_deploy.pub (public key)
```

### Add Public Key to VPS

```bash
# Copy the public key to your VPS
ssh-copy-id -i ~/.ssh/aadu_deploy.pub user@your-vps-ip

# Or manually add to ~/.ssh/authorized_keys on your VPS
cat ~/.ssh/aadu_deploy.pub | ssh user@your-vps-ip "mkdir -p ~/.ssh && cat >> ~/.ssh/authorized_keys"
```

### Add Private Key to GitHub Secrets

1. Copy the private key content:
   ```bash
   cat ~/.ssh/aadu_deploy
   ```

2. Copy the entire output (including `-----BEGIN OPENSSH PRIVATE KEY-----` and `-----END OPENSSH PRIVATE KEY-----`)

3. Add it as the `SSH_PRIVATE_KEY` secret in GitHub

## 🚀 How Automatic Deployment Works

### 1. Initial Setup (One-time)

```bash
# SSH into your VPS and run the server setup
ssh user@your-vps-ip
cd scripts
./server-setup.sh
```

### 2. Automatic Deployment

Once set up, every time you push to the `main` or `master` branch:

1. **GitHub Actions triggers** automatically
2. **Tests run** (linting, type checking, build)
3. **Code deploys** to your VPS automatically
4. **Application restarts** with new code
5. **Health checks** verify deployment success

### 3. Manual Deployment

You can also trigger deployment manually:

1. Go to your GitHub repository
2. Click **Actions** tab
3. Select **Deploy Aadu Website** workflow
4. Click **Run workflow** button

## 📋 Complete Setup Checklist

### ✅ Before First Deployment

- [ ] Run `scripts/server-setup.sh` on your VPS
- [ ] Add all GitHub Secrets
- [ ] Configure domain in Nginx
- [ ] Set up SSL certificate
- [ ] Test SSH connection from GitHub Actions

### ✅ GitHub Secrets Checklist

- [ ] `HOST` - VPS IP address
- [ ] `USERNAME` - SSH username
- [ ] `SSH_PRIVATE_KEY` - Private SSH key
- [ ] `PORT` - SSH port (22)
- [ ] `MONGODB_URI` - Database connection string
- [ ] `JWT_SECRET` - JWT secret key

### ✅ VPS Setup Checklist

- [ ] Server setup script completed
- [ ] SSL certificate installed
- [ ] Domain DNS configured
- [ ] SSH key authentication working
- [ ] Firewall configured

## 🔍 Testing the Setup

### 1. Test SSH Connection

```bash
# Test SSH connection from your local machine
ssh -i ~/.ssh/aadu_deploy user@your-vps-ip
```

### 2. Test GitHub Actions

1. Make a small change to your code
2. Push to GitHub
3. Check the Actions tab to see deployment progress

### 3. Verify Deployment

```bash
# SSH into your VPS and check application status
ssh user@your-vps-ip
pm2 list
curl http://localhost:3001
```

## 🚨 Troubleshooting

### Common Issues

1. **SSH Connection Failed**
   - Verify SSH key is correct
   - Check VPS IP address
   - Ensure SSH service is running

2. **Permission Denied**
   - Check SSH key permissions: `chmod 600 ~/.ssh/aadu_deploy`
   - Verify user has sudo access

3. **Application Not Starting**
   - Check PM2 logs: `pm2 logs aadu-website`
   - Verify environment variables
   - Check MongoDB connection

4. **Build Failures**
   - Check GitHub Actions logs
   - Verify all dependencies are installed
   - Check for TypeScript errors

### Debug Commands

```bash
# Check GitHub Actions logs
# Go to Actions tab → Click on failed workflow → Check logs

# Check VPS application status
ssh user@your-vps-ip
pm2 list
pm2 logs aadu-website

# Check Nginx status
sudo systemctl status nginx
sudo nginx -t

# Check MongoDB status
sudo systemctl status mongod
```

## 📞 Support

If you encounter issues:

1. Check GitHub Actions logs for detailed error messages
2. Verify all secrets are correctly set
3. Test SSH connection manually
4. Check VPS application logs
5. Ensure server setup script completed successfully

## 🎯 Next Steps

After setting up automatic deployment:

1. **Monitor deployments** in GitHub Actions tab
2. **Set up monitoring** alerts for failed deployments
3. **Configure backup** before deployment
4. **Test rollback** procedures
5. **Set up staging** environment if needed

