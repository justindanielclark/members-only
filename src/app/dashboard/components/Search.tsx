"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
export default function Search() {
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();
  return (
    <section className="relative h-48">
      <form role="navigation" className="w-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-4">
        <h1 className="text-2xl text-center">
          Millions of movies to discover. <span className="font-bold block sm:inline">Explore now.</span>
        </h1>
        <div className="flex flex-row sm:rounded-r-full sm:rounded-l-full overflow-hidden max-w-lg mx-auto mt-4">
          <input
            className="inline-block basis-full px-4 py-1 text-black ring-0 active:ring-0 focus:ring-0 outline-none active:outline-none focus:outline-none"
            type="text"
            placeholder="Search by movie title..."
            onChange={(e) => {
              setSearchTerm(e.target.value);
            }}
            value={searchTerm}
          />
          <button role="navigation" className="inline-block basis-24 bg-green-800 px-2 py-1" onClick={(e)=>{
            e.preventDefault();
            if(searchTerm !== "" && searchTerm.split('').reduce((acc, cur)=>{
              if(cur !== " "){
                acc += cur;
              }
              return acc;
            }, "") !== ""){
              const newURL = new URL(window.location.host);
              newURL.searchParams.set('page', '1')
              newURL.searchParams.set('query', searchTerm)
              router.push(`/search?${newURL.searchParams.toString()}`)
            }
            return false;
          }}>
              Search
            </button>
        </div>
      </form>
    </section>
  );
}
