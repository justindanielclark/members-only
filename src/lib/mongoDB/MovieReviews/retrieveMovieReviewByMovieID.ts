import { getMovieReviewsCollection } from "./_movieReviews";
export default async function retrieveMovieReviewByMovieID(movieID: number) {
  const collection = await getMovieReviewsCollection();
  const result = await collection.findOne({ movie: movieID });
  return result;
}
