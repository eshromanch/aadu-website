# Aadu Website Deployment Setup

## 1. Create GitHub Actions Workflow

Create `.github/workflows/deploy.yml` in your repository root:

```yaml
name: Deploy Aadu Website

on:
  push:
    branches: [ main, master ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
    - name: Checkout code
      uses: actions/checkout@v4
      
    - name: Setup Node.js
      uses: actions/setup-node@v4
      with:
        node-version: '20'
        cache: 'npm'
        
    - name: Install dependencies
      run: npm ci
      
    - name: Build application
      run: npm run build
      
    - name: Deploy to server
      uses: appleboy/ssh-action@v1.0.3
      with:
        host: ${{ secrets.HOST }}
        username: ${{ secrets.USERNAME }}
        key: ${{ secrets.SSH_PRIVATE_KEY }}
        port: ${{ secrets.PORT }}
        envs: MONGODB_URI,JWT_SECRET
        script: |
          cd /var/www/projects/aadu-website
          
          # Stop the application
          pm2 stop aadu-website || true
          
          # Backup current version
          if [ -d "app" ]; then
            cp -r app backups/app-$(date +%Y%m%d_%H%M%S)
            # Keep only last 5 backups
            ls -t backups/ | tail -n +6 | xargs -I {} rm -rf backups/{}
          fi
          
          # Remove existing app directory for fresh clone
          rm -rf app
          
          # Clone latest code
          git clone https://github.com/eshromanch/aadu-website.git app
          
          cd app
          
          # Create .env.production file
          cat > .env.production << 'ENV_EOF'
          MONGODB_URI=$MONGODB_URI
          JWT_SECRET=$JWT_SECRET
          NODE_ENV=production
          PORT=3001
          ENV_EOF
          
          # Install dependencies and build
          npm ci
          npm run build
          
          # Copy ecosystem config to app directory
          cp ../ecosystem.config.js .
          
          # Start/restart with PM2
          pm2 start ecosystem.config.js || pm2 restart aadu-website
          
          # Test and reload Nginx
          sudo nginx -t && sudo systemctl reload nginx
          
          echo "Deployment completed successfully!"
      env:
        MONGODB_URI: ${{ secrets.MONGODB_URI }}
        JWT_SECRET: ${{ secrets.JWT_SECRET }}
```

## 2. Server Setup Commands

Run these commands on your Contabo VPS:

### Create Project Structure
```bash
# Create project directories
sudo mkdir -p /var/www/projects/aadu-website/{app,logs,backups,ssl}
sudo chown -R $USER:www-data /var/www/projects/aadu-website
sudo chmod -R 755 /var/www/projects/aadu-website
```

### Create PM2 Ecosystem Configuration
```bash
# Create PM2 config
cat > /var/www/projects/aadu-website/ecosystem.config.js << 'EOF'
module.exports = {
  apps: [
    {
      name: 'aadu-website',
      script: 'npm',
      args: 'start',
      cwd: '/var/www/projects/aadu-website/app',
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'production',
        PORT: 3001
      },
      error_file: '/var/www/projects/aadu-website/logs/err.log',
      out_file: '/var/www/projects/aadu-website/logs/out.log',
      log_file: '/var/www/projects/aadu-website/logs/combined.log',
      time: true
    }
  ]
};
EOF
```

