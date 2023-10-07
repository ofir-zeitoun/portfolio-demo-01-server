import { Router, Request, Response } from "express";
import status from "http-status";
import mongoose from "mongoose";
import { Todos } from "./todos.model";

export const router = Router();

export let db: any[] = [];

router.get("/", async (_req, res) => {
  const todos = mongoose.model<typeof Todos>("todos");
  const items = await todos.find({});
  res.status(status.OK).json(items);
});

router.post("/", async (req: Request, res: Response) => {
  console.log("🚀 ~ file: todo.ts:14 ~ router.post ~ req.body:", req.body);
  db = [...db, req.body];
  if (!req.body.title) {
    throw new Error("no title");
  }
  const todos = mongoose.model<typeof Todos>("todos");
  const added = await todos.insertMany(req.body);
  res.status(status.OK).send(added);
});

export const route = ["/api/todos", router] as [string, Router];
