"use strict";
import { NODE_ENV, POSTGRES_URL} from "../settings.js";
import pg from "pg"
import { Sequelize } from "sequelize";
import configFile from "../config/config.js";

const env = NODE_ENV || "development";
const config = configFile[env];

let sequelize;

if (env == "production") {
  sequelize = new Sequelize(POSTGRES_URL, {
    dialect: config.dialect,
    dialectModule: pg,
  });
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, {
    host: config.host,
    dialect: config.dialect,
  });
}

export default sequelize;