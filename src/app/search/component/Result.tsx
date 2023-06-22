import ImageWithFallback from "@/lib/sharedComponents/FallbackImage";
import { smallerPreferredPosterSize } from "@/lib/utils/preferredPosterSize";
type Props = {
  movie: MovieSearchResult;
};
import Link from "next/link";
import LinkIcon from "@/lib/sharedComponents/LinkIcon";
import PlusIcon from "@/lib/sharedComponents/PlusIcon";

export default function Result({ movie }: Props) {
  return (
    <article
      key={movie.id}
      className="group/section even:bg-slate-900 odd:bg-slate-700 sm:rounded-lg overflow-hidden border-slate-900 border-2 sm:shadow-md sm:shadow-slate-900"
    >
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
          <ul
            className="group-even/section:bg-slate-900 group-odd/section:bg-slate-800 flex flex-row text-sm p-1 justify-end"
            id={`${movie.title} controls`}
          >
            <li className="basis-fit">
              <Link href={`/movie/${movie.id}`} className="group/pagelink flex flex-row items-center">
                <PlusIcon />
                <span className="inline-block pl-1 pr-2 group-hover/pagelink:underline">Add to Watchlist</span>
              </Link>
            </li>
            <li className="basis-fit">
              <Link href={`/movie/${movie.id}`} className="group/pagelink flex flex-row items-center">
                <LinkIcon />
                <span className="inline-block pl-1 pr-2 group-hover/pagelink:underline">Visit Page</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </article>
  );
}
