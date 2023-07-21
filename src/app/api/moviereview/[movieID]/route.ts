import _mongo from "@/lib/mongoDB/_mongo";
import { NextRequest, NextResponse } from "next/server";
import { NextURL } from "next/dist/server/web/next-url";

type PostParams = {
  params: {
    movieID: string;
  };
};

export async function POST(req: NextRequest, { params: { movieID } }: PostParams) {
  const url = req.nextUrl;
  const newURL = new NextURL(url.origin);
  console.log(url);
  console.log(movieID);
  const formBody = await req.formData();
  const movie_title = formBody.get("movie_title");
  const movie_score = formBody.get("movie_score");
  const movie_content = formBody.get("movie_content");

  console.log(formBody);
  return NextResponse.redirect(newURL);
}
