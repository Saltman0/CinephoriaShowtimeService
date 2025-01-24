import * as showtimeFactory from "../factory/showtime.factory";
import {database} from "../config/database";
import {showtime} from "../schema/showtime";
import {and, eq, gte, lte} from "drizzle-orm/sql/expressions/conditions";
import {DateTime} from "luxon";

export async function findShowtimes(movieId: number|null, startDate: string|null, endDate: string|null) {
    let findShowtimesQuery = 'SELECT * FROM showtime';

    const conditions: string[] = [];

    if (movieId !== null) {
        conditions.push(`showtime."movieId" = '${movieId}'`);
    }

    if (startDate !== null) {
        conditions.push(`showtime."startTime" >= '${startDate}'`);
    }

    if (endDate !== null) {
        conditions.push(`showtime."endTime" <= '${endDate}'`);
    }

    if (conditions.length > 0) {
        findShowtimesQuery += ' WHERE ' + conditions.join(' AND ');
    }

    findShowtimesQuery += ' ORDER BY showtime."id" ASC';

    try {
        let result = await database.execute(findShowtimesQuery);

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

export async function findCurrentShowtimes(hallId: number|null) {
    try {
        const now: DateTime = DateTime.now().setZone("Europe/Paris");

        const conditions = hallId !== null
            ? and(
                eq(showtime.hallId, hallId),
                lte(showtime.startTime, new Date(now.toFormat("yyyy-MM-dd HH:mm:ss"))),
                gte(showtime.endTime, new Date(now.toFormat("yyyy-MM-dd HH:mm:ss")))
            )
            : and(
                lte(showtime.startTime, new Date(now.toFormat("yyyy-MM-dd HH:mm:ss"))),
                gte(showtime.endTime, new Date(now.toFormat("yyyy-MM-dd HH:mm:ss")))
            );

        return await database
            .select()
            .from(showtime)
            .where(conditions);
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