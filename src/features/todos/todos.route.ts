import { Router, Request, Response } from "express";
import status from "http-status";
import { returnNew } from "../../db";
import { validateResource } from "../../routes/middlewares";
import { TodosModel } from "./todos.model";
import {
  CreateTodoInput,
  UpdateTodoInput,
  createTodoSchema,
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
export const route = ["/api/todos", router] as [string, Router];
