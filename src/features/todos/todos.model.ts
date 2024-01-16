import mongoose, { Schema } from "mongoose";
import { Timestamp } from "../../db";

const todosSchema = new Schema(
  {
    title: String,
    description: { type: String, default: "" },
    done: { type: Boolean, default: false },
    createdAt: Date,
    updatedAt: Date,
  },
  { versionKey: false, timestamps: true }
);

export interface TodoDocument extends mongoose.Document, Timestamp {
  title: string;
  description: string | undefined;
  done: boolean | undefined;
}

export const TodosModel = mongoose.model<TodoDocument>("todos", todosSchema);
