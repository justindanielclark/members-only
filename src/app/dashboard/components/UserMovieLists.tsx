"use client";
import { MenuMovieContext } from "./MovieMenuContext";
import { useState } from "react";
import MovieCard from "./MovieCard";
type Props = {
  emptyRender: JSX.Element;
  listTitle: string;
  list: Array<FetchedMovie>;
};
export default function UserMovieList({ emptyRender, listTitle, list }: Props) {
  const [selectedID, setSelectedID] = useState<undefined | number>(undefined);
  if (list.length === 0) {
    return emptyRender;
  } else {
    return (
      <section className="">
        <h1 className="text-2xl font-bold">{listTitle}</h1>
        <ul className="flex flex-row overflow-x-scroll flex-nowrap justify-start gap-4">
          {list.map((movie, idx) => (
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
}
