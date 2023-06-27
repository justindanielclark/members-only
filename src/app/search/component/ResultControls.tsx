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

type Props = {
  movie: MovieSearchResult;
};

export default function ResultControls({ movie }: Props) {
  const [showing, setShowing] = useState<boolean>(false);
  const router = useRouter();
  const UserContext = useUserContext();
  const isOnWatchList =
    getUserListByName(UserContext.user, "Watch List").movies.findIndex((item) => item == movie.id) !== -1;
  const isOnSeenList =
    getUserListByName(UserContext.user, "Watched").movies.findIndex((item) => item == movie.id) !== -1;
  return (
    <ul className="flex flex-row justify-center items-center flex-wrap w-full">
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
