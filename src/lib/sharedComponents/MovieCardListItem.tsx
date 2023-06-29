"use client";
import { useEffect, useState } from "react";
import { useMenuMovieContext } from "./MenuMovieContext";
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
import { toast } from "react-toastify";
import CopiedToastId from "./Toasts/CopiedToast";
import VertEllipsisIcon from "./Icons/VertEllipsisIcon";

type MovieCardProps = {
  movie: FetchedMovie;
  priority: boolean;
};

export default function MovieCard({ movie, priority }: MovieCardProps) {
  const router = useRouter();
  const UserContext = useUserContext();
  const MenuContext = useMenuMovieContext();
  const [isProcessingWatchlistRequest, setProcessingWatchlistRequest] = useState<boolean>(false);
  const [isProcessingSeenRequest, setProcessingSeenRequest] = useState<boolean>(false);
  const [menuIsOpen, setMenuIsOpen] = useState<boolean>(false);
  const isOnWatchList =
    getUserListByName(UserContext.user, "Watch List").movies.findIndex((item) => item == movie.id) !== -1;
  const isOnSeenList =
    getUserListByName(UserContext.user, "Watched").movies.findIndex((item) => item == movie.id) !== -1;

  const handleClickSeenList = () => {
    if (!isProcessingSeenRequest) {
      setProcessingSeenRequest(true);
      if (isOnSeenList) {
        const removalPromise = removeMovieFromSeenlist({
          movieID: movie.id,
          lookup: UserContext.user.lookup,
        })
          .then((res) => {
            if (res.ok) {
              return res.json();
            }
            throw new Error("Error removing movie from seenlist");
          })
          .then((data) => {
            setProcessingSeenRequest(false);
            UserContext.removeSeenListMovie(movie.id);
            router.refresh();
          })
          .catch((err) => console.log(err.message));
        toast.promise(removalPromise, {
          pending: `Removing ${movie.title} from Seen List`,
          success: `${movie.title} removed from Seen List`,
          error: "There was an error with removing the movie",
        });
      } else {
        const addPromise = addMovieToSeenList({ movieID: movie.id, lookup: UserContext.user.lookup })
          .then((res) => {
            if (res.ok) {
              return res.json();
            }
            throw new Error("Error adding movie to seenlist");
          })
          .then((data) => {
            setProcessingSeenRequest(false);
            UserContext.addSeenListMovie(movie.id);
            router.refresh();
          })
          .catch((err) => console.log(err.message));
        toast.promise(addPromise, {
          pending: `Adding ${movie.title} to Seen List`,
          success: `${movie.title} added to Seen List`,
          error: "There was an error with removing the movie",
        });
      }
    }
  };
  const handleClickWatchList = () => {
    if (!isProcessingWatchlistRequest) {
      setProcessingWatchlistRequest(true);
      if (isOnWatchList) {
        const removalPromise = removeMovieFromWatchlist({ movieID: movie.id, lookup: UserContext.user.lookup })
          .then((res) => {
            if (res.ok) {
              return res.json();
            }
            throw new Error("Error removing movie from watchlist");
          })
          .then((data) => {
            if (MenuContext.setSelectedID && MenuContext.selectedID === movie.id) {
              MenuContext.setSelectedID(undefined);
            }
            setProcessingWatchlistRequest(false);
            UserContext.removeWatchListMovie(movie.id);
            router.refresh();
          })
          .catch((err) => console.log(err.message));
        toast.promise(removalPromise, {
          pending: `Removing ${movie.title} from Watch List`,
          success: `${movie.title} removed from Watch List`,
          error: "There was an error with removing the movie",
        });
      } else {
        const addPromise = addMovieToWatchlist({ movieID: movie.id, lookup: UserContext.user.lookup })
          .then((res) => {
            if (res.ok) {
              return res.json();
            }
            throw new Error("Error adding movie to watchlist");
          })
          .then((data) => {
            if (MenuContext.setSelectedID && MenuContext.selectedID === movie.id) {
              MenuContext.setSelectedID(undefined);
            }
            setProcessingWatchlistRequest(false);
            UserContext.addWatchListMovie(movie.id);
            router.refresh();
          })
          .catch((err) => console.log(err.message));
        toast.promise(addPromise, {
          pending: `Adding ${movie.title} to Watch List`,
          success: `${movie.title} added to Watch List`,
          error: "There was an error with adding the movie",
        });
      }
    }
  };

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
          className="absolute top-2 right-2 w-8 h-8 bg-black rounded-full cursor-pointer z-20 flex justify-center items-center"
          onClick={() => {
            if (MenuContext.setSelectedID && MenuContext.selectedID !== movie.id) {
              MenuContext.setSelectedID(movie.id);
            } else if (MenuContext.setSelectedID && MenuContext.selectedID === movie.id) {
              MenuContext.setSelectedID(undefined);
            }
          }}
        >
          <VertEllipsisIcon />
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
              <li className="text-sm whitespace-nowrap hover:bg-slate-300/10 w-full cursor-pointer">
                <button className="w-full h-fit text-left p-2" onClick={handleClickWatchList}>
                  {isOnWatchList ? "Remove From Watchlist" : "Add To Watchlist"}
                </button>
              </li>
              <li className="text-sm whitespace-nowrap hover:bg-slate-300/10 w-full cursor-pointer">
                <button className="w-full h-fit text-left p-2" onClick={handleClickSeenList}>
                  {isOnSeenList ? "Unmark as Seen" : "Mark as Seen"}
                </button>
              </li>
              <li className="text-sm whitespace-nowrap hover:bg-slate-300/10 w-full cursor-pointer">
                <button
                  className="w-full text-left p-2"
                  role="navigation"
                  onClick={() => {
                    navigator.clipboard.writeText(`${window.location.host}/movie/${movie.id}`);
                    toast(`Copied Link To ${movie.title}`, CopiedToastId);
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
        {movie.release_date !== "" ? (
          <h2 className="text-xs w-full h-4 text-right mt-1">{new Date(movie.release_date).toLocaleDateString()}</h2>
        ) : undefined}
        <h1 className={`font-bold h-20 min-h-20 max-h-20 overflow-hidden ${movie.release_date == "" ? "mt-4" : ""}`}>
          {movie.title}
        </h1>
      </div>
    </li>
  );
}
