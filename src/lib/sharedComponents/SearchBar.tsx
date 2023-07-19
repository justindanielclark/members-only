"use client";
import { useState } from "react";
import SectionContainer from "./Containers/SectionContainer";
import Link from "next/link";

const invalidCharsString = "[({</.,;:'\"`|-_+=*^%$#@&!\\>})] ";
const invalidChars = new Map<string, true>(invalidCharsString.split("").map((char) => [char, true]));

const hasValidChars = (term: string): boolean => {
  let result = false;
  for (let i = 0; i < term.length; i++) {
    if (invalidChars.get(term.substring(i, i + 1)) == undefined) {
      result = true;
      break;
    }
  }
  return result;
};

export default function SearchBar() {
  const [searchTerm, setSearchTerm] = useState("");
  const [displayWarning, setDisplayWarning] = useState<boolean>(false);
  const generateSearchURL = (searchTerm: string) => {
    const searchParams = new URLSearchParams();
    searchParams.append("page", "1");
    searchParams.append("query", searchTerm);
    return `/search?${searchParams.toString()}`;
  };
  return (
    <SectionContainer id="searchBar">
      <form role="navigation" className="w-full px-4">
        <h1 className="text-2xl text-center">
          Millions of movies to discover. <span className="font-bold block sm:inline">Explore now.</span>
        </h1>
        <div className="flex flex-col mx-auto max-w-xl px-4 pt-4">
          <div className={`flex flex-row items-center ${displayWarning ? "pb-0" : "pb-10"}`}>
            <input
              className="flex-1 py-1 px-2 rounded-tl-lg rounded-bl-lg outline-1 outline-none text-black"
              type="text"
              placeholder="Search by movie title..."
              onChange={(e) => {
                setSearchTerm(e.target.value);
                if (e.target.value !== "" && !hasValidChars(e.target.value)) {
                  setDisplayWarning(true);
                } else {
                  if (displayWarning) {
                    setDisplayWarning(false);
                  }
                }
              }}
              value={searchTerm}
            />
            <Link
              href={generateSearchURL(searchTerm)}
              role="navigation"
              className="bg-green-800 py-1 px-2 rounded-tr-lg rounded-br-lg"
              onClick={(e) => {
                if (!hasValidChars) {
                  e.preventDefault();
                  setDisplayWarning(true);
                  return;
                }
              }}
            >
              Search
            </Link>
          </div>
          {displayWarning ? (
            <p className="h-10 max-h-10 text-xs flex flex-row justify-center flex-wrap items-end text-red-200">
              <span className="block font-bold whitespace-nowrap px-1 underline underline-offset-1">
                Searches Must Include Terms Other Than:
              </span>
              <span className="block whitespace-nowrap px-1">{`${invalidCharsString
                .split("")
                .join(" ")} or empty spaces`}</span>
            </p>
          ) : undefined}
        </div>
      </form>
    </SectionContainer>
  );
}
