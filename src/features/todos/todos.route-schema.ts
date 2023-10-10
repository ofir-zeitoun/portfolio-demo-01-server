import { boolean, object, string, TypeOf } from "zod";

export const createTodoSchema = object({
  body: object({
    title: string({
      required_error: "Title is required",
    }),
    description: string().optional(),
    done: boolean().optional(),
  }),
});

export type CreateTodoInput = TypeOf<typeof createTodoSchema>;

const params = {
  params: object({
    id: string({
      required_error: "id is reuuired",
    }),
  }),
};

const updateFields = {
  title: string().optional(),
  description: string().optional(),
  done: boolean().optional(),
};

const updateTodoBody = {
  body: object(updateFields).refine(
    (data) => Object.keys(data).length > 0,
    `must have at least one of the properties: ${Object.keys(updateFields).join(
      " | "
    )}`
  ),
};

export const updateTodoSchema = object({
  ...params,
  ...updateTodoBody,
});

export type UpdateTodoInput = TypeOf<typeof updateTodoSchema>;
