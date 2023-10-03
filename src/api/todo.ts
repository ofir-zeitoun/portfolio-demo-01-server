import { Router } from "express";
import status from "http-status";

export const router = Router();

export let db: any[] = [];

router.get("/", (req, res) => {
  res.status(status.OK).send([]);
});

router.post("/", (req, res) => {
  console.log("🚀 ~ file: todo.ts:14 ~ router.post ~ req.body:", req.body);
  db = [...db, req.body];
  res.status(status.OK).send(`${db.length}`);
});

export default router;
