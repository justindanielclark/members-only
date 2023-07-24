"use client";
import SearchBar from "@/lib/sharedComponents/SearchBar";
import SectionContainer from "@/lib/sharedComponents/Containers/SectionContainer";
import MainHeader from "@/lib/sharedComponents/Headers/MainHeader";
import UserContext from "@/lib/providers/UserProvider";
import { SearchParameters, User } from "../../../../types/types";
import Link from "next/link";
import Result from "./Result";

type Props = {
  confirmedParams: SearchParameters;
  movies: searchResults;
  movieMap: Map<number, FetchedMovie>;
  user: User;
};

const PAGINATION_SPREAD = 3;

export default function ValidParamsPage({ confirmedParams, movies, movieMap, user }: Props) {
  const { page, query } = confirmedParams;
  const pagination: JSX.Element | undefined = (() => {
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
      const ref = `/search?page=${i}&query=${encodeURIComponent(confirmedParams.query)}`;
      content.push(
        <a
          key={ref}
          className={`px-2 py-1 rounded-lg cursor-pointer hover:bg-slate-900/30${
            i === confirmedParams.page ? " font-bold text-[#FFFF00]" : ""
          }`}
          onClick={() => {
            window.location.href = ref;
          }}
        >
          {i}
        </a>
      );
      if (i < upperLimit) {
        content.push(<span key={"slash-" + ref} className="p-1">{`/`}</span>);
      }
    }
    return <section className="w-full flex flex-row justify-center mb-4">{content}</section>;
  })();
  return (
    <>
      <SearchBar />
      {/* SEARCH RESULTS SUMMARY */}
      <SectionContainer>
        <MainHeader>Search Results for:</MainHeader>
        <p key={confirmedParams.page} className="font-bold text-xl p-2">
          {query}
        </p>
        <div className="flex flex-col text-xs justify-end">
          <p className="text-right">{movies.total_results} Results</p>
          {movies.total_results > 0 && page > 0 && page <= movies.total_pages ? (
            <p className="text-right">
              Showing {(page - 1) * 20 + 1}-{page * 20 > movies.total_results ? movies.total_results : page * 20}{" "}
            </p>
          ) : undefined}
        </div>
      </SectionContainer>
      {/* RESULTS LIST */}
      <SectionContainer>
        <div className="flex flex-col gap-4 mt-4 sm:mb-4">
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
          {movies.total_pages > 1 ? pagination : undefined}
        </div>
      </SectionContainer>
    </>
  );
}
