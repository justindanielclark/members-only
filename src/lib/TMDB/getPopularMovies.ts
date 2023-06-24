// Returns Top 100 Movies Per TMDB's Current API As An Array
// Returns [] if any of the fetches fail

const search = new URL("https://api.themoviedb.org");
search.pathname = "/3/trending/movie/week";
search.searchParams.set("include_adult", "false");
search.searchParams.set("language", "en-US");

const options: RequestInit = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: process.env.TMDB_AUTH_KEY as string,
  },
  next: {
    revalidate: 86400,
  },
};
export default async function getPopularMovies(): Promise<Array<FetchedMovie>> {
  console.log("getPopularMovies is Running");
  try {
    const fetches: Array<Promise<Response>> = [];
    for (let i = 1; i <= 5; i++) {
      const newURL = new URL(search);
      newURL.searchParams.set("page", i.toString());
      fetches.push(fetch(newURL, options));
    }
    const fetchedData = await Promise.all(fetches);

    const jsonData = (await Promise.all(
      fetchedData.map((res) => {
        if (res.ok) {
          return res.json();
        }
        return null;
      })
    )) as Array<FetchedPopularMovies | null>;
    console.log("getPopularMovies has Ran");
    return jsonData.reduce((acc, cur) => {
      if (cur && cur.results) {
        cur.results.forEach((movie) => acc.push(movie));
      }
      return acc;
    }, [] as Array<FetchedMovie>);
  } catch {
    return [];
  }
  // return [];
}
