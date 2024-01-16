import { boolean, object, string, TypeOf } from "zod";

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

export const createTodoSchema = object({
  body: baseTodoSchemaNoId,
});

export type CreateTodoInput = TypeOf<typeof createTodoSchema>;

const params = {
  params: baseTodoSchema.pick(idField),
};

const updateTodoBody = {
  body: baseTodoSchemaNoId
    .partial()
    .refine(
      (fields) => Object.values(fields).some((value) => value !== undefined),
      `must have at least one of the properties: ${Object.keys(
        baseTodoSchemaNoId
      ).join(" | ")}`
    ),
};

export const updateTodoSchema = object({
  ...params,
  ...updateTodoBody,
});

export type UpdateTodoInput = TypeOf<typeof updateTodoSchema>;

export const singleTodoSchema = object(params);

export type SingleTodoInput = TypeOf<typeof singleTodoSchema>;
