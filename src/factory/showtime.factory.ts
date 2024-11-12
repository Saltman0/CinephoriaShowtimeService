export function createShowtime(startTime: Date, endTime: Date, price: number, movieId: number, hallId: number) {
    return {
        startTime: startTime,
        endTime: endTime,
        price: price,
        movieId: movieId,
        hallId: hallId
    };
}