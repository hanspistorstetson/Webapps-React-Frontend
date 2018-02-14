import { schema } from "normalizr";

export const gameSchema = new schema.Entity(
  "games",
  {},
  { idAttribute: "_id" }
);
