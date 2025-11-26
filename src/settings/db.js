const { Sequelize } = require("sequelize")

const sequelize = new Sequelize(
    "senatronics",
    "root",
    "",
    { host: "localhost", dialect: "mysql" }
);

module.exports = sequelize;