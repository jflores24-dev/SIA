import { integer, timestamp, pgTable, varchar } from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  age: integer().notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
});

export const lecturesTable = pgTable("lectures", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  sensor: varchar({ length: 255 }).notNull(),
  humedad: integer(),
  fecha: timestamp({ mode: "string" }).notNull(),
});
