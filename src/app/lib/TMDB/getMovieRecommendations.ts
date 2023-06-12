//Only returns up to 20 movie Recommendations at the time
export default async function getMovieImages(movieID: number, page: number = 1): Promise<Array<FetchedMovie>> {
  const search = new URL("https://api.themoviedb.org");
  search.pathname = `/3/movie/${movieID}/images`;
  search.searchParams.set("language", "en-US");
  search.searchParams.set("page", page.toString());

  const options: RequestInit = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: process.env.TMDB_AUTH_KEY as string,
    },
  };
  try {
    const response = await fetch(search, options);
    if (response.ok) {
      const data = (await response.json()) as Recommendation;
      if (data.results) {
        return data.results;
      }
      return [];
    }
    return [];
  } catch {
    return [];
  }
}
