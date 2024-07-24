"use strict";
require("dotenv").config();
const {Sequelize, DataTypes} = require("sequelize");
const env = process.env.NODE_ENV || "development";
const config = require("../config/config")[env];
const db = {};

const sequelize = new Sequelize(
  process.env.POSTGRES_URL,
  {
    dialect: config.dialect,
    dialectModule: require('pg')
  }
);

db.User = require("./user")(sequelize, DataTypes);
db.Post = require("./post")(sequelize, DataTypes);
db.Comment = require("./comment")(sequelize, DataTypes);

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
