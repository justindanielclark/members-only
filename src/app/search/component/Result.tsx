import ImageWithFallback from "@/lib/sharedComponents/FallbackImage";
import { smallerPreferredPosterSize } from "@/lib/utils/preferredPosterSize";
import ResultControls from "./ResultControls";
type Props = {
  movie: MovieSearchResult;
};

export default function Result({ movie }: Props) {
  return (
    <article className="group/section sm:rounded-lg overflow-hidden border-slate-900 border-2 sm:shadow-md sm:shadow-slate-900">
      {/* TITLE */}
      <h2 className="text-xl flex items-center min-h-12 p-2 font-bold bg-slate-900">
        {`${movie.title}${movie.release_date !== "" ? ` (${new Date(movie.release_date).getFullYear()})` : ""}`}
      </h2>
      {/* POSTER AND OVERVIEW */}
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
        <div className="max-h-smPoster h-smPoster flex flex-col w-full bg-slate-700/70">
          <p className="overflow-x-hidden flex-1 text-sm p-2 italic">{movie.overview}</p>
        </div>
      </div>
      <ResultControls movie={movie} />
    </article>
  );
}
