import { Router, Request, Response } from "express";
import status from "http-status";
import { returnNew } from "../../db";
import { validateResource } from "../../routes/middlewares";
import { TodosModel } from "./todos.model";
import {
  CreateTodoInput,
  DeleteTodoInput,
  UpdateTodoInput,
  createTodoSchema,
  deleteTodoSchema,
  updateTodoSchema,
} from "./todos.route-schema";

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
    res.status(status.OK).send(updated);
  }
);

router.delete(
  "/:id",
  validateResource(deleteTodoSchema),
  async (req: Request<DeleteTodoInput["params"]>, res: Response) => {
    const deleted = await TodosModel.findByIdAndRemove(req.params.id);
    res.sendStatus(deleted === null ? status.NOT_FOUND : status.OK);
  }
);

export const route = ["/api/todos", router] as [string, Router];
