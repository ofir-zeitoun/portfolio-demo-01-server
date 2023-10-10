import { Router, Request, Response } from "express";
import status from "http-status";
import { validateResource } from "../../routes/middlewares";
import { TodosModel } from "./todos.model";
import { CreateTodoInput, createTodoSchema } from "./todos.route-schema";

export const router = Router();

router.get("/", async (_req, res) => {
  const items = await TodosModel.find({});
  res.status(status.OK).json(items);
});

router.post(
  "/",
  validateResource(createTodoSchema),
  async (req: Request<{}, {}, CreateTodoInput["body"]>, res: Response) => {
    const added = await TodosModel.insertMany(req.body);
    res.status(status.OK).send(added);
  }
);

export const route = ["/api/todos", router] as [string, Router];
