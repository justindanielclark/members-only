const searchURL = "https://api.themoviedb.org/3/search/movie?include_adult=false&language=en-US&page=";
const options: RequestInit = {
  method: "GET",
  headers: new Headers([
    ["accept", "application/json"],
    [
      "Authorization",
      //!
    ],
  ]),
};
async function getPopularMovies() {
  const result = await fetch(`${searchURL}${1}`, options);
  return await result.json();
}

async function main() {
  const result = await getPopularMovies();
  console.log(result);
}

main();
