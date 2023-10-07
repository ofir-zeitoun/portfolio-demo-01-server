import express from "express";
import httpStatus from "http-status";
import dotenv from "dotenv";
import { routes } from "./routes";
import { connect } from "./db";
dotenv.config();

const port = process.env.PORT || 3000;
const app = express();
app.use(express.json()); // Used to parse JSON bodies
app.use(express.urlencoded()); // Parse URL-encoded bodies using query-string library

routes(app);

app.listen(port, async () => {
  console.log("Server is running on port :", port);
  await connect();
});
