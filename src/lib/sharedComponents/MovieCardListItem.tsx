"use client";
import { useEffect, useState } from "react";
import { useMenuMovieContext } from "./MenuMovieContext";
import { FaEllipsisV as VerticalEllipsisIcon } from "react-icons/fa";
import { preferredPosterSize } from "@/lib/utils/preferredPosterSize";
import Link from "next/link";
import ImageWithFallback from "./FallbackImage";
import { useUserContext } from "../providers/UserProvider";
import { useRouter } from "next/navigation";
import { getUserListByName } from "../utils/getUserListByName";
import addMovieToWatchlist from "../api/addMovieToWatchlist";
import removeMovieFromWatchlist from "../api/removeMovieFromWatchlist";
import addMovieToSeenList from "../api/addMovieToSeenList";
import removeMovieFromSeenlist from "../api/removeMovieFromSeenList";

type MovieCardProps = {
  movie: FetchedMovie;
  priority: boolean;
};

export default function MovieCard({ movie, priority }: MovieCardProps) {
  const router = useRouter();
  const UserContext = useUserContext();
  const MenuContext = useMenuMovieContext();
  const [menuIsOpen, setMenuIsOpen] = useState<boolean>(false);
  const isOnWatchList =
    getUserListByName(UserContext.user, "Watch List").movies.findIndex((item) => item == movie.id) !== -1;
  const isOnSeenList =
    getUserListByName(UserContext.user, "Watched").movies.findIndex((item) => item == movie.id) !== -1;

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
        <ImageWithFallback
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
          {menuIsOpen ? (
            <ul className="w-full flex flex-col">
              <Link href={`/movie/${movie.id}`}>
                <li className="p-2 text-sm whitespace-nowrap hover:bg-slate-300/10 w-full cursor-pointer">
                  Visit Page
                </li>
              </Link>
              <Link href={`/movie/${movie.id}`} rel="noopener noreferrer" target="_blank">
                <li className="p-2 text-sm whitespace-nowrap hover:bg-slate-300/10 w-full cursor-pointer">
                  Visit Page In New Tab
                </li>
              </Link>
              <li className="p-2 text-sm whitespace-nowrap hover:bg-slate-300/10 w-full cursor-pointer">
                <button
                  className="w-full h-fit text-left"
                  onClick={() => {
                    if (isOnWatchList) {
                      removeMovieFromWatchlist({ movieID: movie.id, lookup: UserContext.user.lookup })
                        .then((res) => {
                          if (res.ok) {
                            return res.json();
                          }
                          throw new Error("Error removing movie from watchlist");
                        })
                        .then((data) => {
                          UserContext.removeWatchListMovie(movie.id);
                          router.refresh();
                        })
                        .catch((err) => console.log(err.message));
                    } else {
                      addMovieToWatchlist({ movieID: movie.id, lookup: UserContext.user.lookup })
                        .then((res) => {
                          if (res.ok) {
                            return res.json();
                          }
                          throw new Error("Error adding movie to watchlist");
                        })
                        .then((data) => {
                          UserContext.addWatchListMovie(movie.id);
                          router.refresh();
                        })
                        .catch((err) => console.log(err.message));
                    }
                  }}
                >
                  {isOnWatchList ? "Remove From Watchlist" : "Add To Watchlist"}
                </button>
              </li>
              <li className="p-2 text-sm whitespace-nowrap hover:bg-slate-300/10 w-full cursor-pointer">
                <button
                  className="w-full h-fit text-left"
                  onClick={() => {
                    if (isOnSeenList) {
                      removeMovieFromSeenlist({ movieID: movie.id, lookup: UserContext.user.lookup })
                        .then((res) => {
                          if (res.ok) {
                            return res.json();
                          }
                          throw new Error("Error removing movie from seenlist");
                        })
                        .then((data) => {
                          UserContext.removeSeenListMovie(movie.id);
                          router.refresh();
                        })
                        .catch((err) => console.log(err.message));
                    } else {
                      addMovieToSeenList({ movieID: movie.id, lookup: UserContext.user.lookup })
                        .then((res) => {
                          if (res.ok) {
                            return res.json();
                          }
                          throw new Error("Error adding movie to seenlist");
                        })
                        .then((data) => {
                          UserContext.addSeenListMovie(movie.id);
                          router.refresh();
                        })
                        .catch((err) => console.log(err.message));
                    }
                  }}
                >
                  {isOnSeenList ? "Unmark as Seen" : "Mark as Seen"}
                </button>
              </li>
              <li className="p-2 text-sm whitespace-nowrap hover:bg-slate-300/10 w-full cursor-pointer">
                <button
                  className="w-full text-left"
                  role="navigation"
                  onClick={() => {
                    navigator.clipboard.writeText(`${window.location.host}/movie/${movie.id}`);
                  }}
                >
                  Copy Link To Page
                </button>
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
