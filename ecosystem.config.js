module.exports = {
  apps: [
    {
      name: 'my-global-routes',
      script: './dist/main.js',
      cwd: '/home/ubuntu/my-global-routes',
      watch: true,
      env: {
        NODE_ENV: 'production',
      },
    },
  ],
};
