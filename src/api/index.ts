import { Express } from "express";
import todo from "./todo.js";

export const addRoutes = (app: Express) => {
  app.use("/api/todo", todo);
};
