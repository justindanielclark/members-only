"use client";
import CopyIcon from "@/lib/sharedComponents/Icons/CopyIcon";
import PlusIcon from "@/lib/sharedComponents/Icons/PlusIcon";
import MinusIcon from "@/lib/sharedComponents/Icons/MinusIcon";
import SeenIcon from "@/lib/sharedComponents/Icons/SeenIcon";
import UnseenIcon from "@/lib/sharedComponents/Icons/UnseenIcon";
import addMovieToSeenList from "@/lib/api/addMovieToSeenList";
import addMovieToWatchlist from "@/lib/api/addMovieToWatchlist";
import removeMovieFromSeenlist from "@/lib/api/removeMovieFromSeenList";
import removeMovieFromWatchlist from "@/lib/api/removeMovieFromWatchlist";
import { useUserContext } from "@/lib/providers/UserProvider";
import { getUserListByName } from "@/lib/utils/getUserListByName";
import { useRouter } from "next/navigation";
import LinkIcon from "@/lib/sharedComponents/Icons/LinkIcon";
import Link from "next/link";
import { useState } from "react";
import { toast } from "react-toastify";
import CopiedToastId from "@/lib/sharedComponents/Toasts/CopiedToast";

type Props = {
  movie: MovieSearchResult;
};

export default function ResultControls({ movie }: Props) {
  const [isProcessingWatchlistRequest, setProcessingWatchlistRequest] = useState(false);
  const [isProcessingSeenRequest, setProcessingSeenRequest] = useState(false);

  const router = useRouter();
  const UserContext = useUserContext();
  const isOnWatchList =
    getUserListByName(UserContext.user, "Watch List").movies.findIndex((item) => item == movie.id) !== -1;
  const isOnSeenList =
    getUserListByName(UserContext.user, "Watched").movies.findIndex((item) => item == movie.id) !== -1;
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
            setProcessingWatchlistRequest(false);
            UserContext.removeWatchListMovie(movie.id);
            router.refresh();
          });
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
            setProcessingWatchlistRequest(false);
            UserContext.addWatchListMovie(movie.id);
            router.refresh();
          });
        toast.promise(addPromise, {
          pending: `Adding ${movie.title} to Watch List`,
          success: `${movie.title} added to Watch List`,
          error: "There was an error with adding the movie",
        });
      }
    }
  };
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
          });
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
          });
        toast.promise(addPromise, {
          pending: `Adding ${movie.title} to Seen List`,
          success: `${movie.title} added to Seen List`,
          error: "There was an error with removing the movie",
        });
      }
    }
  };

  return (
    <ul className="flex flex-row justify-center items-center flex-wrap w-full bg-slate-900">
      <li className="p-1 text-sm whitespace-nowrap hover:bg-slate-300/10 cursor-pointer rounded-lg flex-1 basis-1/2 sm:basis-1/4">
        <Link href={`/movie/${movie.id}`}>
          <button className="w-full h-fit text-left flex flex-row flex-nowrap items-center justify-center">
            <>
              <LinkIcon />
              <span className="block px-2 text-xs">Visit Page</span>
            </>
          </button>
        </Link>
      </li>
      <li className="p-1 text-sm whitespace-nowrap hover:bg-slate-300/10 rounded-lg cursor-pointer flex-1 basis-1/2 sm:basis-1/4">
        <button
          className="w-full h-fit text-left flex flex-row flex-nowrap items-center justify-center"
          role="navigation"
          onClick={() => {
            navigator.clipboard.writeText(`${window.location.host}/movie/${movie.id}`);
            toast(`Copied Link To ${movie.title}`, CopiedToastId);
          }}
        >
          <>
            <CopyIcon />
            <span className="block px-2 text-xs">Copy Link To Page</span>
          </>
        </button>
      </li>
      <li className="p-1 text-sm whitespace-nowrap hover:bg-slate-300/10 cursor-pointer rounded-lg flex-1 basis-1/2 sm:basis-1/4">
        <button
          className="w-full h-fit text-left flex flex-row flex-nowrap items-center justify-center"
          onClick={handleClickWatchList}
        >
          {isOnWatchList ? (
            <>
              <MinusIcon />
              <span className="block px-2 text-xs">Remove from Watchlist</span>
            </>
          ) : (
            <>
              <PlusIcon />
              <span className="block px-2 text-xs">Add to Watchlist</span>
            </>
          )}
        </button>
      </li>
      <li className="p-1 text-sm whitespace-nowrap hover:bg-slate-300/10 rounded-lg cursor-pointer flex-1 basis-1/2 sm:basis-1/4">
        <button
          className="w-full h-fit text-left flex flex-row flex-nowrap items-center justify-center"
          onClick={handleClickSeenList}
        >
          {isOnSeenList ? (
            <>
              <UnseenIcon />
              <span className="block px-2 text-xs">Unmark as Seen</span>
            </>
          ) : (
            <>
              <SeenIcon />
              <span className="block px-2 text-xs">Mark as Seen</span>
            </>
          )}
        </button>
      </li>
    </ul>
  );
}
