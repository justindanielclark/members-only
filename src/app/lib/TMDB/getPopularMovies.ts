const searchURL = "https://api.themoviedb.org/3/search/movie?include_adult=false&language=en-US&page=";
const options: RequestInit = {
  method: "GET",
  headers: new Headers([
    ["accept", "application/json"],
    ["Authorization", process.env.TMDB_AUTH_KEY as string],
  ]),
};
export default async function getPopularMovies() {
  const searches = new Array(10).map((item, idx) => fetch(`${searchURL}${idx + 1}`, options));
  const result = await Promise.all(searches);
  return result;
}
