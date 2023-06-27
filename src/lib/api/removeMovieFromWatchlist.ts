export default async function removeMovieFromWatchlist({ movieID, lookup }: Omit<WatchListRemoveMovieRequest, "type">) {
  const body: WatchListRemoveMovieRequest = {
    type: "Remove",
    lookup,
    movieID,
  };
  return await fetch("/api/watchlist", {
    method: "PUT",
    body: JSON.stringify(body),
  });
}
