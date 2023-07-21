import { ObjectId } from "mongodb";
import { getMovieReviewsCollection } from "./_movieReviews";
export default async function deleteMovieReview(reviewID: string) {
  const collection = await getMovieReviewsCollection();
  const result = collection.deleteOne({ _id: new ObjectId(reviewID) });
  return result;
}
