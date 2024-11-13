import { Request, Response } from 'express';
import * as showtimeRepository from "../repository/showtime.repository";

export async function getShowtimes(req: Request, res: Response) {
    try {
        const showtimes = await showtimeRepository.findShowtimes(
            req.query.startDate as string ?? null,
            req.query.endDate as string ?? null,
        );

        if (showtimes !== null) {
            res.status(200).json(showtimes);
        } else {
            res.status(404).json({error : `Showtimes not found.`});
        }
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

        if (showtime !== null) {
            res.status(200).json(showtime);
        } else {
            res.status(404).json({error : `Showtime ${showtimeId} not found.`});
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
            parseFloat(req.body.price),
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
            parseInt(req.params.id),
            new Date(req.body.startTime),
            new Date(req.body.endTime),
            parseFloat(req.body.price),
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
            parseInt(req.params.id)
        );

        res.status(200).json(showtimeToDelete);
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        }
    }
}