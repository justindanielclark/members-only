export default async function removeMovieFromSeenlist({ movieID, lookup }: Omit<SeenListRemoveMovieRequest, "type">) {
  const body: WatchListRemoveMovieRequest = {
    type: "Remove",
    lookup,
    movieID,
  };
  return await fetch("/api/seenlist", {
    method: "PUT",
    body: JSON.stringify(body),
  });
}
