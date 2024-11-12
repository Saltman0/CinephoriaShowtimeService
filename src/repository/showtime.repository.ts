import * as showtimeFactory from "../factory/showtime.factory";
import { database } from "../config/database";
import { showtime } from "../schema/showtime";
import { eq } from "drizzle-orm/sql/expressions/conditions";


export async function findShowtimes(movieId: number, startDate: Date|null, endDate: Date|null) {
    let findShowtimesQuery = 'SELECT "showtime"."id", "showtime"."startTime", "showtime"."endTime", "hall"."number", "hall"."projectionQuality" FROM "showtime"' +
        ' INNER JOIN "hall" ON "showtime"."hallId" = "hall"."id"' +
        ` WHERE "movieId" = ${movieId} `;

    if (startDate !== null && endDate != null) {
        findShowtimesQuery += ` WHERE "showtime"."startTime" >= ${startDate} AND "showtime"."endTime" <= ${endDate}`;
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
            .where(eq(showtime.id, showtimeId))
            .prepare("findShowtimeById")
            .execute();

        if (result.length === 0) {
            return null;
        }

        return result;
    } catch (error) {
        throw error;
    }
}

export async function insertShowtime(startTime: Date, endTime: Date, price: number, movieId: number, hallId: number) {
    const prepareInsertShowtime = database
        .insert(showtime)
        .values(showtimeFactory.createShowtime(startTime, endTime, price, movieId, hallId))
        .prepare("insertShowtime");

    try {
        await prepareInsertShowtime.execute();
    } catch (error) {
        throw error;
    }
}

export async function updateShowtime(id: number, startTime: Date|null, endTime: Date|null, price: number|null, movieId: number|null, hallId: number|null) {
    const preparedUpdateShowtime = database
        .update(showtime)
        .set({
            startTime: startTime ?? undefined,
            endTime: endTime ?? undefined,
            price: price ?? undefined,
            movieId: movieId ?? undefined,
            hallId: hallId ?? undefined
        })
        .where(eq(showtime.id, id))
        .prepare("updateShowtime");

    try {
        await preparedUpdateShowtime.execute();
    } catch (error) {
        throw error;
    }
}

export async function deleteShowtime(id: number) {
    const prepareDeleteShowtime = database
        .delete(showtime)
        .where(eq(showtime.id, id))
        .prepare("deleteShowtime");

    try {
        await prepareDeleteShowtime.execute();
    } catch (error) {
        throw error;
    }
}