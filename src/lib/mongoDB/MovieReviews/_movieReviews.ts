import { MovieReview } from "../../../../types/types";
import getMovieDatabaseCollection from "../getMovieDatabaseCollection";
import createMovieReview from "./createMovieReview";
import deleteMovieReview from "./deleteMovieReview";
import retrieveMovieReview from "./retrieveMovieReview";
import retrieveMovieReviewByMovieID from "./retrieveMovieReviewByMovieID";

export async function getMovieReviewsCollection() {
  const database = await getMovieDatabaseCollection();
  try {
    return database.collection<MovieReview>("Movie Reviews");
  } catch {
    throw new Error("Unable to grab Friend Requests collection in getFriendRequests.ts");
  }
}

const exportable = {
  createMovieReview,
  deleteMovieReview,
  retrieveMovieReview,
  retrieveMovieReviewByMovieID,
};

export default exportable;
