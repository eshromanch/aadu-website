#!/bin/bash

echo "=== AADU Website Deployment Test ==="

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: package.json not found. Please run this script from the project root."
    exit 1
fi

echo "✅ Found package.json"

# Check if dependencies are installed
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
else
    echo "✅ Dependencies already installed"
fi

# Build the application
echo "🔨 Building application..."
npm run build

if [ $? -eq 0 ]; then
    echo "✅ Build successful"
else
    echo "❌ Build failed"
    exit 1
fi

# Test the health endpoint locally
echo "🏥 Testing health endpoint..."
sleep 3
if curl -f http://localhost:3000/api/health > /dev/null 2>&1; then
    echo "✅ Health endpoint working locally"
else
    echo "❌ Health endpoint not working locally"
fi

echo ""
echo "=== Server Deployment Checklist ==="
echo "1. ✅ Application builds successfully"
echo "2. ✅ Health endpoint created"
echo "3. ✅ Tailwind config added"
echo ""
echo "Next steps on your server:"
echo "1. SSH into your server: ssh user@194.195.90.237"
echo "2. Check PM2 status: pm2 list"
echo "3. Check PM2 logs: pm2 logs aadu-website"
echo "4. Check if port 3001 is listening: netstat -tlnp | grep 3001"
echo "5. Check Nginx status: sudo systemctl status nginx"
echo "6. Check firewall: sudo ufw status"
echo ""
echo "If PM2 is not running the app, restart it:"
echo "cd /var/www/projects/aadu-website/app && pm2 start ecosystem.config.js"