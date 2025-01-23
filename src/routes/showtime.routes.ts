import { Router } from 'express';
import * as showtimeController from "../controllers/showtime.controller";
import passport from "../middleware/passport";

const router: Router = Router();

router.get("/movie/:movieId/showtimes", passport.authenticate("jwt", { session: false }), showtimeController.getShowtimesByMovie);
router.get("/showtime", passport.authenticate("jwt", { session: false }), showtimeController.getShowtimes);
router.get("/showtime/:id", passport.authenticate("jwt", { session: false }), showtimeController.getShowtimeById);
router.get("/showtime/:hallId/current-showtime", passport.authenticate("jwt", { session: false }), showtimeController.getCurrentShowtimeByHall);
router.post("/showtime", passport.authenticate("jwt", { session: false }), showtimeController.createShowtime);
router.put("/showtime/:id", passport.authenticate("jwt", { session: false }), showtimeController.updateShowtime);
router.delete("/showtime/:id", passport.authenticate("jwt", { session: false }), showtimeController.deleteShowtime);

export default router;