import dotenv from "dotenv";
dotenv.config();

export const JWT_SECRET = process.env.JWT_SECRET;
export const PORT = process.env.PORT
export const NODE_ENV = process.env.NODE_ENV
export const DB_USERNAME = process.env.DB_USERNAME
export const DB_PASSWORD = process.env.DB_PASSWORD
export const DB_DEV_NAME = process.env.DB_DEV_NAME
export const DB_TEST_NAME = process.env.DB_TEST_NAME
export const DB_HOST = process.env.DB_HOST
export const DB_DIALECT = process.env.DB_DIALECT
export const POSTGRES_URL = process.env.POSTGRES_URL
export const POSTGRES_USER = process.env.POSTGRES_USER
export const POSTGRES_HOST = process.env.POSTGRES_HOST
export const POSTGRES_PASSWORD = process.env.POSTGRES_PASSWORD
export const POSTGRES_DATABASE = process.env.POSTGRES_DATABASE

