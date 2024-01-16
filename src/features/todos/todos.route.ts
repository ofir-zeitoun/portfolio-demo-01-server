import { Router, Request, Response } from "express";
import status from "http-status";
import { returnNew } from "../../db";
import { validateResource } from "../../routes/middlewares";
import { TodosModel } from "./todos.model";
import {
  CreateTodoInput,
  SingleTodoInput,
  UpdateTodoInput,
  createTodoSchema,
  singleTodoSchema,
  updateTodoSchema,
} from "./todos.route-schema";

export const router = Router();

router.get("/", async (_req, res) => {
  const items = await TodosModel.find({});
  res.status(status.OK).json(items);
});

router.get(
  "/:id",
  validateResource(singleTodoSchema),
  async (req: Request<SingleTodoInput["params"]>, res: Response) => {
    const item = await TodosModel.findById(req.params.id);
    res.status(status.OK).json(item);
  }
);

router.post(
  "/",
  validateResource(createTodoSchema),
  async (req: Request<{}, {}, CreateTodoInput["body"]>, res: Response) => {
    const newTodo = await TodosModel.create(req.body);
    res.status(status.OK).send(newTodo);
  }
);

router.put(
  "/:id",
  validateResource(updateTodoSchema),
  async (
    req: Request<UpdateTodoInput["params"], {}, UpdateTodoInput["body"]>,
    res: Response
  ) => {
    const updated = await TodosModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      returnNew
    );
    if (updated) {
      res.status(status.OK).send(updated);
    } else {
      res.sendStatus(status.NOT_FOUND);
    }
  }
);

router.delete(
  "/:id",
  validateResource(singleTodoSchema),
  async (req: Request<SingleTodoInput["params"]>, res: Response) => {
    const deleted = await TodosModel.findByIdAndRemove(req.params.id);
    res.sendStatus(deleted === null ? status.NOT_FOUND : status.OK);
  }
);

export default ["/api/todos", router] as [string, Router];
