import { Router } from "express";
import status from "http-status";
import mongoose from "mongoose";

export const router = Router();

export let db: any[] = [];

router.get("/", async (_req, res) => {
  const todos = mongoose.model("todos");
  const items = await todos.find({});
  res.status(status.OK).json(items);
});

router.post("/", (req, res) => {
  console.log("🚀 ~ file: todo.ts:14 ~ router.post ~ req.body:", req.body);
  db = [...db, req.body];
  res.status(status.OK).send(`${db.length}`);
});

export const route = ["/api/todos", router] as [string, Router];
