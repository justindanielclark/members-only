import _mongo from "@/lib/mongoDB/_mongo";
import { getUserListByName } from "@/lib/utils/getUserListByName";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest, res: NextResponse) {
  try {
    const data = (await req.json()) as SeenListRemoveMovieRequest | SeenlistAddMovieRequest;
    const { lookup, movieID } = data;
    const user = await _mongo.user.retrieveUserByLookup(lookup);
    if (user) {
      const seenList = [...getUserListByName(user, "Watched").movies];
      if (data.type == "Add") {
        //If Movie Does Not Exist In seenlist, Add it
        const index = seenList.findIndex((movie) => movie == movieID);
        if (index === -1) {
          seenList.push(movieID);
          await _mongo.user.updateUserSeenList(lookup, seenList);
        }
        const API_Res: API_Response<undefined> = {
          message: "Success",
          data: undefined,
        };
        return NextResponse.json(API_Res, { status: 200 });
      } else if (data.type == "Remove") {
        //Filter out Movie if it does exist in seenlist
        const moddedList = seenList.filter((movie) => movie !== movieID);
        await _mongo.user.updateUserSeenList(lookup, moddedList);
        const API_Res: API_Response<undefined> = {
          message: "Success",
          data: undefined,
        };
        return NextResponse.json(API_Res, { status: 200 });
      } else {
        throw new Error("Unsupported Request Type In PUT Request Body");
      }
    }
    throw Error("Unable to Find User");
  } catch {
    const API_Res: API_Response<undefined> = {
      message: "Failure",
      data: undefined,
    };
    return NextResponse.json(API_Res, { status: 500 });
  }
}
