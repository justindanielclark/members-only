import { MovieReview } from "../../../types/types";

export default async function addMovieReview(movieReview: MovieReview) {
  return await fetch(`/api/moviereview/${movieReview.movie}`, {
    method: "POST",
    body: JSON.stringify(movieReview),
  });
}
