import getSessionOnServer from "@/lib/providers/getSessionOnServer";
import { redirect } from "next/navigation";
import MainContainer from "@/lib/sharedComponents/MainContainer";
import Link from "next/link";
import searchMovieTitle, { nothingFound } from "@/lib/TMDB/searchMovieTitle";
import Image from "next/image";
import { preferredPosterSize } from "@/lib/utils/preferredPosterSize";

type UnconfirmedSearchParameters = {
  page?: number;
  query?: string;
};
type SearchParameters = {
  page: number;
  query: string;
};
type Props = {
  searchParams: { [key: string]: string | string[] | undefined };
};

function confirmSearchParams(usp: UnconfirmedSearchParameters): SearchParameters | null {
  if (usp.page && usp.query && usp.query !== "") {
    return usp as SearchParameters;
  }
  return null;
}

export default async function Search({ searchParams }: Props) {
  const session = await getSessionOnServer();
  if (!session) {
    redirect("/");
  }
  const confirmedParams = confirmSearchParams(searchParams);
  const movies = await (async () => {
    if (confirmedParams) {
      return await searchMovieTitle(confirmedParams.query, confirmedParams.page);
    }
    return nothingFound;
  })();
  const content = (() => {
    if (confirmedParams === null) {
      return (
        <>
          <p>Unable to process a request for search without being provided search parameters.</p>
          <Link href={"/dashboard"}>
            <p>Click me to return to the dashboard</p>
          </Link>
        </>
      );
    }
    return (
      //Search Params are Validclas
      <>
        <h1 className="text-2xl">
          Search Results for <span className="font-bold">{confirmedParams.query}</span>
        </h1>
        <section>
          {movies.results.map((movie) => {
            return (
              <article key={movie.id} className="flex flex-row">
                <div className="h-fit w-fit basis-fit">
                  <Image
                    src={`https://image.tmdb.org/t/p/w185/${movie.poster_path}`}
                    alt={movie.title}
                    crossOrigin=""
                    width={preferredPosterSize.width}
                    height={preferredPosterSize.height}
                    priority={true}
                    className="h-poster w-poster max-h-poster max-w-poster"
                  />
                </div>
                <div>
                  <h2>{movie.title}</h2>
                  <p>{movie.release_date}</p>
                  <p>{movie.overview}</p>
                </div>
              </article>
            );
          })}
        </section>
      </>
    );
  })();

  return <MainContainer>{content}</MainContainer>;
}
