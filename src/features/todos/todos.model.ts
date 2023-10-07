import { Schema } from "mongoose";

export const Todos = new Schema(
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
