"use client";
import { useState } from "react";
import MovieCard from "@/lib/sharedComponents/MovieCardListItem";
import { MenuMovieContext } from "@/lib/sharedComponents/MenuMovieContext";

type TopMoviesProps = {
  movies: Array<FetchedMovie>;
};

export default function TopMovies({ movies }: TopMoviesProps) {
  const [selectedID, setSelectedID] = useState<undefined | number>(undefined);
  return (
    <section className="m-2">
      <h1 className="text-2xl font-bold">Today{"'"}s Top Movies:</h1>
      <ul className="flex flex-row overflow-x-scroll flex-nowrap justify-start gap-4">
        {movies.map((movie, idx) => (
          <MenuMovieContext.Provider
            value={{
              selectedID,
              setSelectedID: (x) => {
                if (typeof x === "number") {
                  setSelectedID(x);
                } else {
                  setSelectedID(undefined);
                }
              },
            }}
            key={movie.id}
          >
            <MovieCard movie={movie} priority={idx < 10} />
          </MenuMovieContext.Provider>
        ))}
      </ul>
    </section>
  );
}
