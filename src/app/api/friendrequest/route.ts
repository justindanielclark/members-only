import _mongo from "@/lib/mongoDB/_mongo";
import { NextRequest, NextResponse } from "next/server";
import { ObjectId, WithId, TransactionOptions } from "mongodb";
import { User } from "../../../../types/types";
import _mongoGetConnection from "@/lib/mongoDB/DbConnection";
import { getFriendRequestsCollection } from "@/lib/mongoDB/FriendRequests/_friendRequests";
import { getUserCollection } from "@/lib/mongoDB/User/_user";

const PossibleErrors = {
  unknownError: "Unknown Error",
  noDataForSenderID: "No Data For Sender ID",
  noDataForReceiverID: "Invalid User Profile ID Sent",
  noIDData: "No ID Data Passed To Server",
  noUserDataForID: "No User Found For That ID",
  requestAlreadySent: "User has previously requested this friendship",
  senderIDMatchesReceiverID: "Cannot Add Yourself As Friend",
  alreadyAFriend: "Cannot Add User Who Is Already A Friend",
} as const;

type PossibleError = (typeof PossibleErrors)[keyof typeof PossibleErrors];

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    let API_Res: API_Response<simpleMessage>;
    let Response_Init: ResponseInit;
    const data = (await req.json()) as FriendRequest_PostRequest;
    const { receiverUserID, senderUserID } = data;
    const receiverIDisBad = receiverUserID === "" || receiverUserID == undefined || !ObjectId.isValid(receiverUserID);
    const senderIDisBad = senderUserID === "" || senderUserID == undefined || !ObjectId.isValid(senderUserID);
    if (receiverIDisBad || senderIDisBad) {
      if (receiverIDisBad && senderIDisBad) throw new Error(PossibleErrors.noIDData);
      if (receiverIDisBad) throw new Error(PossibleErrors.noDataForReceiverID);
      if (senderIDisBad) throw new Error(PossibleErrors.noDataForSenderID);
    }
    if (receiverUserID == senderUserID) {
      throw new Error(PossibleErrors.senderIDMatchesReceiverID);
    }
    const [sender, receiver] = await Promise.all([
      _mongo.user.retrieveUserByID(senderUserID),
      _mongo.user.retrieveUserByID(receiverUserID),
    ]);
    if (sender !== null && receiver !== null) {
      const senderID = (sender as WithId<User>)._id.toString();
      const receiverID = (receiver as WithId<User>)._id.toString();
      const isExistingFriend = sender.friends.find((friend) => friend === receiverID);
      if (isExistingFriend) {
        throw new Error(PossibleErrors.alreadyAFriend);
      }
      const [outgoing, incoming] = await Promise.all([
        _mongo.friendRequests.retrieveSpecificFriendRequest(senderID, receiverID),
        _mongo.friendRequests.retrieveSpecificFriendRequest(receiverID, senderID),
      ]);
      if (outgoing) {
        API_Res = {
          message: "Failure",
          data: { message: "Friend Request Already Exists" },
        };
        Response_Init = {
          status: 400,
          statusText: "Friend Request Already Exists",
        };
      } else if (incoming) {
        const connection = await _mongoGetConnection.get();
        const _users = await getUserCollection();
        const _friendRequests = await getFriendRequestsCollection();
        const session = connection.startSession();
        const transactionOptions: TransactionOptions = {
          readPreference: "primary",
          readConcern: { level: "available" },
          writeConcern: { w: "majority" },
        };
        session.startTransaction(transactionOptions);
        await _friendRequests.deleteOne({ receiverID: incoming._id.toString() }, { session });
        await _users.updateOne({ _id: sender._id }, { $push: { friends: receiver._id.toString() } }, { session });
        await _users.updateOne({ _id: receiver._id }, { $push: { friends: sender._id.toString() } }, { session });
        await session.commitTransaction();

        API_Res = {
          message: "Success",
          data: { message: "Friend Added" },
        };
        Response_Init = {
          status: 200,
          statusText: "Friend Added!",
        };
      } else {
        const result = await _mongo.friendRequests.createFriendRequest(senderUserID, receiverUserID);
        API_Res = {
          message: "Success",
          data: { message: "Friend Request Created!", data: result.insertedId.toString() },
        };
        Response_Init = {
          status: 200,
          statusText: "Friend Request Created!",
        };
      }

      return NextResponse.json(API_Res, Response_Init);
    } else {
      API_Res = {
        message: "Failure",
        data: { message: "No Such User Exists For That ID" },
      };
      Response_Init = {
        status: 400,
        statusText: PossibleErrors.noUserDataForID,
      };
    }
    return NextResponse.json(API_Res, Response_Init);
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
          statusText: PossibleErrors.noDataForReceiverID,
        };
        API_Res.data.message = PossibleErrors.noDataForReceiverID;
        break;
      }
      case PossibleErrors.noDataForSenderID: {
        Response_Init = {
          status: 400,
          statusText: PossibleErrors.noDataForSenderID,
        };
        API_Res.data.message = PossibleErrors.noDataForSenderID;
        break;
      }
      case PossibleErrors.noIDData: {
        Response_Init = {
          status: 400,
          statusText: PossibleErrors.noIDData,
        };
        API_Res.data.message = PossibleErrors.noIDData;
        break;
      }
      case PossibleErrors.noUserDataForID: {
        Response_Init = {
          status: 400,
          statusText: PossibleErrors.noUserDataForID,
        };
        API_Res.data.message = PossibleErrors.noUserDataForID;
        break;
      }
      case PossibleErrors.senderIDMatchesReceiverID: {
        Response_Init = {
          status: 400,
          statusText: PossibleErrors.senderIDMatchesReceiverID,
        };
        API_Res.data.message = PossibleErrors.senderIDMatchesReceiverID;
        break;
      }
      case PossibleErrors.alreadyAFriend: {
        Response_Init = {
          status: 400,
          statusText: PossibleErrors.alreadyAFriend,
        };
        API_Res.data.message = PossibleErrors.alreadyAFriend;
        break;
      }
      default: {
        Response_Init = {
          status: 500,
          statusText: "Unknown Error",
        };
        API_Res.data.message = "Unknown Error";
      }
    }
    return NextResponse.json(API_Res, Response_Init);
  }
}
