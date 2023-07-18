"use client";
import { useState } from "react";
import SectionContainer from "./Containers/SectionContainer";
import Link from "next/link";

type Props = {
  lastSearch: string;
};

const invalidChars = "'\"\\}]{[:;/?.>,<)(";
const invalidSearchTerms = new Map<string, boolean>(invalidChars.split("").map((char) => [char, true]));
const validSearchLength = (term: string): number => {
  const termChars = term.split("");
  return termChars.reduce((acc, cur) => {
    if (invalidSearchTerms.get(cur) === undefined) {
      acc.push(cur);
    }
    return acc;
  }, [] as Array<string>).length;
};

export default function SearchBar({ lastSearch }: Props) {
  const [searchTerm, setSearchTerm] = useState(lastSearch);
  const generateSearchURL = (searchTerm: string) => {
    const searchParams = new URLSearchParams();
    searchParams.append("page", "1");
    searchParams.append("query", searchTerm);
    console.log(`/search?${searchParams.toString()}`);
    return `/search?${searchParams.toString()}`;
  };
  return (
    <SectionContainer id="searchBar">
      <form role="navigation" className="w-full p-4">
        <h1 className="text-2xl text-center">
          Millions of movies to discover. <span className="font-bold block sm:inline">Explore now.</span>
        </h1>
        <div className="flex flex-row flex-wrap sm:rounded-r-full sm:rounded-l-full overflow-hidden max-w-lg mx-auto mt-4">
          <input
            className="flex-1 px-4 py-1 text-black ring-0 active:ring-0 focus:ring-0 outline-none active:outline-none focus:outline-none"
            type="text"
            placeholder="Search by movie title..."
            onChange={(e) => {
              setSearchTerm(e.target.value);
            }}
            value={searchTerm}
          />
          {validSearchLength(searchTerm) > 0 ? (
            <Link
              href={generateSearchURL(searchTerm)}
              role="navigation"
              className="inline-block sm:w-24 w-full bg-green-800 px-2 py-1"
            >
              Search
            </Link>
          ) : (
            <button
              role="navigation"
              className="inline-block sm:w-24 w-full bg-green-800 px-2 py-1"
              onClick={(e) => {}}
            >
              Search
            </button>
          )}
        </div>
      </form>
    </SectionContainer>
  );
}
