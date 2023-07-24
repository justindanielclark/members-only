import { headers } from "next/dist/client/components/headers";

export default async function requestMovieReviewsByID(movieID: number) {
  const host = headers().get("host");
  const protocol = process?.env.NODE_ENV === "development" ? "http" : "https";
  return fetch(`${protocol}://${host}/api/moviereview/${movieID}`, { cache: "no-store" });
}
