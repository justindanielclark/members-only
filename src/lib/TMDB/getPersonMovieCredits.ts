export default async function getPersonMovieCredits(personID: number): Promise<FetchedData<MovieCredits>> {
  const search = new URL("https://api.themoviedb.org");
  search.pathname = `/3/person/${personID}/movie_credits`;
  search.searchParams.set("language", "en-US");

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
      const data = (await response.json()) as MovieCredits;
      return {
        succeeded: true,
        data,
      };
    }
    return {
      succeeded: false,
      data: null,
    };
  } catch {
    return {
      succeeded: false,
      data: null,
    };
  }
}
