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
