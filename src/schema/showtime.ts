import * as drizzle from "drizzle-orm/pg-core";

export const showtime = drizzle.pgTable("showtime", {
    id: drizzle.integer().primaryKey().generatedAlwaysAsIdentity(),
    startTime: drizzle.timestamp().notNull(),
    endTime: drizzle.timestamp().notNull(),
    price: drizzle.integer().notNull(),
    movieId: drizzle.integer().notNull(),
    hallId: drizzle.integer().notNull()
});