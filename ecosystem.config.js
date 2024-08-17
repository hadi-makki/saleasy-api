module.exports = {
  apps: [
    {
      name: 'my-global-routes',
      script: './dist/main.js',
      cwd: '/home/ubuntu/saleasy-api',
      watch: true,
      env: {
        NODE_ENV: 'production',
      },
    },
  ],
};
