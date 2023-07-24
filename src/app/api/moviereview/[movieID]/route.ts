import _mongo from "@/lib/mongoDB/_mongo";
import { NextRequest, NextResponse } from "next/server";
import { API_Response, MovieReview } from "../../../../../types/types";
import { ObjectId, WithId } from "mongodb";

type API_Params = {
  params: {
    movieID: string;
  };
};

export async function GET(
  req: NextRequest,
  { params: { movieID } }: API_Params
): Promise<NextResponse<API_Response<Array<WithId<MovieReview>>>>> {
  const id = parseInt(movieID);
  if (Number.isNaN(id)) {
    const message = "Submitted MovieID must be a Int Number";
    return NextResponse.json({ message: message, data: undefined }, { status: 400, statusText: message });
  }
  try {
    const results = await _mongo.movieReviews.retriveAllMovieReviewsByMovieID(id);
    const message = "Request Complete!";
    return NextResponse.json({ message: message, data: results }, { status: 200, statusText: message });
  } catch {
    const message = "Internal Server Error. Please Try Again Later...";
    return NextResponse.json({ message: message, data: undefined }, { status: 500, statusText: message });
  }
}

export async function POST(req: NextRequest, { params: { movieID } }: API_Params) {
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
