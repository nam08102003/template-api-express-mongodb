/* eslint-disable no-undef */
import dotenv from "dotenv";
dotenv.config();

export const databaseConfig = {
  url: process.env.DATABASE_URL || "",
  user: process.env.DATABASE_USER || "",
  password: process.env.DATABASE_PASSWORD || "",
};
