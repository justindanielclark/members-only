import Link from "next/link";
import Image from "next/image";

const PREFERRED_POSTER_SIZE = {
  width: 185,
  height: 278,
};
type TopMoviesProps = {
  movies: Array<FetchedMovie>;
};
type MovieCardProps = {
  movie: FetchedMovie;
  priority: boolean;
};
function MovieCard({ movie, priority }: MovieCardProps) {
  return (
    <li className="flex-auto flex flex-col shrink-0 w-poster max-w-poster bg-slate-700/50 rounded-lg overflow-hidden my-2">
      <Image
        src={`https://image.tmdb.org/t/p/w185/${movie.poster_path}`}
        alt={movie.title}
        crossOrigin=""
        width={PREFERRED_POSTER_SIZE.width}
        height={PREFERRED_POSTER_SIZE.height}
        priority={priority}
      />
      <div className="w-poster max-w-poster px-2">
        <h2 className="text-xs w-full text-right mt-1">{new Date(movie.release_date).toLocaleDateString()}</h2>
        <h1 className="font-bold max-h-20 overflow-hidden">{movie.title}</h1>
      </div>
    </li>
  );
}

export default function TopMovies({ movies }: TopMoviesProps) {
  return (
    <section className="">
      <h1 className="text-2xl font-bold">Today{"'"}s Top Movies</h1>
      <ul className="flex flex-row overflow-x-scroll flex-nowrap justify-start gap-4">
        {movies.map((movie, idx) => (
          <MovieCard movie={movie} key={movie.id} priority={idx < 10} />
        ))}
      </ul>
    </section>
  );
}
