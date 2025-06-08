-- Cinéphoria showtime service database
DROP DATABASE IF EXISTS "cinephoriaShowtimeServiceDatabase";
CREATE DATABASE "cinephoriaShowtimeServiceDatabase";
-- Cinéphoria movie service database

-- Showtime table
DROP TABLE IF EXISTS showtime;
CREATE TABLE IF NOT EXISTS showtime
(
    "id" SERIAL PRIMARY KEY,
    "startTime" TIMESTAMP NOT NULL,
    "endTime" TIMESTAMP NOT NULL,
    "price" INTEGER NOT NULL,
    "movieId" INTEGER NOT NULL,
    "hallId" INTEGER NOT NULL
);
-- Showtime table
