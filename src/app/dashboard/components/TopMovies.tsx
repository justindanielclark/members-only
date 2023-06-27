"use client";
import { useState } from "react";
import MovieCard from "@/lib/sharedComponents/MovieCardListItem";
import { MenuMovieContext } from "@/lib/sharedComponents/MenuMovieContext";
import { useUserContext } from "@/lib/providers/UserProvider";

type TopMoviesProps = {
  movies: Array<number>;
};

export default function TopMovies({ movies }: TopMoviesProps) {
  const [selectedID, setSelectedID] = useState<undefined | number>(undefined);
  const ctx = useUserContext();
  const movieMap = new Map(ctx.movieMap);
  return (
    <section className="m-2">
      <h1 className="text-2xl font-bold">Today{"'"}s Top Movies:</h1>
      <ul className="flex flex-row overflow-x-scroll flex-nowrap justify-start gap-4 bg-slate-700/20 py-2 px-4 rounded-lg">
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
            key={movie}
          >
            <MovieCard movie={movieMap.get(movie) as FetchedMovie} priority={idx < 10} />
          </MenuMovieContext.Provider>
        ))}
      </ul>
    </section>
  );
}
