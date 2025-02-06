import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const carTable = sqliteTable("car", {
    id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
    model: text().notNull(),
    maxSpeed: int().notNull(),
    features: text().notNull(),
    year: int(),
});

export const travelTimeRequestTable = sqliteTable("travel_time_request", {
    id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
    distance: text().notNull(),
    model: text().notNull(),
});

export const travelTimeResponseTable = sqliteTable("travel_time_response", {
    id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
    hours: int().notNull(),
    minutes: int().notNull(),
    carId: text().notNull(),
});