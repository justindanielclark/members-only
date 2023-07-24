import { SubMainContainer } from "@/lib/sharedComponents/MainContainer";
import minutesToRuntime from "@/lib/utils/minutesToRuntime";
import ImageWithFallback from "@/lib/sharedComponents/FallbackImage";
import { preferredPosterSize } from "@/lib/utils/preferredPosterSize";
import Link from "next/link";
import LinkIcon from "@/lib/sharedComponents/Icons/LinkIcon";
import numberToCurrency from "@/lib/utils/numberToCurrency";
import Controls from "../Controls";

type Props = {
  movie: MovieDetails;
};

export default function BannerContent({ movie }: Props) {
  return (
    <div
      id="hero_image"
      style={{
        background: `linear-gradient(to bottom, rgba(0,0,0,0.7), 15%, rgba(0,0,0,0.8), 70%, rgba(0,0,0,0.7)), url("https://image.tmdb.org/t/p/original${movie.backdrop_path}")`,
        backgroundSize: "cover",
        backgroundPosition: "50% 20%",
      }}
      className="max-w-[2000px] mx-auto"
    >
      <SubMainContainer className="py-10 flex flex-col md:grid md:grid-cols-[185px_1fr] md:grid-rows-[auto_auto_auto]">
        {/* Title, Rating, Runtime */}
        <section className="md:col-span-2 pb-4">
          <h1 className="text-3xl font-bold px-2">
            {`${movie.title}${movie.release_date ? " (" + new Date(movie.release_date).getFullYear() + ")" : ""}`}
          </h1>
          {movie.genres.length > 0 ? (
            <p className="px-4 text-sm">
              {movie.genres
                .reduce((acc, cur) => {
                  acc.push(cur.name);
                  return acc;
                }, [] as Array<string>)
                .join(" / ")}
            </p>
          ) : undefined}
          {/* Rating, Release Date, Runtime */}
          {movie.runtime > 0 ? (
            <p className="px-4 text-sm">
              <span className="pr-2">Runtime:</span>
              {minutesToRuntime(movie.runtime)}
            </p>
          ) : undefined}
          {/* TODO */}
        </section>

        {/* Poster Image */}
        <section className="w-full flex justify-center items-center md:w-fit h-fit basis-fit">
          <ImageWithFallback
            src={`https://image.tmdb.org/t/p/w185/${movie.poster_path}`}
            alt={`Movie poster for ${movie.title}`}
            height={preferredPosterSize.height}
            width={preferredPosterSize.width}
            priority={true}
            crossOrigin=""
            className="w-poster max-w-poster h-poster max-h-poster border-white border-2"
          />
        </section>
        {/* Tagline, Overview, Details, WebLink, Status, Lang, Budget, Revenue */}
        <section className="flex-1 p-4 flex flex-col">
          {movie.tagline && movie.tagline !== "" ? (
            <p className="italic text-lg font-bold">{`"${movie.tagline}"`}</p>
          ) : undefined}
          {movie.overview ? <p className="px-4 py-2 italic max-w-3xl mx-auto">{movie.overview}</p> : undefined}
          {movie.production_companies && movie.production_companies.length > 0 ? (
            <div className="my-2">
              <h3 className="font-bold">Produced By:</h3>
              <p className="px-4">{movie.production_companies.map((company) => company.name).join(", ")}</p>
            </div>
          ) : undefined}
          {movie.homepage && movie.homepage !== "" ? (
            <div>
              <Link className="hover:underline" href={movie.homepage} rel="noopener noreferrer" target="_blank">
                <LinkIcon />
                <span className="ml-2 py-1">Visit Movie Homepage</span>
              </Link>
            </div>
          ) : undefined}
          {/* Status, Lang, Budget, Revenue */}
          <div className="flex flex-row gap-4 mt-4 justify-end">
            <div className="flex flex-row gap-4 flex-wrap">
              <div className="flex flex-col">
                <h3 className="font-bold">Status:</h3>
                <p>{movie.status}</p>
              </div>
              <div className="flex flex-col max-w-[200px]">
                <h3 className="font-bold">Spoken Languages:</h3>
                <p>
                  {movie.spoken_languages
                    .reduce((acc, cur) => {
                      acc.push(cur.english_name);
                      return acc;
                    }, [] as Array<string>)
                    .join(", ")}
                </p>
              </div>
            </div>
            {movie.budget !== 0 || movie.revenue !== 0 ? (
              <div className="flex flex-row gap-4 flex-wrap">
                {movie.budget !== 0 ? (
                  <div className="flex flex-col">
                    <h3 className="font-bold">Budget:</h3>
                    <p>{numberToCurrency(movie.budget)}</p>
                  </div>
                ) : undefined}
                {movie.revenue !== 0 ? (
                  <div className="flex flex-col">
                    <h3 className="font-bold">Revenue:</h3>
                    <p>{numberToCurrency(movie.revenue)}</p>
                  </div>
                ) : undefined}
              </div>
            ) : undefined}
          </div>
        </section>
        {/* Controls */}
        <section className="col-span-2 my-8">
          <Controls movie={movie} />
        </section>
      </SubMainContainer>
    </div>
  );
}
