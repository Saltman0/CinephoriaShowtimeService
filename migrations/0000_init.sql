CREATE TABLE IF NOT EXISTS "showtime" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "showtime_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"startTime" timestamp NOT NULL,
	"endTime" timestamp NOT NULL,
	"price" integer NOT NULL,
	"movieId" integer NOT NULL,
	"hallId" integer NOT NULL
);
