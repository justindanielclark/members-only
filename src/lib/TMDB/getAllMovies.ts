export default async function getAllMovies(movieIDs: Array<number>): Promise<Array<FetchedMovie>> {
  const search = new URL("https://api.themoviedb.org");
  search.searchParams.set("language", "en-US");

  const options: RequestInit = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: process.env.TMDB_AUTH_KEY as string,
    },
  };
  try {
    const movies = await Promise.all(
      movieIDs.map(async (id) => {
        const newSearch = new URL(search);
        newSearch.pathname = `/3/movie/${id}`;
        const res = await fetch(newSearch, options);
        if (res.ok) {
          return res.json();
        } else {
          return null;
        }
      })
    );
    return movies.filter((movie) => movie !== null);
  } catch {
    return [];
  }
}
