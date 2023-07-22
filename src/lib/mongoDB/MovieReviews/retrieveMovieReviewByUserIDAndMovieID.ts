import { ObjectId } from "mongodb";
import { getMovieReviewsCollection } from "./_movieReviews";
export default async function retrieveMovieReviewByUserIDAndMovieID(userID: string, movieID: number) {
  const collection = await getMovieReviewsCollection();
  const result = await collection.findOne({ user: userID, movie: movieID });
  return result;
}
