import getSessionOnServer from "@/lib/providers/getSessionOnServer";
import { redirect } from "next/navigation";
import MainContainer from "@/lib/sharedComponents/MainContainer";
import Link from "next/link";
import searchMovieTitle, { nothingFound } from "@/lib/TMDB/searchMovieTitle";
import SearchBar from "@/lib/sharedComponents/SearchBar";
import Result from "./component/Result";
import _mongo from "@/lib/mongoDB/_mongo";
import UserContext from "@/lib/providers/UserProvider";

type UnconfirmedSearchParameters = {
  page?: string;
  query?: string;
};
type SearchParameters = {
  page: number;
  query: string;
};
type Props = {
  searchParams: { [key: string]: string | string[] | undefined };
};

const PAGINATION_SPREAD = 5;

function confirmSearchParams(usp: UnconfirmedSearchParameters): SearchParameters | null {
  if (usp.page && usp.query && usp.query !== "") {
    const pageConversion = Number.parseInt(usp.page);
    if (Number.isNaN(pageConversion)) {
      return null;
    }
    return {
      page: pageConversion,
      query: usp.query,
    };
  }
  return null;
}

export default async function Search({ searchParams }: Props) {
  const session = await getSessionOnServer();
  if (!session) {
    redirect("/");
  }
  const confirmedParams = confirmSearchParams(searchParams);
  const [movies, user] = await Promise.all([
    (async () => {
      if (confirmedParams) {
        return await searchMovieTitle(confirmedParams.query, confirmedParams.page);
      }
      return nothingFound;
    })(),
    _mongo.user.retrieveUser(session.user.email as string, session.user.provider as string),
  ]);
  const movieMap = new Map<number, FetchedMovie>();
  movies.results.forEach((movie) => movieMap.set(movie.id, movie as FetchedMovie));
  if (user) {
    const pagination: JSX.Element | undefined = (() => {
      if (confirmedParams) {
        if (confirmedParams.page <= 0) {
          return undefined;
        }
        if (confirmedParams.page > movies.total_pages) {
          return undefined;
        }

        const lowerLimit = Math.max(1, confirmedParams.page - PAGINATION_SPREAD);
        const upperLimit = Math.min(movies.total_pages, confirmedParams.page + PAGINATION_SPREAD);
        const content = [];
        for (let i = lowerLimit; i <= upperLimit; i++) {
          content.push(
            <Link
              href={`/search?page=${i}&query=${encodeURIComponent(confirmedParams.query)}`}
              scroll={true}
              className={`p-1${i === confirmedParams.page ? " font-bold text-[#FFFF00]" : ""}`}
            >
              {i}
            </Link>
          );
          if (i < upperLimit) {
            content.push(<span className="p-1">{`/`}</span>);
          }
        }
        return <section className="w-full flex flex-row justify-center mb-4">{content}</section>;
      }
      return undefined;
    })();
    const content = (() => {
      //Search Params are invalid
      if (confirmedParams === null) {
        return (
          <>
            <p>Unable to process a request for search without being provided search parameters.</p>
            <Link href={"/dashboard"} className="underline">
              <p>Click me to return to the dashboard</p>
            </Link>
          </>
        );
      }
      return (
        //Search Params are Valid
        <>
          <SearchBar lastSearch={confirmedParams.query} />
          <section className="mt-4 px-2 flex flex-row justify-between items-center">
            <h1 className="text-2xl w-fit">
              Search Results for <span className="font-bold">{confirmedParams.query}</span>
            </h1>
            <div className="flex flex-col text-xs justify-end">
              <p className="text-right">{movies.total_results} Results</p>
              {movies.total_results > 0 && confirmedParams.page > 0 && confirmedParams.page <= movies.total_pages ? (
                <p className="text-right">
                  Showing {(confirmedParams.page - 1) * 20 + 1}-
                  {confirmedParams.page * 20 > movies.total_results ? movies.total_results : confirmedParams.page * 20}{" "}
                </p>
              ) : undefined}
            </div>
          </section>
          <section className="flex flex-col sm:gap-2 mt-4 sm:mb-4">
            <UserContext user={user} movieMap={movieMap}>
              {movies.results.length > 0 ? (
                movies.results.map((movie) => <Result movie={movie} key={movie.id} />)
              ) : (
                <>
                  <p className="px-4">It doesn{"'"}t look like we can find any movies with that Search Term</p>
                  <Link href={"/dashboard"} className="underline px-4">
                    Click Here To Get Back To Your Dashboard
                  </Link>
                </>
              )}
            </UserContext>
          </section>
          {movies.total_pages > 1 ? pagination : undefined}
        </>
      );
    })();

    return <MainContainer>{content}</MainContainer>;
  } else {
    return (
      <MainContainer>
        <h1 className="mt-8">Unable To Load User Data From Server, Please Retry Again Later...</h1>
      </MainContainer>
    );
  }
}
