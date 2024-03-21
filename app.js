import express from "express";
import auth from "./src/routes/auth.js"
import GlobalErrorHandler from "./src/middleware/globalErrorHandler.js";
export const app = express();

app.use(express.json());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));


app.use("/auth", auth);


app.use(GlobalErrorHandler);