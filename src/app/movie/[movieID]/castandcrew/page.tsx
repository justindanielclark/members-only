import MainContainer from "@/lib/sharedComponents/MainContainer";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import getMovieDetails from "@/lib/TMDB/getMovieDetails";
import getMovieCredits from "@/lib/TMDB/getMovieCredits";
import getSessionOnServer from "@/lib/providers/getSessionOnServer";
import { redirect } from "next/navigation";
import reduceCrew from "@/lib/utils/reduceCrew";
import FallbackPersonImage from "@/lib/sharedComponents/FallbackPersonImage";
import { smallPreferredProfileSize } from "@/lib/utils/preferredProfileSize";
import Link from "next/link";

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
        <h1 className="text-3xl font-bold my-8">{movie.title}: Cast and Crew</h1>
        <article className="">
          <section className="bg-slate-700/20 p-4">
            <h2 className="text-2xl font-bold underline mb-4">Cast</h2>
            <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 sm:gap-4 flex-wrap justify-between [&>*:nth-child(7n+1)]:bg-slate-950/10 [&>*:nth-child(7n+2)]:bg-slate-950/20 [&>*:nth-child(7n+3)]:bg-slate-950/30 [&>*:nth-child(7n+4)]:bg-slate-950/40 [&>*:nth-child(7n+5)]:bg-slate-950/30 [&>*:nth-child(7n+6)]:bg-slate-950/20 [&>*:nth-child(7n+7)]:bg-slate-950/10">
              {cast.map((credit) => {
                return (
                  <li key={credit.id} className="rounded-lg border-slate-950 border-b border-r group cursor-pointer">
                    <Link href={`/person/${credit.id}`} className="flex flex-row gap-2" prefetch={false}>
                      <FallbackPersonImage
                        profile_path={credit.profile_path}
                        gender={credit.gender}
                        src={`https://image.tmdb.org/t/p/w92${credit.profile_path}`}
                        alt={`Profile Photo - ${credit.name}`}
                        crossOrigin=""
                        height={smallPreferredProfileSize.height}
                        width={smallPreferredProfileSize.width}
                        priority={false}
                        className="w-smProfile max-w-smProfile h-smProfile max-h-smProfile rounded-lg shrink-0"
                      />
                      <div className="group-hover:underline underline-offset-2 p-2">
                        <p className="text-lg font-bold">{credit.name}</p>
                        <p className="text-sm px-2">{credit.character}</p>
                      </div>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </section>
          <section className="bg-slate-700/20 p-4">
            <h2 className="text-2xl font-bold underline mb-4">Crew</h2>
            <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 sm:gap-4 flex-wrap justify-between [&>*:nth-child(7n+1)]:bg-slate-950/10 [&>*:nth-child(7n+2)]:bg-slate-950/20 [&>*:nth-child(7n+3)]:bg-slate-950/30 [&>*:nth-child(7n+4)]:bg-slate-950/40 [&>*:nth-child(7n+5)]:bg-slate-950/30 [&>*:nth-child(7n+6)]:bg-slate-950/20 [&>*:nth-child(7n+7)]:bg-slate-950/10">
              {reducedCrew.map((credit) => {
                return (
                  <li key={credit.id} className="rounded-lg border-slate-950 border-b border-r group cursor-pointer">
                    <Link href={`/person/${credit.id}`} className="flex flex-row gap-2" prefetch={false}>
                      <FallbackPersonImage
                        profile_path={credit.profile_path}
                        gender={credit.gender}
                        src={`https://image.tmdb.org/t/p/w92${credit.profile_path}`}
                        alt={`Profile Photo - ${credit.name}`}
                        crossOrigin=""
                        height={smallPreferredProfileSize.height}
                        width={smallPreferredProfileSize.width}
                        priority={false}
                        className="w-smProfile max-w-smProfile h-smProfile max-h-smProfile rounded-lg shrink-0"
                      />
                      <div className="group-hover:underline underline-offset-2 p-2">
                        <p className="text-lg font-bold">{credit.name}</p>
                        <p className="text-sm px-2">{credit.jobs.join(", ")}</p>
                      </div>
                    </Link>
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
