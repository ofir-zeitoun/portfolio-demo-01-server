import { Router, Request, Response } from "express";
import status from "http-status";
import { returnNew } from "../../db";
import { validateResource } from "../../routes/middlewares";
import { setIn, setInBody, setInParams } from "../../utils";
import { TodosModel } from "./todos.model";
import {
  CreateTodoInput,
  IdOnlyInput,
  UpdateTodoInput,
  createTodoSchema,
  IdOnlySchema,
  updateTodoBody,
} from "./todos.route-schema";

export const router = Router();

router.get("/", async (_req, res) => {
  const items = await TodosModel.find({});
  res.status(status.OK).json(items);
});

router.get(
  "/:id",
  validateResource(setInParams(IdOnlySchema)),
  async (req: Request<IdOnlyInput>, res: Response) => {
    const item = await TodosModel.findById(req.params.id);
    res.status(status.OK).json(item);
  }
);

router.post(
  "/",
  validateResource(setInBody(createTodoSchema)),
  async (req: Request<{}, {}, CreateTodoInput>, res: Response) => {
    const newTodo = await TodosModel.create(req.body);
    res.status(status.OK).send(newTodo);
  }
);

router.put(
  "/:id",
  validateResource(setIn(IdOnlySchema, updateTodoBody)),
  async (req: Request<IdOnlyInput, {}, UpdateTodoInput>, res: Response) => {
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
  validateResource(setInParams(IdOnlySchema)),
  async (req: Request<IdOnlyInput>, res: Response) => {
    const deleted = await TodosModel.findByIdAndRemove(req.params.id);
    res.sendStatus(deleted === null ? status.NOT_FOUND : status.OK);
  }
);

export default ["/api/todos", router] as [string, Router];
