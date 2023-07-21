import { MovieReview } from "../../../../types/types";
import { getMovieReviewsCollection } from "./_movieReviews";
export default async function createMovieReview(movieReview: MovieReview) {
  const movieReviewsCollection = await getMovieReviewsCollection();
  const result = await movieReviewsCollection.insertOne({ ...movieReview });
  return result;
}
