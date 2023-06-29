import MainContainer from "@/lib/sharedComponents/MainContainer";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import getMovieDetails from "@/lib/TMDB/getMovieDetails";
import getMovieCredits from "@/lib/TMDB/getMovieCredits";
import getSessionOnServer from "@/lib/providers/getSessionOnServer";
import { redirect } from "next/navigation";
import reduceCrew from "@/lib/utils/reduceCrew";
import ImageWithFallback from "@/lib/sharedComponents/FallbackImage";
import { smallPreferredProfileSize } from "@/lib/utils/preferredProfileSize";

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

export default async function CastAndCrewPage({ params: { movieID } }: Props) {
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
  const [fetchedMovie, fetchedCredits] = await Promise.all([getMovieDetails(id), getMovieCredits(id)]);
  let content: JSX.Element;
  if (!fetchedMovie.hasOwnProperty("message") && !fetchedCredits.hasOwnProperty("message")) {
    const movie = fetchedMovie as MovieDetails;
    const { cast, crew } = fetchedCredits as Cast;
    const reducedCrew = reduceCrew(crew);
    content = (
      <>
        <h1 className="text-3xl font-bold ">{movie.title}: Cast and Crew</h1>
        <article className="flex flex-row flex-wrap">
          <section className="basis-full sm:basis-1/2 bg-slate-700/20 p-4">
            <h2 className="text-2xl font-bold underline">Cast</h2>
            <ul className="flex flex-col gap-2">
              {cast.map((credit) => {
                return (
                  <li key={credit.id} className="flex flex-row gap-2">
                    <ImageWithFallback
                      alt={`Profile Photo - ${credit.name}`}
                      crossOrigin=""
                      height={smallPreferredProfileSize.height}
                      width={smallPreferredProfileSize.width}
                      priority={false}
                      src={`https://image.tmdb.org/t/p/w92${credit.profile_path}`}
                      className="w-smProfile max-w-smProfile h-smProfile max-h-smProfile rounded-lg shrink-0"
                    />
                    <div>
                      <p className="text-lg font-bold">{credit.name}</p>
                      <p className="text-sm px-2">{credit.character}</p>
                    </div>
                  </li>
                );
              })}
            </ul>
          </section>
          <section className="basis-full sm:basis-1/2 bg-slate-700/20 p-4">
            <h2 className="text-2xl font-bold underline">Crew</h2>
            <ul className="flex flex-col gap-2">
              {reducedCrew.map((credit) => {
                return (
                  <li key={credit.id} className="flex flex-row gap-2">
                    <ImageWithFallback
                      alt={`Profile Photo - ${credit.name}`}
                      crossOrigin=""
                      height={smallPreferredProfileSize.height}
                      width={smallPreferredProfileSize.width}
                      priority={false}
                      src={`https://image.tmdb.org/t/p/w92${credit.profile_path}`}
                      className="w-smProfile max-w-smProfile h-smProfile max-h-smProfile rounded-lg shrink-0"
                    />
                    <div>
                      <p className="text-lg font-bold">{credit.name}</p>
                      <p className="text-sm px-2">{credit.jobs.join(", ")}</p>
                    </div>
                  </li>
                );
              })}
            </ul>
          </section>
        </article>
      </>
    );
  } else {
    content = <div>Sup</div>;
  }

  return <MainContainer>{content}</MainContainer>;
}
