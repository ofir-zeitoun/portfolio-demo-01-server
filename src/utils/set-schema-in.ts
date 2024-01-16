import { AnyZodObject, object } from "zod";

export const setInParams = (schema: AnyZodObject) =>
  object({
    params: schema,
  });

export const setInBody = (schema: AnyZodObject) =>
  object({
    body: schema,
  });

export const setInQuery = (schema: AnyZodObject) =>
  object({
    query: schema,
  });

export const setIn = (
  params?: AnyZodObject,
  body?: AnyZodObject,
  query?: AnyZodObject
) =>
  object({
    ...(params && { params }),
    ...(body && { body }),
    ...(query && { query }),
  });

