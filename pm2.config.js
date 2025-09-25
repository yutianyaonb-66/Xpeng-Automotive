module.exports = {
  apps: [
    {
      name: 'xpeng',
      script: 'npm',
      args: 'run start',
      instances: 1,
      output: './logs/out.log',
      error: './logs/err.log',
      env: {
        NODE_ENV: 'production'
      }
    }
  ]
}
