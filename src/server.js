/* eslint-disable no-undef */
import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import { databaseConfig } from "./config/config.js";
import routesV1 from "./v1/routes/index.js";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Init Server
const server = express();

const port = process.env.PORT || 8000;

// Set Header
server.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers"
  );

  next();
});

//Template Engine
server.set("views", path.join(__dirname, "views"));
server.set("view engine", "ejs");

server.use(helmet());
server.use(morgan("common"));
server.use(bodyParser.json({ limit: "20mb" }));
server.use(bodyParser.urlencoded({ limit: "20mb", extended: true }));
server.use(cookieParser());
server.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

// Routes
server.use("/api/v1", routesV1);

// Connect Database
const connectDB = async () => {
  try {
    if (databaseConfig.url) {
      await mongoose.connect(databaseConfig.url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log("Connect Database Success");
    } else {
      console.log("Database Infomation is empty");
    }
  } catch (error) {
    console.log("Connect Database Failed ", error);
  }
};
connectDB();

// Listen Port
server.listen(port, () => {
  console.log("Connect server success in port", port);
});
