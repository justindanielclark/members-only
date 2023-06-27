"use client";
import ImageWithFallback from "@/lib/sharedComponents/FallbackImage";
import { smallerPreferredPosterSize } from "@/lib/utils/preferredPosterSize";
type Props = {
  movie: MovieSearchResult;
};
import Link from "next/link";
import LinkIcon from "@/lib/sharedComponents/LinkIcon";
import PlusIcon from "@/lib/sharedComponents/PlusIcon";
import MinusIcon from "@/lib/sharedComponents/MinusIcon";
import SeenIcon from "@/lib/sharedComponents/SeenIcon";
import UnseenIcon from "@/lib/sharedComponents/UnseenIcon";
import { useUserContext } from "@/lib/providers/UserProvider";
import { getUserListByName } from "@/lib/utils/getUserListByName";
import addMovieToSeenList from "@/lib/api/addMovieToSeenList";
import addMovieToWatchlist from "@/lib/api/addMovieToWatchlist";
import removeMovieFromSeenlist from "@/lib/api/removeMovieFromSeenList";
import removeMovieFromWatchlist from "@/lib/api/removeMovieFromWatchlist";
import { useRouter } from "next/navigation";

export default function Result({ movie }: Props) {
  const router = useRouter();
  const UserContext = useUserContext();
  const isOnWatchList =
    getUserListByName(UserContext.user, "Watch List").movies.findIndex((item) => item == movie.id) !== -1;
  const isOnSeenList =
    getUserListByName(UserContext.user, "Watched").movies.findIndex((item) => item == movie.id) !== -1;
  return (
    <article className="group/section even:bg-slate-900 odd:bg-slate-700 sm:rounded-lg overflow-hidden border-slate-900 border-2 sm:shadow-md sm:shadow-slate-900">
      <h2 className="text-xl bg-slate-900/40 flex items-center min-h-12 p-2 font-bold">{`${movie.title}${
        movie.release_date !== "" ? ` (${new Date(movie.release_date).getFullYear()})` : ""
      }`}</h2>
      <div className="flex flex-row items-start">
        <div className="h-fit w-fit basis-fit">
          <ImageWithFallback
            src={`https://image.tmdb.org/t/p/w185/${movie.poster_path}`}
            alt={movie.title}
            crossOrigin=""
            width={smallerPreferredPosterSize.width}
            height={smallerPreferredPosterSize.height}
            priority={true}
            className="h-smPoster w-smPoster max-h-smPoster max-w-smPoster"
          />
        </div>
        <div className="max-h-smPoster h-smPoster flex flex-col w-full">
          <p className="overflow-x-hidden flex-1 text-sm p-2 italic group-even/section:bg-slate-800">
            {movie.overview}
          </p>
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
            <li className="p-2 text-sm whitespace-nowrap hover:bg-slate-300/10 basis-1/3 cursor-pointer">
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
        </div>
      </div>
    </article>
  );
}
