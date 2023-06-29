"use client";
import { useUserContext } from "@/lib/providers/UserProvider";
import removeMovieFromWatchlist from "@/lib/api/removeMovieFromWatchlist";
import addMovieToWatchlist from "@/lib/api/addMovieToWatchlist";
import { useRouter } from "next/navigation";
import { getUserListByName } from "@/lib/utils/getUserListByName";
import CopyIcon from "@/lib/sharedComponents/Icons/CopyIcon";
import PlusIcon from "@/lib/sharedComponents/Icons/PlusIcon";
import MinusIcon from "@/lib/sharedComponents/Icons/MinusIcon";
import SeenIcon from "@/lib/sharedComponents/Icons/SeenIcon";
import UnseenIcon from "@/lib/sharedComponents/Icons/UnseenIcon";
import addMovieToSeenList from "@/lib/api/addMovieToSeenList";
import removeMovieFromSeenlist from "@/lib/api/removeMovieFromSeenList";
import { toast } from "react-toastify";
import { useState } from "react";
import CopiedToastId from "@/lib/sharedComponents/Toasts/CopiedToast";

type Props = {
  movie: MovieDetails;
};

export default function Controls({ movie }: Props) {
  const UserContext = useUserContext();
  const router = useRouter();

  const [isProcessingWatchlistRequest, setProcessingWatchlistRequest] = useState<boolean>(false);
  const [isProcessingSeenRequest, setProcessingSeenRequest] = useState<boolean>(false);
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

  const isOnWatchList =
    getUserListByName(UserContext.user, "Watch List").movies.findIndex((item) => item == movie.id) !== -1;
  const isOnSeenList =
    getUserListByName(UserContext.user, "Watched").movies.findIndex((item) => item == movie.id) !== -1;
  return (
    <ul className="max-w-lg mx-auto flex flex-col justify-center items-center flex-nowrap sm:flex-row">
      <li className="text-sm whitespace-nowrap hover:bg-slate-300/10 cursor-pointer basis-1/3">
        <button
          className="p-2 w-full h-fit text-left flex flex-row flex-nowrap items-center justify-center"
          onClick={handleClickWatchList}
        >
          {isOnWatchList ? (
            <>
              <MinusIcon />
              <span className="block px-2">Remove from Watchlist</span>
            </>
          ) : (
            <>
              <PlusIcon />
              <span className="block px-2">Add to Watchlist</span>
            </>
          )}
        </button>
      </li>
      <li className="text-sm whitespace-nowrap hover:bg-slate-300/10 basis-1/3 cursor-pointer">
        <button
          className="p-2 w-full h-fit text-left flex flex-row flex-nowrap items-center justify-center"
          onClick={handleClickSeenList}
        >
          {isOnSeenList ? (
            <>
              <UnseenIcon />
              <span className="block px-2">Unmark as Seen</span>
            </>
          ) : (
            <>
              <SeenIcon />
              <span className="block px-2">Mark as Seen</span>
            </>
          )}
        </button>
      </li>
      <li className="text-sm whitespace-nowrap hover:bg-slate-300/10 basis-1/3 cursor-pointer">
        <button
          className="p-2 w-full h-fit text-left flex flex-row flex-nowrap items-center justify-center"
          role="navigation"
          onClick={() => {
            navigator.clipboard.writeText(`${window.location.host}/movie/${movie.id}`);
            toast(`Copied Link To ${movie.title}`, CopiedToastId);
          }}
        >
          <>
            <CopyIcon />
            <span className="block px-2">Copy Link To Page</span>
          </>
        </button>
      </li>
    </ul>
  );
}
