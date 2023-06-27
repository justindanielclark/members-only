export default async function addMovieToWatchlist({ movieID, lookup }: Omit<WatchlistAddMovieRequest, "type">) {
  const body: WatchlistAddMovieRequest = {
    type: "Add",
    lookup,
    movieID,
  };
  return await fetch("/api/watchlist", {
    method: "PUT",
    body: JSON.stringify(body),
  });
}
