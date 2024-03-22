const Sequelize = require("sequelize");

const db = new Sequelize("TestDB", "postgres", "9999", {
  host: "localhost",
  dialect: "postgres",
});

module.exports = db;
