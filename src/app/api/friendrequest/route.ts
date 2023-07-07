import _mongo from "@/lib/mongoDB/_mongo";
import { NextRequest, NextResponse } from "next/server";

const PossibleErrors = ["Unknown Error", "No Data Provided for UserID", "No User Found For That ID"] as const;
type PossibleError = (typeof PossibleErrors)[number];

export async function POST(req: NextRequest, res: NextResponse) {
  console.log("Post request hit");
  try {
    const data = (await req.json()) as FriendRequestRequest;
    const { userID } = data;
    if (userID === "" || userID == undefined) {
      throw new Error("No Data Provided for UserID");
    }

    const retrievedUser = await _mongo.user.retrieveUserByID(userID);
    console.log("RETREIVED USER");
    console.log(retrievedUser);

    const API_Res: API_Response<undefined> = {
      message: "Success",
      data: undefined,
    };
    return NextResponse.json(API_Res, { status: 200 });
  } catch (error) {
    let message: PossibleError = "Unknown Error";
    if (error instanceof Error) message = error.message as PossibleError;

    const API_Res: API_Response<undefined> = {
      message: "Failure",
      data: undefined,
    };
    let Response_Init: ResponseInit;

    switch (message) {
      case "No Data Provided for UserID": {
        Response_Init = {
          status: 400,
        };
      }
      case "No User Found For That ID": {
        Response_Init = {
          status: 400,
        };
      }
      default: {
        Response_Init = {
          status: 500,
        };
      }
    }
    return NextResponse.json(API_Res, Response_Init);
  }
}
