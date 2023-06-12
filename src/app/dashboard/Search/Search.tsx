export default function Search() {
  return (
    <section className="relative h-48">
      <form action="" className="w-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <h1 className="font-bold text-2xl">Millions of movies, TV Shows and people to discover. Explore now.</h1>
        <div className="flex flex-row rounded-r-full rounded-l-full overflow-hidden max-w-lg mx-auto mt-4">
          <input
            className="inline-block basis-full px-4 py-1 text-black ring-0 active:ring-0 focus:ring-0 outline-none active:outline-none focus:outline-none"
            type="text"
            placeholder="Search by movie title..."
          />
          <button className="inline-block basis-24 bg-green-800 px-2 py-1">Search</button>
        </div>
      </form>
    </section>
  );
}
