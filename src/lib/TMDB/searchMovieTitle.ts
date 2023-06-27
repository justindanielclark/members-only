export const nothingFound: searchResults = {
  page: 0,
  results: [],
  total_pages: 0,
  total_results: 0,
};

export default async function searchMovieTitle(query: string, page: number): Promise<searchResults> {
  const search = new URL("https://api.themoviedb.org");
  search.pathname = `/3/search/movie`;
  search.searchParams.set("query", query);
  search.searchParams.set("language", "en-US");
  search.searchParams.set("page", page.toString());

  const options: RequestInit = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: process.env.TMDB_AUTH_KEY as string,
    },
    next: {
      revalidate: 900,
    },
  };
  try {
    const response = await fetch(search, options);
    if (response.ok) {
      const data = (await response.json()) as searchResults;
      return data;
    }
    return nothingFound;
  } catch {
    return nothingFound;
  }
}
