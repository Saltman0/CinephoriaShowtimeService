import * as showtimeFactory from "../factory/showtime.factory";
import { database } from "../config/database";
import { showtime } from "../schema/showtime";
import { and, eq, gte, lte } from "drizzle-orm/sql/expressions/conditions";
import { DateTime } from "luxon";

export async function findShowtimes(startDate: string|null, endDate: string|null) {
    let findShowtimesQuery = 'SELECT "showtime"."id", "showtime"."startTime", "showtime"."endTime", "hall"."number", "hall"."projectionQuality" FROM "showtime" ' +
        ' INNER JOIN "hall" ON "showtime"."hallId" = "hall"."id"';

    if (startDate !== null && endDate != null) {
        findShowtimesQuery += ` WHERE "showtime"."startTime" >= '${startDate}' AND "showtime"."endTime" <= '${endDate}'`;
    }

    findShowtimesQuery += ' ORDER BY "showtime"."id" ASC';

    try {
        let result = await database.execute(findShowtimesQuery);

        if (result.rows.length === 0) {
            return null;
        }

        return result.rows;
    } catch (error) {
        throw error;
    }
}

export async function findShowtimeById(showtimeId: number) {
    try {
        const result = await database
            .select()
            .from(showtime)
            .where(eq(showtime.id, showtimeId));

        if (result.length === 0) {
            return null;
        }

        return result[0];
    } catch (error) {
        throw error;
    }
}

export async function findCurrentShowtimeByHall(hallId: number) {
    try {
        const now: DateTime = DateTime.now().setZone("Europe/Paris");

        const result = await database
            .select()
            .from(showtime)
            .where(
                and(
                    eq(showtime.hallId, hallId),
                    lte(showtime.startTime, new Date(now.toFormat("yyyy-MM-dd HH:mm:ss"))),
                    gte(showtime.endTime, new Date(now.toFormat("yyyy-MM-dd HH:mm:ss")))
                )
            );

        if (result.length === 0) {
            return null;
        }

        return result[0];
    } catch (error) {
        throw error;
    }
}

export async function insertShowtime(startTime: Date, endTime: Date, price: number, movieId: number, hallId: number) {
    try {
        const prepareInsertShowtime = await database
            .insert(showtime)
            .values(showtimeFactory.createShowtime(startTime, endTime, price, movieId, hallId))
            .returning();

        return prepareInsertShowtime[0];
    } catch (error) {
        throw error;
    }
}

export async function updateShowtime(id: number, startTime: Date|null, endTime: Date|null, price: number|null, movieId: number|null, hallId: number|null) {
    try {
        const preparedUpdateShowtime = await database
            .update(showtime)
            .set({
                startTime: startTime ?? undefined,
                endTime: endTime ?? undefined,
                price: price ?? undefined,
                movieId: movieId ?? undefined,
                hallId: hallId ?? undefined
            })
            .where(eq(showtime.id, id))
            .returning();

        return preparedUpdateShowtime[0];
    } catch (error) {
        throw error;
    }
}

export async function deleteShowtime(id: number) {
    const prepareDeleteShowtime = await database
        .delete(showtime)
        .where(eq(showtime.id, id))
        .returning({ id: showtime.id });

    try {
        return prepareDeleteShowtime[0];
    } catch (error) {
        throw error;
    }
}