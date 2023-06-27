"use client";
import { useUserContext } from "@/lib/providers/UserProvider";
import removeMovieFromWatchlist from "@/lib/api/removeMovieFromWatchlist";
import addMovieToWatchlist from "@/lib/api/addMovieToWatchlist";
import { useRouter } from "next/navigation";
import { getUserListByName } from "@/lib/utils/getUserListByName";
import CopyIcon from "@/lib/sharedComponents/CopyIcon";
import PlusIcon from "@/lib/sharedComponents/PlusIcon";
import MinusIcon from "@/lib/sharedComponents/MinusIcon";
import SeenIcon from "@/lib/sharedComponents/SeenIcon";
import UnseenIcon from "@/lib/sharedComponents/UnseenIcon";
import addMovieToSeenList from "@/lib/api/addMovieToSeenList";
import removeMovieFromSeenlist from "@/lib/api/removeMovieFromSeenList";
type Props = {
  movie: MovieDetails;
};

export default function Controls({ movie }: Props) {
  const UserContext = useUserContext();
  const router = useRouter();
  const isOnWatchList =
    getUserListByName(UserContext.user, "Watch List").movies.findIndex((item) => item == movie.id) !== -1;
  const isOnSeenList =
    getUserListByName(UserContext.user, "Watched").movies.findIndex((item) => item == movie.id) !== -1;
  return (
    <ul className="max-w-lg mx-auto flex flex-col justify-center items-center flex-nowrap sm:flex-row">
      <li className="p-2 text-sm whitespace-nowrap hover:bg-slate-300/10 cursor-pointer basis-1/3">
        <button
          className="w-full h-fit text-left flex flex-row flex-nowrap items-center justify-center"
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
      <li className="p-2 text-sm whitespace-nowrap hover:bg-slate-300/10 basis-1/3 cursor-pointer">
        <button
          className="w-full h-fit text-left flex flex-row flex-nowrap items-center justify-center"
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
      <li className="p-2 text-sm whitespace-nowrap hover:bg-slate-300/10 basis-1/3 cursor-pointer">
        <button
          className="w-full h-fit text-left flex flex-row flex-nowrap items-center justify-center"
          role="navigation"
          onClick={() => {
            navigator.clipboard.writeText(`${window.location.host}/movie/${movie.id}`);
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
