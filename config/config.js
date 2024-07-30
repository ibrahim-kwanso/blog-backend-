import {
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  POSTGRES_DATABASE,
  POSTGRES_HOST,
  DB_DIALECT,
  DB_USERNAME,
  DB_PASSWORD,
  DB_DEV_NAME,
  DB_HOST,
  DB_TEST_NAME,
} from "../settings.js";

export default {
  production: {
    username: POSTGRES_USER,
    password: POSTGRES_PASSWORD,
    database: POSTGRES_DATABASE,
    host: POSTGRES_HOST,
    dialect: DB_DIALECT,
  },
  development: {
    username: DB_USERNAME,
    password: DB_PASSWORD,
    database: DB_DEV_NAME,
    host: DB_HOST,
    dialect: DB_DIALECT,
  },
  test: {
    username: DB_USERNAME,
    password: DB_PASSWORD,
    database: DB_TEST_NAME,
    host: DB_HOST,
    dialect: DB_DIALECT,
  },
};
