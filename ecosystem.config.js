/* eslint-disable prettier/prettier */
module.exports = {
    apps: [
      {
        name: "mailsender-back",
        script: "yarn",
        args: "run start:prod",
        instances: 1,
        env: {
          NODE_ENV: "production",
        },
        log_date_format: "YYYY-MM-DD HH:mm:ss",
        watch: false,
      },
    ],
  };