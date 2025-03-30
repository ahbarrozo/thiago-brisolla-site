module.exports = {
  apps: [
    {
      name: "api",
      cwd: "/apps/api",
      script: "bun",
      args: "run dist/index.js > log",
      env: {
        NODE_ENV: "production",
        PORT: 3000
      }
    },
    {
      name: "site",
      cwd: "/apps/site",
      script: "node",
      args: "--env-file=.env build",
      env: {
        NODE_ENV: "production",
        PORT: 5173
      }
    }
  ]
};
