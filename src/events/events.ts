import EventEmitter from "node:events";
import * as movieEvents from "./movie.events";
import * as cinemaEvents from "./cinema.events";
import * as hallEvents from "./hall.events";

export const eventEmitter: EventEmitter = new EventEmitter();

eventEmitter.on("messageReceived", async (message: { type: string, event: string, body: any }): Promise<void> => {
    try {
        const actions: { [key: string]: (message: any) => Promise<void> } = {
            "createMovie": movieEvents.createMovieEvent,
            "updateMovie": movieEvents.updateMovieEvent,
            "deleteMovie": movieEvents.deleteMovieEvent,
            "createCinema": cinemaEvents.createCinemaEvent,
            "updateCinema": cinemaEvents.updateCinemaEvent,
            "deleteCinema": cinemaEvents.deleteCinemaEvent,
            "createHall": hallEvents.createHallEvent,
            "updateHall": hallEvents.updateHallEvent,
            "deleteHall": hallEvents.deleteHallEvent
        };

        const key: string = `${message.event}${message.type.charAt(0).toUpperCase() + message.type.slice(1)}`;

        if (actions[key]) {
            await actions[key](message.body);
        } else {
            console.log("Invalid type or event !");
        }
    } catch (error) {
        throw error;
    }
});