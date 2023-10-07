import { Schema } from "mongoose";

export const Todos = new Schema({
  _id: Schema.ObjectId,
  title: String,
  description: String,
  done: { type: Boolean, default: false },
});
