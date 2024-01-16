import { Express } from "express";
import { healthCheck } from "../features/health-check";
import { catchAllRequestsLastRouteHandler, errorHandler } from "./middlewares";
import todos from "../features/todos";

export const routes = (app: Express) => {
  app.get(...healthCheck);
  app.use(...todos);

  // add custom error handler middleware as the last middleware
  app.use(catchAllRequestsLastRouteHandler, errorHandler);
};
