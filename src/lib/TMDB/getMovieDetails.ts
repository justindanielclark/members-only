export default async function getMovieDetails(movieID: number): Promise<MovieDetails | FetchMessage> {
  const search = new URL("https://api.themoviedb.org");
  search.pathname = `/3/movie/${movieID}`;
  search.searchParams.set("language", "en-US");

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
      return await response.json();
    }
    return {
      message: "There was an error retrieving the requested movie's details from the database",
      statusCode: response.status,
    };
  } catch {
    return {
      message: "The request to the server for the requested movie's details has failed",
      statusCode: 500,
    };
  }
}
