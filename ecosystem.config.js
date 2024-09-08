module.exports = {
  apps: [
    {
      name: 'saleasy-api',
      script: 'yarn',
      args: 'start',
      cwd: 'saleasy-api',
      watch: true,
      env: {
        NODE_ENV: 'production',
      },
    },
  ],
};
