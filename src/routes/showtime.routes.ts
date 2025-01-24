import { Router } from 'express';
import * as showtimeController from "../controllers/showtime.controller";
import passport from "../middleware/passport";

const router: Router = Router();

router.get("/showtime", passport.authenticate("jwt", { session: false }), showtimeController.getShowtimes);
router.get("/showtime/:showtimeId", passport.authenticate("jwt", { session: false }), showtimeController.getShowtimeById);
router.get("/hall/:hallId/current-showtime", passport.authenticate("jwt", { session: false }), showtimeController.getCurrentShowtimeByHall);
router.post("/showtime", passport.authenticate("jwt", { session: false }), showtimeController.createShowtime);
router.put("/showtime/:showtimeId", passport.authenticate("jwt", { session: false }), showtimeController.updateShowtime);
router.delete("/showtime/:showtimeId", passport.authenticate("jwt", { session: false }), showtimeController.deleteShowtime);

export default router;