import getMovieCredits from "@/lib/TMDB/getMovieCredits";
import getMovieDetails from "@/lib/TMDB/getMovieDetails";
import { SubMainContainer, mainContainerDefaultClasses } from "@/lib/sharedComponents/MainContainer";
import { notFound } from "next/navigation";
import { preferredPosterSize } from "@/lib/utils/preferredPosterSize";
import CastCreditCard from "./components/CastCreditCard";
import reduceCrew from "@/lib/utils/reduceCrew";
import numberToCurrency from "@/lib/utils/numberToCurrency";
import getSessionOnServer from "@/lib/providers/getSessionOnServer";
import { redirect } from "next/navigation";
import ImageWithFallback from "@/lib/sharedComponents/FallbackImage";
import getMovieRecommendations from "@/lib/TMDB/getMovieRecommendations";
import Recommendations from "./components/Recommendations";
import LinkIcon from "@/lib/sharedComponents/LinkIcon";
import Link from "next/link";
import { Metadata } from "next";

type Props = {
  params: {
    movieID: string;
  };
};

export async function generateMetadata({ params: { movieID } }: Props): Promise<Metadata> {
  const id = Number.parseInt(movieID);
  if (Number.isNaN(id)) {
    notFound();
  }
  const fetchedMovie = await getMovieDetails(id);
  if (!fetchedMovie.hasOwnProperty("message")) {
    return {
      title: `MovieBase: ${(fetchedMovie as MovieDetails).title}`,
      description: `Movie Page For ${(fetchedMovie as MovieDetails).title}`,
    };
  }
  return {
    title: "Unknown Movie ID",
  };
}

export default async function MoviePage({ params: { movieID } }: Props) {
  //Redirect if not logged in
  const session = await getSessionOnServer();
  if (session == null) {
    redirect("/unauthorized");
  }
  //Redirect if param is not a number
  const id = Number.parseInt(movieID);
  if (Number.isNaN(id)) {
    notFound();
  }
  const [fetchedMovie, fetchedCredits, fetchedRecommendations] = await Promise.all([
    getMovieDetails(id),
    getMovieCredits(id),
    getMovieRecommendations(id),
  ]);

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
                backgroundPosition: "50% 20%",
              }}
              className=" w-full"
            >
              <SubMainContainer className="py-10 flex flex-col md:grid md:grid-cols-[185px_1fr] md:grid-rows-[auto_auto_auto]">
                {/* Title, Rating, Runtime */}
                <section className="md:col-span-2">
                  <h1 className="text-3xl font-bold pb-4 px-2">
                    {`${movie.title}${
                      movie.release_date ? " (" + new Date(movie.release_date).getFullYear() + ")" : ""
                    }`}
                  </h1>
                  {/* Rating, Release Date, Genres, Runtime */}
                </section>

                {/* TODO */}
                {/* Poster Image */}
                <section className="w-full flex justify-center items-center md:w-fit h-fit basis-fit">
                  <ImageWithFallback
                    src={`https://image.tmdb.org/t/p/w185/${movie.poster_path}`}
                    alt={`Movie poster for ${movie.title}`}
                    height={preferredPosterSize.height}
                    width={preferredPosterSize.width}
                    priority={true}
                    crossOrigin=""
                  />
                </section>
                {/* Tagline, Overview, Details, WebLink, Status, Lang, Budget, Revenue */}
                <section className="flex-1 p-4 flex flex-col">
                  {movie.tagline && movie.tagline !== "" ? (
                    <p className="italic text-lg font-bold">{`"${movie.tagline}"`}</p>
                  ) : undefined}
                  {movie.overview ? <p className="px-4 italic">{movie.overview}</p> : undefined}
                  {movie.production_companies && movie.production_companies.length > 0 ? (
                    <div className="my-2">
                      <h3 className="font-bold">Produced By:</h3>
                      <p className="px-4">{movie.production_companies.map((company) => company.name).join(", ")}</p>
                    </div>
                  ) : undefined}
                  {movie.homepage && movie.homepage !== "" ? (
                    <Link className="hover:underline" href={movie.homepage} rel="noopener noreferrer" target="_blank">
                      <LinkIcon />
                      <span className="ml-2">Visit Movie Homepage</span>
                    </Link>
                  ) : undefined}
                  {/* Status, Lang, Budget, Revenue */}
                  <div className="flex flex-row gap-4 md:justify-end justify-center flex-wrap mt-4">
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
                </section>
              </SubMainContainer>
            </div>
          );
        }
      : //Redirect if unable to find movie
        () => {
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
              <section className="my-4">
                <h2 className="text-2xl font-bold px-2">Top Billed Cast</h2>
                <div className="w-full h-fit relative px-5">
                  <div
                    id="opacityScreenLeft"
                    className="absolute h-full w-4 top-0 left-4 bg-gradient-to-r from-slate-800 to-slate-800/5 z-10"
                  ></div>
                  <div
                    id="opacityScreenRight"
                    className="absolute h-full w-4 top-0 right-4 bg-gradient-to-l from-slate-800 to-slate-800/5 z-10"
                  ></div>
                  <div className="flex flex-row overflow-y-hidden gap-4 px-5 relative">
                    {cast.slice(0, 10).map((credit) => {
                      return <CastCreditCard credit={credit} key={credit.id} />;
                    })}
                  </div>
                </div>
              </section>
              <section className="mb-4">
                <h2 className="text-2xl font-bold mt-4 px-2">Notable Crew</h2>
                <div className="w-full h-fit relative px-5">
                  <div
                    id="opacityScreenLeft"
                    className="absolute h-full w-4 top-0 left-4 bg-gradient-to-r from-slate-800 to-slate-800/5 z-10"
                  ></div>
                  <div
                    id="opacityScreenRight"
                    className="absolute h-full w-4 top-0 right-4 bg-gradient-to-l from-slate-800 to-slate-800/5 z-10"
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

  const RecommendationContent: JSX.Element | undefined = (() => {
    if (fetchedRecommendations.length > 0) {
      return (
        <SubMainContainer>
          <section>
            <h2 className="text-2xl font-bold mt-4 px-2">Recommended Movies:</h2>
            <div className="w-full h-fit relative px-5">
              <div
                id="opacityScreenLeft"
                className="absolute h-full w-4 top-0 left-4 bg-gradient-to-r from-slate-800 to-slate-800/5 z-10"
              ></div>
              <div
                id="opacityScreenRight"
                className="absolute h-full w-4 top-0 right-4 bg-gradient-to-l from-slate-800 to-slate-800/5 z-10"
              ></div>
              <Recommendations movies={fetchedRecommendations} />
            </div>
          </section>
        </SubMainContainer>
      );
    }
    return undefined;
  })();

  return (
    <main className={mainContainerDefaultClasses}>
      {MovieContent}
      {CastContent}
      {RecommendationContent}
    </main>
  );
}
