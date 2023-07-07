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
import LinkIcon from "@/lib/sharedComponents/Icons/LinkIcon";
import Link from "next/link";
import { Metadata } from "next";
import UserContext from "@/lib/providers/UserProvider";
import _mongo from "@/lib/mongoDB/_mongo";
import Controls from "./components/Controls";
import Accordian from "@/lib/sharedComponents/Containers/Accordian";

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
  const [fetchedMovie, fetchedCredits, fetchedRecommendations, user] = await Promise.all([
    getMovieDetails(id),
    getMovieCredits(id),
    getMovieRecommendations(id),
    _mongo.user.retrieveUser(session.user.email as string, session.user.provider as string),
  ]);
  if (user) {
    if (!fetchedMovie.hasOwnProperty("message")) {
      const movie = fetchedMovie as MovieDetails;
      const { _id, ...simplifiedUser } = user;
      const movieMap = new Map<number, FetchedMovie>();
      const { cast, crew } = fetchedCredits as Cast;
      const reducedCrew = reduceCrew(crew);
      fetchedRecommendations.forEach((m) => movieMap.set(movie.id, m));
      const MovieContent: JSX.Element = (
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
                className="w-poster max-w-poster h-poster max-h-poster border-white border-2"
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
              <div className="flex flex-row gap-4 mt-4 justify-end">
                <div className="flex flex-row gap-4 flex-wrap">
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
      const CastCrewAndRecommendationContent: JSX.Element = (
        <>
          {cast.length > 0 || reducedCrew.length > 0 ? (
            <SubMainContainer className="px-4 py-8 flex flex-col">
              <Accordian title="Cast and Crew">
                <Link
                  href={`/movie/${movie.id}/castandcrew`}
                  className="flex flex-row gap-1 items-center justify-end text-sm hover:underline py-4 px-2"
                >
                  <LinkIcon />
                  <span>View Full Cast and Crew</span>
                </Link>

                {cast.length > 0 ? (
                  <div className="mb-4">
                    <h2 className="text-2xl font-bold">Top Billed Cast:</h2>
                    <div className="w-full h-fit px-5">
                      <div className="flex flex-row overflow-y-hidden gap-4">
                        {cast.slice(0, 10).map((credit) => {
                          return <CastCreditCard credit={credit} key={credit.id} />;
                        })}
                      </div>
                    </div>
                  </div>
                ) : undefined}
                {reducedCrew.length > 0 ? (
                  <div className="mb-4">
                    <h2 className="text-2xl font-bold">Notable Crew:</h2>
                    <div className="w-full h-fit px-5">
                      <div className="flex flex-row overflow-y-hidden gap-4 justify-start items-stretch">
                        {reducedCrew.slice(0, reducedCrew.length >= 10 ? 10 : reducedCrew.length).map((credit) => {
                          return <CastCreditCard credit={credit} key={credit.id} />;
                        })}
                      </div>
                    </div>
                  </div>
                ) : undefined}
              </Accordian>

              {fetchedRecommendations.length > 0 ? (
                <Accordian title="Recommended Movies">
                  <div className="w-full h-fit px-5">
                    <Recommendations movies={fetchedRecommendations} />
                  </div>
                </Accordian>
              ) : undefined}
            </SubMainContainer>
          ) : undefined}
        </>
      );

      return (
        <main className={mainContainerDefaultClasses}>
          <UserContext movieMap={movieMap} user={simplifiedUser}>
            {MovieContent}
            {CastCrewAndRecommendationContent}
          </UserContext>
        </main>
      );
    } else {
      notFound();
    }
  } else {
    return (
      <SubMainContainer>
        <h1 className="text-xl font-bold">
          Unable to pull User Data from server to render this page. Please try again later...
        </h1>
      </SubMainContainer>
    );
  }
}
