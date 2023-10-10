import mongoose, { Schema } from "mongoose";
import { Timestamp } from "../../db";

const todosSchema = new Schema(
  {
    _id: Schema.ObjectId,
    title: String,
    description: { type: String, default: "" },
    done: { type: Boolean, default: false },
    createdAt: Date,
    updatedAt: Date,
  },
  { versionKey: false, timestamps: true }
);

export interface TodoDocument extends mongoose.Document, Timestamp {
  _id: string;
  title: string;
  description: string | undefined;
  done: boolean | undefined;
}

export const TodosModel = mongoose.model<TodoDocument>("todos", todosSchema);
