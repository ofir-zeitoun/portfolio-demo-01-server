import { Express } from "express";
import todo from "./todo";

export const addRoutes = (app: Express) => {
  app.use("/api/todo", todo);
};
