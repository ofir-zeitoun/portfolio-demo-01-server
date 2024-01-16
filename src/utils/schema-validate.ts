import { AnyZodObject } from "zod";

export const atLeastOnField = <T extends AnyZodObject>(schema: T) =>
  schema
    .partial()
    .refine<T>(
      (fields): fields is T =>
        Object.values(fields).some((value) => value !== undefined),
      `must have at least one of the properties: ${Object.keys(
        schema.shape
      ).join(" | ")}`
    ) as unknown as AnyZodObject;
