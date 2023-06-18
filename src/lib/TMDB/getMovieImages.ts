export default async function getMovieImages(movieID: number): Promise<MovieImages | null> {
  const search = new URL("https://api.themoviedb.org");
  search.pathname = `/3/movie/${movieID}/images`;
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
      return await response.json();
    }
    return null;
  } catch {
    return null;
  }
}
