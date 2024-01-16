import { AnyZodObject, boolean, object, string, TypeOf } from "zod";
import { atLeastOnField } from "../../utils";

const baseTodoSchema = object({
  id: string({
    required_error: "id is required",
  }),
  title: string({
    required_error: "Title is required",
  }),
  description: string().optional(),
  done: boolean().optional(),
});

const idField = { id: true } as const;

const baseTodoSchemaNoId = baseTodoSchema.omit(idField);

export const createTodoSchema = baseTodoSchemaNoId;

export type CreateTodoInput = TypeOf<typeof createTodoSchema>;

export const updateTodoBody = atLeastOnField(baseTodoSchemaNoId);

export const singleTodoSchema = baseTodoSchema.pick(idField);

export type UpdateTodoInput = TypeOf<typeof updateTodoBody>;

export type SingleTodoInput = TypeOf<typeof singleTodoSchema>;
