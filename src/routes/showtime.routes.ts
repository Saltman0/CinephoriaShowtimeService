import { Router } from 'express';
import * as showtimeController from "../controllers/showtime.controller";

const router: Router = Router();

router.get("/showtime", showtimeController.getShowtimes);
router.get("/showtime/:id", showtimeController.getShowtimeById);
router.post("/showtime", showtimeController.createShowtime);
router.put("/showtime/:id", showtimeController.updateShowtime);
router.delete("/showtime/:id", showtimeController.deleteShowtime);

export default router;