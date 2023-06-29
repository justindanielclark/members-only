import _mongo from "@/lib/mongoDB/_mongo";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest, res: NextResponse) {
  try {
    const data = (await req.json()) as UpdateUserRequest;
    const { handle, aboutMe, lookup } = data;
    let sanitizedHandle, sanitizedAboutMe;
    if (handle.length > 20) {
      sanitizedHandle = handle.slice(0, 20);
    } else if (handle.length < 3) {
      throw new Error("Handle Too Short");
    } else {
      sanitizedHandle = handle;
    }
    if (aboutMe.length > 200) {
      sanitizedAboutMe = aboutMe.slice(0, 200);
    } else {
      sanitizedAboutMe = aboutMe;
    }

    await _mongo.user.updateUserProfile(lookup, sanitizedHandle, sanitizedAboutMe);

    const API_Res: API_Response<undefined> = {
      message: "Success",
      data: undefined,
    };
    return NextResponse.json(API_Res, { status: 200 });
  } catch (error) {
    let message = "Unknown Error";
    if (error instanceof Error) message = error.message;

    const API_Res: API_Response<undefined> = {
      message: "Failure",
      data: undefined,
    };
    let Response_Init: ResponseInit;

    switch (message) {
      case "Handle Too Short": {
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
