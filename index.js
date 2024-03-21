import { config } from "dotenv";
import http from "http";
import { app } from "./app.js";
import { swaggerServe, swaggerSetup } from "./swagger.js";
import { database } from "./src/config/db.js";

// add configuration
config();

// database configuration
database();

// https://127.0.0.1:5100/api
app.use("/api", swaggerServe, swaggerSetup);

http
  .createServer(app)
  .listen(process.env.PORT, () =>
    console.log("Server listening on port: " + process.env.PORT)
  );