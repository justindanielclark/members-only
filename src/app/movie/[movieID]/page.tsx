import getMovieCredits from "@/lib/TMDB/getMovieCredits";
import getMovieDetails from "@/lib/TMDB/getMovieDetails";
import { SubMainContainer, mainContainerDefaultClasses } from "@/lib/sharedComponents/MainContainer";
import { notFound } from "next/navigation";
import Image from "next/image";
import { preferredPosterSize } from "@/lib/utils/preferredPosterSize";
import CastCreditCard from "./components/CastCreditCard";
import reduceCrew from "@/lib/utils/reduceCrew";
import numberToCurrency from "@/lib/utils/numberToCurrency";

type Props = {
  params: {
    movieID: string;
  };
};

export default async function MoviePage({ params: { movieID } }: Props) {
  const id = Number.parseInt(movieID);
  if (Number.isNaN(id)) {
    notFound();
  }
  const [fetchedMovie, fetchedCredits] = await Promise.all([getMovieDetails(id), getMovieCredits(id)]);

  const MovieContent: JSX.Element = (
    !fetchedMovie.hasOwnProperty("message")
      ? () => {
          const movie = fetchedMovie as MovieDetails;
          return (
            <div
              id="hero_image"
              style={{
                background: `linear-gradient(to bottom, rgba(0,0,0,0.7), 15%, rgba(0,0,0,0.8), 70%, rgba(0,0,0,0.7)), url("https://image.tmdb.org/t/p/original${movie.backdrop_path}")`,
                backgroundSize: "cover",
                backgroundPosition: "20% 30%",
              }}
              className=" w-full"
            >
              <SubMainContainer className="py-10 flex flex-row flex-wrap">
                {/* Title, Rating, Runtime */}
                <section className="basis-full">
                  <h1 className="text-3xl font-bold pb-4">
                    {`${movie.title}${
                      movie.release_date ? " (" + new Date(movie.release_date).getFullYear() + ")" : ""
                    }`}
                  </h1>
                </section>
                {/* Rating, Release Date, Genres, Runtime */}
                <section className="w-fit h-fit basis-fit">
                  <Image
                    src={`https://image.tmdb.org/t/p/w185/${movie.poster_path}`}
                    alt={`Movie poster for ${movie.title}`}
                    height={preferredPosterSize.height}
                    width={preferredPosterSize.width}
                    priority={true}
                  />
                  {/* TAGLINE AND MOVIE SUMMARY */}
                </section>
                {movie.tagline || movie.overview ? (
                  <section className="flex-1 p-4">
                    {movie.tagline && movie.tagline !== "" ? (
                      <p className="italic text-lg">{`"${movie.tagline}"`}</p>
                    ) : undefined}
                    {movie.overview ? <p className="px-4 italic">{movie.overview}</p> : undefined}
                  </section>
                ) : undefined}
                {/* Original Language, Budget, Revenue, Keywords */}
                <section className="flex flex-row basis-full gap-4">
                  <div className="flex flex-col">
                    <h3 className="font-bold">Status:</h3>
                    <p>{movie.status}</p>
                  </div>
                  <div className="flex flex-col">
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
                  <div className="flex flex-col">
                    <h3 className="font-bold">Budget:</h3>
                    <p>{numberToCurrency(movie.budget)}</p>
                  </div>
                  <div className="flex flex-col">
                    <h3 className="font-bold">Revenue:</h3>
                    <p>{numberToCurrency(movie.revenue)}</p>
                  </div>
                </section>
              </SubMainContainer>
            </div>
          );
        }
      : () => {
          notFound();
        }
  )();

  const CastContent: JSX.Element = (
    !fetchedMovie.hasOwnProperty("message")
      ? () => {
          const { cast, crew } = fetchedCredits as Cast;
          const reducedCrew = reduceCrew(crew);
          return (
            <SubMainContainer>
              <section>
                <h2 className="text-2xl font-bold mt-4">Top Billed Cast</h2>
                <div className="w-full h-fit relative">
                  <div
                    id="opacityScreenLeft"
                    className="absolute h-full w-4 top-0 left-0 bg-gradient-to-r from-slate-800 to-slate-800/5 z-10"
                  ></div>
                  <div
                    id="opacityScreenRight"
                    className="absolute h-full w-4 top-0 right-0 bg-gradient-to-l from-slate-800 to-slate-800/5 z-10"
                  ></div>
                  <div className="flex flex-row overflow-y-hidden gap-4 px-5 relative">
                    {cast.slice(0, 10).map((credit) => {
                      return <CastCreditCard credit={credit} key={credit.id} />;
                    })}
                  </div>
                </div>
              </section>
              <section>
                <h2 className="text-2xl font-bold mt-4">Notable Crew</h2>
                <div className="w-full h-fit relative">
                  <div
                    id="opacityScreenLeft"
                    className="absolute h-full w-4 top-0 left-0 bg-gradient-to-r from-slate-800 to-slate-800/5 z-10"
                  ></div>
                  <div
                    id="opacityScreenRight"
                    className="absolute h-full w-4 top-0 right-0 bg-gradient-to-l from-slate-800 to-slate-800/5 z-10"
                  ></div>
                  <div className="flex flex-row overflow-y-hidden gap-4 px-5 relative justify-start items-stretch">
                    {reducedCrew.slice(0, reducedCrew.length >= 10 ? 10 : reducedCrew.length).map((credit) => {
                      return <CastCreditCard credit={credit} key={credit.id} />;
                    })}
                  </div>
                </div>
              </section>
            </SubMainContainer>
          );
        }
      : () => {
          const cast = fetchedCredits as FetchMessage;
          //TODO Redirect to page saying server was unable to load cast and crew credits
          return <div>CAST NOT FOUND</div>;
        }
  )();

  return (
    <main className={mainContainerDefaultClasses}>
      {MovieContent}
      {CastContent}
    </main>
  );
}
