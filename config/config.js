const fs = require("fs");
require("dotenv").config();
module.exports = {
  development: {
    username: process.env.DB_username,
    password: process.env.DB_password,
    database: process.env.DB_database,
    host: process.env.DB_host,
    port: process.env.DB_port,
    dialect: "mysql",
  },
  test: {
    dialect: "sqlite",
    storage: "./database.sqlite3",
  },
  production: {
    username: process.env.DB_username,
    password: process.env.DB_password,
    database: process.env.DB_database,
    host: process.env.DB_host,
    port: process.env.DB_port,
    dialect: "mysql",
  },
};
