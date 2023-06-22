"use client";
import { useState } from "react";
import MovieCard from "@/lib/sharedComponents/MovieCardListItem";
import { MenuMovieContext } from "@/lib/sharedComponents/MenuMovieContext";

type Props = {
  movies: Array<FetchedMovie>;
};

export default function Recommendations({ movies }: Props) {
  const [selectedID, setSelectedID] = useState<undefined | number>(undefined);
  return (
    <ul className="flex flex-row overflow-x-scroll flex-nowrap justify-start gap-4 px-5 mb-8">
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
  );
}
