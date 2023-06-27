import getPersonDetails from "@/lib/TMDB/getPersonDetails";
import getPersonMovieCredits from "@/lib/TMDB/getPersonMovieCredits";
import ImageWithFallback from "@/lib/sharedComponents/FallbackImage";
import MainContainer from "@/lib/sharedComponents/MainContainer";
import { preferredProfileSize } from "@/lib/utils/preferredProfileSize";
import { notFound } from "next/navigation";
import Link from "next/link";
import LinkIcon from "@/lib/sharedComponents/Icons/LinkIcon";

type Props = {
  params: {
    personID: string;
  };
};

export default async function CastPage({ params: { personID } }: Props) {
  const id = Number.parseInt(personID);
  if (Number.isNaN(id)) {
    notFound();
  }
  const [fetchedPersonDetails, fetchedPersonCredits] = await Promise.all([
    getPersonDetails(id),
    getPersonMovieCredits(id),
  ]);
  const details = (() => {
    return fetchedPersonDetails.succeeded ? fetchedPersonDetails.data : null;
  })();
  const credits = (() => {
    return fetchedPersonCredits.succeeded ? fetchedPersonCredits.data : null;
  })();
  const content = (() => {
    if (details == null || credits == null) {
      notFound();
    }
    return (
      <>
        <h1 className="text-3xl font-bold mt-4 text-center w-full md:text-left">{details.name}</h1>
        <section className="flex flex-row gap-6 flex-wrap md:justify-start justify-center my-4">
          <div className="h-poster max-h-poster w-poster max-w-poster">
            <ImageWithFallback
              src={`https://image.tmdb.org/t/p/w185/${details.profile_path}`}
              alt={`Profile Photo for ${details.name}`}
              height={preferredProfileSize.height}
              width={preferredProfileSize.width}
              priority={true}
              crossOrigin=""
              className="rounded-lg"
            />
          </div>

          <div className="flex flex-row flex-nowrap gap-6">
            {details.birthday ||
            details.deathday ||
            details.known_for_department ||
            details.place_of_birth ||
            details.homepage ? (
              <div>
                {details.known_for_department ? (
                  <div>
                    <h2 className="font-bold">Known For:</h2>
                    <p className="px-2 text-sm">{details.known_for_department}</p>
                  </div>
                ) : undefined}
                {details.birthday ? (
                  <div>
                    <h2 className="font-bold">Born:</h2>
                    <p className="px-2 text-sm">
                      {new Date(details.birthday).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                ) : undefined}
                {details.deathday ? (
                  <div>
                    <h2 className="font-bold">Died:</h2>
                    <p className="px-2 text-sm">
                      {new Date(details.deathday).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                ) : undefined}
                {details.place_of_birth ? (
                  <div>
                    <h2 className="font-bold">Place of Birth:</h2>
                    <p className="px-2 text-sm">{details.place_of_birth}</p>
                  </div>
                ) : undefined}
                {details.homepage ? (
                  <div>
                    <h2 className="font-bold">Homepage:</h2>
                    <p className="px-2 text-sm">{details.homepage}</p>
                  </div>
                ) : undefined}
              </div>
            ) : undefined}
            {details.also_known_as.length > 0 ? (
              <div>
                <h2 className="font-bold">Also Known As:</h2>
                <ul>
                  {details.also_known_as.map((alias, idx) => (
                    <li className="text-sm px-2" key={idx}>
                      {alias}
                    </li>
                  ))}
                </ul>
              </div>
            ) : undefined}
          </div>
        </section>
        {details.biography !== null && details.biography !== "" ? (
          <section className="my-4">
            <h2 className="text-2xl my-2 font-bold px-2">Overview:</h2>
            <div>
              {details.biography.split("\n").map((chunk, idx) => (
                <p className="text-sm indent-4 px-2 py-0.5" key={idx}>
                  {chunk}
                </p>
              ))}
            </div>
          </section>
        ) : undefined}
        {/* CAST CREDITS */}
        {credits.cast.length > 0 ? (
          <section className="my-4 p-2 rounded-lg">
            <h2 className="text-2xl my-2 font-bold">As Cast:</h2>
            <ul className="flex flex-col gap-1 max-h-96 overflow-x-hidden mx-10 py-2 bg-slate-400/10">
              {credits.cast
                .map((credit) => {
                  return { ...credit, release_date: credit.release_date !== "" ? new Date(credit.release_date) : null };
                })
                .sort((a, b) => {
                  if (a.release_date instanceof Date && b.release_date instanceof Date) {
                    return a.release_date > b.release_date ? -1 : 1;
                  } else if (a.release_date instanceof Date) {
                    return -1;
                  } else if (b.release_date instanceof Date) {
                    return 1;
                  }
                  return 0;
                })
                .map((credit) => {
                  return (
                    <li
                      key={credit.id}
                      className="mx-2 p-2 even:bg-stone-900/10 even:hover:bg-stone-900/30 odd:bg-slate-900/20 odd:hover:bg-slate-900/40 rounded-lg shadow-sm shadow-black flex flex-row flex-wrap items-end"
                    >
                      <div className="flex flex-col flex-1">
                        <h3 className="font-bold">{`${credit.title}${
                          credit.release_date ? ` (${credit.release_date.getFullYear()})` : ""
                        }`}</h3>
                        <p className="text-sm px-2">{credit.character}</p>
                      </div>
                      <div className="basis-auto flex flex-row items-center gap-2">
                        <Link className="group" href={`/movie/${credit.id}`}>
                          <LinkIcon />
                          <span className="hover:underline text-sm inline-block ml-1 group-hover:underline">
                            Movie Page
                          </span>
                        </Link>
                      </div>
                    </li>
                  );
                })}
            </ul>
          </section>
        ) : undefined}
        {/* CREW CREDITS */}
        {credits.crew.length > 0 ? (
          <section className="my-4 p-2 rounded-lg">
            <h2 className="text-2xl my-2 font-bold">As Crew:</h2>
            <ul className="flex flex-col gap-1 max-h-96 overflow-x-hidden mx-10 py-2 bg-slate-400/10">
              {credits.crew
                .map((credit) => {
                  return { ...credit, release_date: credit.release_date !== "" ? new Date(credit.release_date) : null };
                })
                .sort((a, b) => {
                  if (a.release_date instanceof Date && b.release_date instanceof Date) {
                    return a.release_date > b.release_date ? -1 : 1;
                  } else if (a.release_date instanceof Date) {
                    return -1;
                  } else if (b.release_date instanceof Date) {
                    return 1;
                  }
                  return 0;
                })
                .map((credit) => {
                  return (
                    <li
                      key={credit.id}
                      className="mx-2 p-2 even:bg-stone-900/10 even:hover:bg-stone-900/30 odd:bg-slate-900/20 odd:hover:bg-slate-900/40 rounded-lg shadow-sm shadow-black flex flex-row flex-wrap items-end"
                    >
                      <div className="flex flex-col flex-1">
                        <h3 className="font-bold">{`${credit.title}${
                          credit.release_date ? ` (${credit.release_date.getFullYear()})` : ""
                        }`}</h3>
                        <p className="text-sm px-2">{credit.job}</p>
                      </div>
                      <div className="basis-auto flex flex-row items-center gap-2">
                        <Link className="group" href={`/movie/${credit.id}`}>
                          <LinkIcon />
                          <span className="hover:underline text-sm inline-block ml-1 group-hover:underline">
                            Movie Page
                          </span>
                        </Link>
                      </div>
                    </li>
                  );
                })}
            </ul>
          </section>
        ) : undefined}
      </>
    );
  })();
  return <MainContainer>{content}</MainContainer>;
}
