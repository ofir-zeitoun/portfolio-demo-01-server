import mongoose from "mongoose";
import { Todos } from "../features/todos";

export const connect = async () => {
  try {
    const res = await mongoose.connect(
      process.env.DBUri || "mongodb://127.0.0.1:27017"
    );
    console.log(
      "🚀 ~ file: connect.ts:9 ~ connect ~ mongoose: connected to ",
      process.env.DBUri
    );
    res.model("todos", Todos);
    return res;
  } catch (error) {
    console.error("🚀 ~ file: connect.ts:11 ~ connect ~ error:", error);
    process.exit(1);
  }
};