### Create Nginx Configuration
```bash
# Create Nginx config
sudo tee /etc/nginx/sites-available/aadu-website > /dev/null << 'EOF'
server {
    listen 80;
    server_name your-domain.com www.your-domain.com;  # Replace with your actual domain
    
    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header Referrer-Policy "no-referrer-when-downgrade" always;
    add_header Content-Security-Policy "default-src 'self' http: https: data: blob: 'unsafe-inline'" always;
    
    # Gzip compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_proxied expired no-cache no-store private must-revalidate;
    gzip_types text/plain text/css text/xml text/javascript application/x-javascript application/xml+rss application/javascript;
    
    # Rate limiting
    limit_req_zone $binary_remote_addr zone=aadu:10m rate=10r/s;
    limit_req zone=aadu burst=20 nodelay;
    
    # Proxy to Next.js application
    location / {
        proxy_pass http://localhost:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
        proxy_read_timeout 86400;
    }
    
    # Static files caching for Next.js
    location /_next/static/ {
        proxy_pass http://localhost:3001;
        add_header Cache-Control "public, immutable, max-age=31536000";
    }
    
    # API routes
    location /api/ {
        proxy_pass http://localhost:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
    
    # Logs
    access_log /var/www/projects/aadu-website/logs/nginx_access.log;
    error_log /var/www/projects/aadu-website/logs/nginx_error.log;
}
EOF

# Enable the site
sudo ln -s /etc/nginx/sites-available/aadu-website /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

## 3. GitHub Repository Secrets

Add these secrets in your GitHub repository (Settings → Secrets and variables → Actions):

- `HOST`: Your Contabo VPS IP address
- `USERNAME`: Your VPS username (usually root or your created user)
- `SSH_PRIVATE_KEY`: Your SSH private key content
- `PORT`: SSH port (usually 22)
- `MONGODB_URI`: Your MongoDB connection string
- `JWT_SECRET`: Your JWT secret key

## 4. SSH Key Setup for GitHub Actions

On your VPS, run:

```bash
# Generate SSH key pair
ssh-keygen -t rsa -b 4096 -C "github-actions-aadu" -f ~/.ssh/github_actions_aadu

# Add public key to authorized_keys
cat ~/.ssh/github_actions_aadu.pub >> ~/.ssh/authorized_keys

# Display private key (copy this to GitHub secrets)
echo "=== COPY THIS PRIVATE KEY TO GITHUB SSH_PRIVATE_KEY SECRET ==="
cat ~/.ssh/github_actions_aadu
echo "============================================================="
```

## 5. Manual First Deployment Test

Before using GitHub Actions, test manual deployment:

```bash
# SSH to your server
ssh your-username@your-vps-ip

# Navigate to project directory
cd /var/www/projects/aadu-website

# Clone your repository
git clone https://github.com/eshromanch/aadu-website.git app

# Go to app directory
cd app

# Create environment file
cat > .env.production << 'EOF'
MONGODB_URI=mongodb://localhost:27017/aadu_website
JWT_SECRET=your-super-secure-jwt-secret-here
NODE_ENV=production
PORT=3001
EOF

# Install dependencies and build
npm ci
npm run build

# Copy PM2 config
cp ../ecosystem.config.js .

# Start with PM2
pm2 start ecosystem.config.js

# Check if it's running
pm2 list
pm2 logs aadu-website
```

## 6. Setup SSL Certificate

After your domain points to the server:

```bash
# Install SSL certificate
sudo certbot --nginx -d your-domain.com -d www.your-domain.com

# Test auto-renewal
sudo certbot renew --dry-run
```

## 7. Monitoring Commands

```bash
# Check application status
pm2 list
pm2 logs aadu-website

# Check Nginx status
sudo systemctl status nginx
sudo nginx -t

# Check MongoDB status
sudo systemctl status mongod

# View application logs
tail -f /var/www/projects/aadu-website/logs/combined.log

# Check disk usage
df -h
du -sh /var/www/projects/aadu-website/
```

## 8. Troubleshooting

### If deployment fails:
1. Check GitHub Actions logs
2. Check PM2 logs: `pm2 logs aadu-website`
3. Check Nginx logs: `sudo tail -f /var/log/nginx/error.log`
4. Verify environment variables are set correctly

### If application won't start:
1. Check if port 3001 is available: `sudo netstat -tlnp | grep :3001`
2. Check Next.js build: `cd /var/www/projects/aadu-website/app && npm run build`
3. Check environment file: `cat /var/www/projects/aadu-website/app/.env.production`

### If Nginx shows errors:
1. Test configuration: `sudo nginx -t`
2. Check if application is running on port 3001
3. Verify domain DNS settings

## 9. Update Your Domain

Replace `your-domain.com` in the Nginx configuration with your actual domain name.

This setup will give you:
- ✅ Automatic deployment on git push
- ✅ Process management with PM2
- ✅ Nginx reverse proxy with security headers
- ✅ SSL certificate support
- ✅ Proper logging and monitoring
- ✅ Automatic backups before deployment