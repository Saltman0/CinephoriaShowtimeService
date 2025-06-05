DROP TABLE "cinema";--> statement-breakpoint
DROP TABLE "hall";--> statement-breakpoint
DROP TABLE "movie";--> statement-breakpoint
ALTER TABLE "showtime" DROP CONSTRAINT "showtime_movieId_movie_id_fk";
--> statement-breakpoint
ALTER TABLE "showtime" DROP CONSTRAINT "showtime_hallId_hall_id_fk";
