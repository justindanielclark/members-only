import { ObjectId } from "mongodb";
import { getMovieReviewsCollection } from "./_movieReviews";
export default async function retrieveMovieReviewByReviewID(reviewID: string) {
  const collection = await getMovieReviewsCollection();
  const result = await collection.findOne({ _id: new ObjectId(reviewID) });
  return result;
}
