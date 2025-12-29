import { Request, Response } from 'express';
import * as showtimeRepository from "../repository/showtime.repository";
import {publishMessage} from "../rabbitmq";

export async function getShowtimes(req: Request, res: Response) {
    try {
        const showtimes = await showtimeRepository.findShowtimes(
            req.query.movieId ? parseInt(<string>req.query.movieId) : null,
            <string>req.query.startDate ?? null,
            <string>req.query.endDate ?? null
        );

        res.status(200).json(showtimes);
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        }
    }
}

export async function getShowtimeById(req: Request, res: Response) {
    try {
        const showtimeId: number = parseInt(req.params.showtimeId);

        if (isNaN(showtimeId)) {
            res.status(400).json({ message: "Invalid showtimeId parameter" });
        } else {
            const showtime = await showtimeRepository.findShowtimeById(showtimeId);

            res.status(200).json(showtime);
        }
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        }
    }
}

export async function getCurrentShowtimes(req: Request, res: Response) {
    try {
        const hallId = req.query.hallId ? parseInt(<string>req.query.hallId) : null;

        if (hallId !== null && isNaN(hallId)) {
            res.status(400).json({ message: "Invalid hallId parameter" });
        } else {
            const currentShowtimes = await showtimeRepository.findCurrentShowtimes(hallId);

            if (hallId !== null) {
                res.status(200).json(currentShowtimes.length > 0 ? currentShowtimes[0] : null);
            } else {
                res.status(200).json(currentShowtimes);
            }
        }
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        }
    }
}

export async function createShowtime(req: Request, res: Response) {
    try {
        const showtimeToCreate = await showtimeRepository.insertShowtime(
            new Date(req.body.startTime),
            new Date(req.body.endTime),
            parseInt(req.body.price),
            parseInt(req.body.movieId),
            parseInt(req.body.hallId)
        );

        res.status(201).json(showtimeToCreate);
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        }
    }
}

export async function updateShowtime(req: Request, res: Response) {
    try {
        const showtimeToUpdate = await showtimeRepository.updateShowtime(
            parseInt(req.params.showtimeId),
            new Date(req.body.startTime),
            new Date(req.body.endTime),
            parseInt(req.body.price),
            parseInt(req.body.movieId),
            parseInt(req.body.hallId)
        );

        res.status(200).json(showtimeToUpdate);
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        }
    }
}

export async function deleteShowtime(req: Request, res: Response) {
    try {
        const showtimeToDelete = await showtimeRepository.deleteShowtime(
            parseInt(req.params.showtimeId)
        );

        await publishMessage(
            "booking",
            JSON.stringify(
                {
                    type: "booking",
                    event: "deleteByShowtime",
                    body: {showtimeId: showtimeToDelete.id}
                }
            )
        );

        res.status(200).json({ message: "Showtime deleted successfully." });
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        }
    }
}