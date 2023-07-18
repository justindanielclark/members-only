"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import SectionContainer from "./Containers/SectionContainer";

type Props = {
  lastSearch: string;
};

export default function SearchBar({ lastSearch }: Props) {
  const [searchTerm, setSearchTerm] = useState(lastSearch);
  const router = useRouter();
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
          <button
            role="navigation"
            className="inline-block sm:w-24 w-full bg-green-800 px-2 py-1"
            onClick={(e) => {
              e.preventDefault();
              if (
                searchTerm !== "" &&
                searchTerm.split("").reduce((acc, cur) => {
                  if (cur !== " ") {
                    acc += cur;
                  }
                  return acc;
                }, "") !== ""
              ) {
                const newURL = new URL(window.location.host);
                newURL.searchParams.set("page", "1");
                newURL.searchParams.set("query", searchTerm);
                router.push(`/search?${newURL.searchParams.toString()}`);
              }
            }}
          >
            Search
          </button>
        </div>
      </form>
    </SectionContainer>
  );
}
