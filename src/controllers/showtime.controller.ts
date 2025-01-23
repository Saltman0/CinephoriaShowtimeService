import { Request, Response } from 'express';
import * as showtimeRepository from "../repository/showtime.repository";
import { publishMessage } from "../rabbitmq";

export async function getShowtimesByMovie(req: Request, res: Response) {
    try {
        const showtimesByMovie = await showtimeRepository.findShowtimesByMovie(
            parseInt(req.params.movieId)
        );

        res.status(200).json(showtimesByMovie);
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        }
    }
}

export async function getShowtimes(req: Request, res: Response) {
    try {
        //TODO FONCTION A CORRIGER
        const showtimes = await showtimeRepository.findShowtimes(
            req.query.startDate as string ?? null,
            req.query.endDate as string ?? null,
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
        const showtimeId: number = parseInt(req.params.id);

        const showtime = await showtimeRepository.findShowtimeById(showtimeId);

        res.status(200).json(showtime);
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        }
    }
}

export async function getCurrentShowtimeByHall(req: Request, res: Response) {
    try {
        const hallId: number = parseInt(req.params.hallId);

        const showtime = await showtimeRepository.findCurrentShowtimeByHall(hallId);

        res.status(200).json(showtime);
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

        await publishMessage("showtime", JSON.stringify({ type: "showtime", event: "create", body: showtimeToCreate}));

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
            parseInt(req.params.id),
            new Date(req.body.startTime),
            new Date(req.body.endTime),
            parseInt(req.body.price),
            parseInt(req.body.movieId),
            parseInt(req.body.hallId)
        );

        await publishMessage("showtime", JSON.stringify({ type: "showtime", event: "update", body: showtimeToUpdate}));

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
            parseInt(req.params.id)
        );

        await publishMessage("showtime", JSON.stringify({ type: "showtime", event: "delete", body: showtimeToDelete}));

        res.status(200).json({ message: "Showtime deleted successfully." });
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        }
    }
}