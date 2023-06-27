export default async function addMovieToSeenList({ movieID, lookup }: Omit<SeenlistAddMovieRequest, "type">) {
  const body: SeenlistAddMovieRequest = {
    type: "Add",
    lookup,
    movieID,
  };
  return await fetch("/api/seenlist", {
    method: "PUT",
    body: JSON.stringify(body),
  });
}
