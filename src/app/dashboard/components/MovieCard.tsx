"use client";
import { useEffect, useState } from "react";
import { useMenuMovieContext } from "./MovieMenuContext";
import { FaEllipsisV as VerticalEllipsisIcon } from "react-icons/fa";
import Image from "next/image";
import { preferredPosterSize } from "@/lib/utils/preferredPosterSize";
import Link from "next/link";

type MovieCardProps = {
  movie: FetchedMovie;
  priority: boolean;
};

export default function MovieCard({ movie, priority }: MovieCardProps) {
  const MenuContext = useMenuMovieContext();
  const [menuIsOpen, setMenuIsOpen] = useState<boolean>(false);
  const [menuIsTransitioning, setMenuIsTransitioning] = useState<boolean>(false);
  useEffect(() => {
    if (MenuContext.selectedID === movie.id) {
      setMenuIsOpen(true);
    } else {
      setMenuIsOpen(false);
    }
  }, [MenuContext.selectedID, movie.id]);

  return (
    <li className="flex flex-col shrink-0 grow-0 w-poster max-w-poster rounded-lg overflow-hidden my-2 select-none">
      <div className="relative h-poster">
        <Image
          src={`https://image.tmdb.org/t/p/w185/${movie.poster_path}`}
          alt={movie.title}
          crossOrigin=""
          width={preferredPosterSize.width}
          height={preferredPosterSize.height}
          priority={priority}
          className="h-poster"
        />
        <div
          className="absolute top-2 right-2 p-2 bg-black rounded-full cursor-pointer z-20"
          onClick={() => {
            if (MenuContext.setSelectedID && MenuContext.selectedID !== movie.id) {
              MenuContext.setSelectedID(movie.id);
            } else if (MenuContext.setSelectedID && MenuContext.selectedID === movie.id) {
              MenuContext.setSelectedID(undefined);
            }
          }}
        >
          <VerticalEllipsisIcon />
        </div>

        <div
          className={`w-full h-full bg-black z-10 absolute left-0 pt-10 duration-200 transition-all ${
            menuIsOpen ? "top-0" : "top-full"
          }`}
        >
          {menuIsOpen || menuIsTransitioning ? (
            <ul className="w-full flex flex-col">
              <Link href={`/movie/${movie.id}`}>
                <li className="p-2 text-sm whitespace-nowrap hover:bg-slate-300/10 w-full cursor-pointer">
                  Visit Page
                </li>
              </Link>
              <li className="p-2 text-sm whitespace-nowrap hover:bg-slate-300/10 w-full cursor-pointer">
                Add To Watchlist
              </li>
              <li className="p-2 text-sm whitespace-nowrap hover:bg-slate-300/10 w-full cursor-pointer">
                Add To Collection
              </li>
              <li
                className="p-2 text-sm whitespace-nowrap hover:bg-slate-300/10 w-full cursor-pointer"
                onClick={() => {
                  navigator.clipboard.writeText(`${window.location.host}/movie/${movie.id}`);
                }}
              >
                Copy Link To Page
              </li>
              <li className="p-2 text-sm whitespace-nowrap hover:bg-slate-300/10 w-full cursor-pointer">
                Recommend to Friend
              </li>
              <li className="p-2 text-sm whitespace-nowrap hover:bg-slate-300/10 w-full cursor-pointer">
                Mark as Seen
              </li>
            </ul>
          ) : undefined}
        </div>
      </div>
      <div className="w-poster max-w-poster px-2 z-50 relative bg-slate-900 grow-1 h-24 max-h-24 min-h-24">
        <h2 className="text-xs w-full h-4 text-right mt-1">{new Date(movie.release_date).toLocaleDateString()}</h2>
        <h1 className="font-bold h-20 min-h-20 max-h-20 overflow-hidden">{movie.title}</h1>
      </div>
    </li>
  );
}
