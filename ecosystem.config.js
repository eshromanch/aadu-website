module.exports = {
  apps: [{
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
  }]
};
