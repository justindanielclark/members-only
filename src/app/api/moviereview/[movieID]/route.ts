import _mongo from "@/lib/mongoDB/_mongo";
import { NextRequest, NextResponse } from "next/server";
import { MovieReview } from "../../../../../types/types";
import { ObjectId } from "mongodb";

type PostParams = {
  params: {
    movieID: string;
  };
};

export async function POST(req: NextRequest, { params: { movieID } }: PostParams) {
  const data = (await req.json()) as MovieReview;
  data.date = new Date(data.date);
  if (!isValidMovieReview(data)) {
    return NextResponse.json(
      { message: "User Data Error/Incomplete" },
      { status: 400, statusText: "User Data Error/Incomplete" }
    );
  }
  try {
    const existingReview = await _mongo.movieReviews.retrieveMovieReviewByUserIDAndMovieID(data.user, data.movie);
    if (existingReview) {
      console.log("existingReview");
      const updatedReview = await _mongo.movieReviews.updateMovieReview(existingReview._id, data);
    } else {
      console.log("new Review");
      const newReview = await _mongo.movieReviews.createMovieReview(data);
    }
  } catch {
    return NextResponse.json({}, { status: 500, statusText: "Internal Server Error" });
  }
  return NextResponse.json({}, { status: 200, statusText: "Review Posted!" });
}

function isValidMovieReview(movieReview: MovieReview): boolean {
  const { content, date, movie, score, title, user } = movieReview;
  return !(
    content == undefined ||
    date == undefined ||
    movie == undefined ||
    score == undefined ||
    title == undefined ||
    title == "" ||
    user == undefined ||
    !ObjectId.isValid(user)
  );
}
