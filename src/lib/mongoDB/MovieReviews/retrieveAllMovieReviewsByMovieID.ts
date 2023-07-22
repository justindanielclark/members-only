import { ObjectId } from "mongodb";
import { getMovieReviewsCollection } from "./_movieReviews";
export default async function retriveAllMovieReviewsByMovieID(movieID: number) {
  const collection = await getMovieReviewsCollection();
  const results = await collection.find({ movie: movieID }).toArray();
  return results;
}
