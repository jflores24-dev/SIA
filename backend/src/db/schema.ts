import { integer, timestamp, pgTable, varchar } from "drizzle-orm/pg-core";

export const lecturesTable = pgTable("lectures", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  sensorId: varchar({ length: 255 }).notNull(),
  lectura: integer(),
  humedad: integer(),
  sequedad: integer(),
  status: varchar({ length: 255 }).notNull(),
  fecha: timestamp({ mode: "string" }).notNull().defaultNow(),
});
