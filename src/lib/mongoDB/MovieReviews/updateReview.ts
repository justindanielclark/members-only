import { ObjectId } from "mongodb";
import { getMovieReviewsCollection } from "./_movieReviews";
import { MovieReview } from "../../../../types/types";

export default async function updateReview(movieReviewID: ObjectId, movieReview: MovieReview) {
  const collection = await getMovieReviewsCollection();
  const result = await collection.replaceOne({ _id: movieReviewID }, { ...movieReview });
  return result;
}
