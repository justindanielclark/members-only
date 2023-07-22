"use client";
import { useState } from "react";
import MovieCard from "@/lib/sharedComponents/MovieCardListItem";
import { MenuMovieContext } from "@/lib/sharedComponents/MenuMovieContext";
import { SubMainContainer } from "@/lib/sharedComponents/MainContainer";
import Accordian from "@/lib/sharedComponents/Containers/Accordian";

type Props = {
  movies: Array<FetchedMovie>;
};

export default function Recommendations({ movies }: Props) {
  const [selectedID, setSelectedID] = useState<undefined | number>(undefined);
  if (movies.length === 0) return undefined;
  return (
    <Accordian title="Recommended Movies" openOnLoad={false}>
      <div className="w-full h-fit">
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
      </div>
    </Accordian>
  );
}
