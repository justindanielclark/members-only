import _mongo from "@/lib/mongoDB/_mongo";
import { NextRequest, NextResponse } from "next/server";

const PossibleErrors = {
  unknownError: "Unknown Error",
  noDataForSenderID: "No Data For Sender ID",
  noDataForReceiverID: "No Data For Receiver ID",
  noIDData: "No ID Data Passed To Server",
  noUserDataForID: "No User Found For That ID",
} as const;

type PossibleError = (typeof PossibleErrors)[keyof typeof PossibleErrors];

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const data = (await req.json()) as FriendRequestRequest;
    const { receiverUserID, senderUserID } = data;
    const receiverIDisBad = receiverUserID === "" || receiverUserID == undefined;
    const senderIDisBad = senderUserID === "" || senderUserID == undefined;
    if (receiverIDisBad || senderIDisBad) {
      if (receiverIDisBad && senderIDisBad) throw new Error(PossibleErrors.noIDData);
      if (receiverIDisBad) throw new Error(PossibleErrors.noDataForReceiverID);
      if (senderIDisBad) throw new Error(PossibleErrors.noDataForSenderID);
    }
    try {
      const [sender, receiver] = await Promise.all([
        _mongo.user.retrieveUserByID(senderUserID),
        _mongo.user.retrieveUserByID(receiverUserID),
      ]);

      //TODO: Verify existing requests don't already exist, verify a sender isn't sending to a person they are awaiting a response from

      await _mongo.friendRequests.createFriendRequest(senderUserID, receiverUserID);

      const API_Res: API_Response<simpleMessage> = {
        message: "Success",
        data: { message: "Friend Request Created!" },
      };
      return NextResponse.json(API_Res, { status: 200 });
    } catch {
      throw new Error(PossibleErrors.noUserDataForID);
    }
  } catch (error) {
    // UNHAPPY PATH
    let message: PossibleError = "Unknown Error";
    if (error instanceof Error) message = error.message as PossibleError;

    const API_Res: API_Response<simpleMessage> = {
      message: "Failure",
      data: { message: "" },
    };
    let Response_Init: ResponseInit;

    switch (message) {
      case PossibleErrors.noDataForReceiverID: {
        Response_Init = {
          status: 400,
        };
        API_Res.data.message = PossibleErrors.noDataForReceiverID;
      }
      case PossibleErrors.noDataForSenderID: {
        Response_Init = {
          status: 400,
        };
        API_Res.data.message = PossibleErrors.noDataForSenderID;
      }
      case PossibleErrors.noIDData: {
        Response_Init = {
          status: 400,
        };
        API_Res.data.message = PossibleErrors.noIDData;
      }
      case PossibleErrors.noUserDataForID: {
        Response_Init = {
          status: 400,
        };
        API_Res.data.message = PossibleErrors.noUserDataForID;
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
