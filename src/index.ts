import express from "express";
import httpStatus from "http-status";
import dotenv from "dotenv";
import { addRoutes } from "./api";
import { connect } from "./db";
dotenv.config();

const port = process.env.PORT || 3000;
const app = express();
app.use(express.json()); // Used to parse JSON bodies
app.use(express.urlencoded()); // Parse URL-encoded bodies using query-string library

app.get("/", (req, res) => {
  res.status(httpStatus.OK).send("OK");
});

addRoutes(app);

connect();

app.listen(port, () => {
  console.log("Server is running on port :", port);
});
