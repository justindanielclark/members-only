import { MovieReview } from "../../../../types/types";
import getMovieDatabaseCollection from "../getMovieDatabaseCollection";
import createMovieReview from "./createMovieReview";
import deleteMovieReview from "./deleteMovieReview";
import retriveAllMovieReviewsByMovieID from "./retrieveAllMovieReviewsByMovieID";
import retrieveMovieReviewByUserIDAndMovieID from "./retrieveMovieReviewByUserIDAndMovieID";
import retrieveMovieReviewByReviewID from "./retrieveMovieReviewByReviewID";
import updateMovieReview from "./updateReview";

export async function getMovieReviewsCollection() {
  const database = await getMovieDatabaseCollection();
  try {
    return database.collection<MovieReview>("Movie Reviews");
  } catch {
    throw new Error("Unable to grab Movie Reviews collection in _movieReviews.ts");
  }
}

const exportable = {
  createMovieReview,
  deleteMovieReview,
  updateMovieReview,
  retriveAllMovieReviewsByMovieID,
  retrieveMovieReviewByReviewID,
  retrieveMovieReviewByUserIDAndMovieID,
};

export default exportable;
