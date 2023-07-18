import { NextRequest, NextResponse } from "next/server";
import { getFriendRequestsCollection } from "@/lib/mongoDB/FriendRequests/_friendRequests";
import { getUserCollection } from "@/lib/mongoDB/User/_user";
import _mongoGetConnection from "@/lib/mongoDB/DbConnection";
import { TransactionOptions, ObjectId } from "mongodb";
import { AcceptFriendRequest, RemoveFriendRequest } from "../../../../types/types";
import _mongo from "@/lib/mongoDB/_mongo";

const PossibleErrors = {
  Unable_To_Locate_Request_By_ID: "Unable to locate specific friend request. Server Failure",
  Unable_To_Locate_Users_By_ID: "Unable to loacate specific users for request. Server Failure",
  Unknown_Error: "Unknown Error. Server Failure",
} as const;
type PossibleError = (typeof PossibleErrors)[keyof typeof PossibleErrors];

export async function POST(req: NextRequest, res: NextResponse) {
  let API_Res: API_Response<simpleMessage> = {
    message: "Success",
    data: { message: "Friend Added" },
  };
  let Response_Init: ResponseInit = {
    status: 200,
    statusText: "Friend Added!",
  };
  const { requestID } = (await req.json()) as AcceptFriendRequest;
  const connection = await _mongoGetConnection.get();
  const _friendRequests = await getFriendRequestsCollection();
  const _users = await getUserCollection();
  const session = connection.startSession();
  const transactionOptions: TransactionOptions = {
    readPreference: "primary",
    readConcern: { level: "local" },
    writeConcern: { w: "majority" },
  };
  try {
    //Grab the Request and verify it exists
    const request = await _friendRequests.findOne({ _id: new ObjectId(requestID) });
    if (request === null) {
      throw new Error(PossibleErrors.Unable_To_Locate_Request_By_ID);
    }
    //Grab the Users and verify it exists
    const [sender, receiver] = await Promise.all([
      _users.findOne({ _id: new ObjectId(request.senderID) }),
      _users.findOne({ _id: new ObjectId(request.receiverID) }),
    ]);

    if (sender === null || receiver === null) {
      throw new Error(PossibleErrors.Unable_To_Locate_Users_By_ID);
    }
    //Complete Transaction
    session.startTransaction(transactionOptions);
    await _friendRequests.deleteOne({ _id: request._id }, { session });
    await _users.updateOne({ _id: sender._id }, { $push: { friends: receiver._id.toString() } }, { session });
    await _users.updateOne({ _id: receiver._id }, { $push: { friends: sender._id.toString() } }, { session });
    await session.commitTransaction();
  } catch (err) {
    let message = "";
    if (err instanceof Error) message = err.message;
    const ErrorValues = Object.values(PossibleErrors);
    if (!ErrorValues.includes(message as PossibleError)) {
      message = PossibleErrors.Unknown_Error;
    }
    switch (message as PossibleError) {
      case PossibleErrors.Unable_To_Locate_Request_By_ID: {
        API_Res = {
          message: "Failure",
          data: { message: PossibleErrors.Unable_To_Locate_Request_By_ID },
        };
        Response_Init = {
          status: 500,
          statusText: PossibleErrors.Unable_To_Locate_Request_By_ID,
        };
        break;
      }
      case PossibleErrors.Unable_To_Locate_Users_By_ID: {
        API_Res = {
          message: "Failure",
          data: { message: PossibleErrors.Unable_To_Locate_Users_By_ID },
        };
        Response_Init = {
          status: 500,
          statusText: PossibleErrors.Unable_To_Locate_Users_By_ID,
        };
        break;
      }
      default: {
        API_Res = {
          message: "Failure",
          data: { message: PossibleErrors.Unknown_Error },
        };
        Response_Init = {
          status: 500,
          statusText: PossibleErrors.Unknown_Error,
        };
        break;
      }
    }

    await session.abortTransaction();
  } finally {
    session.endSession();
    return NextResponse.json(API_Res, Response_Init);
  }
}

export async function PUT(req: NextRequest, res: NextResponse) {
  const { friendID, requestorID } = (await req.json()) as RemoveFriendRequest;
  const connection = await _mongoGetConnection.get();
  const _users = await getUserCollection();
  const session = connection.startSession();
  let API_Res: API_Response<simpleMessage> = {
    message: "Success",
    data: { message: "Friend Removed" },
  };
  let Response_Init: ResponseInit = {
    status: 200,
    statusText: "Friend Removed!",
  };

  try {
    const [requestor, friend] = await Promise.all([
      _mongo.user.retrieveUserByID(requestorID),
      _mongo.user.retrieveUserByID(friendID),
    ]);
    if (requestor == null || friend == null) {
      throw new Error(PossibleErrors.Unable_To_Locate_Users_By_ID);
    } else {
      const requestorFriends = requestor.friends.filter((friend) => friend !== friendID);
      const friendFriends = friend.friends.filter((friend) => friend !== requestorID);
      const transactionOptions: TransactionOptions = {
        readPreference: "primary",
        readConcern: { level: "local" },
        writeConcern: { w: "majority" },
      };
      session.startTransaction(transactionOptions);
      await _users.updateOne({ _id: requestor._id }, { $set: { friends: requestorFriends } }, { session });
      await _users.updateOne({ _id: friend._id }, { $set: { friends: friendFriends } }, { session });
      await session.commitTransaction();
      return NextResponse.json(API_Res, Response_Init);
    }
  } catch (err) {
    await session.abortTransaction();
    let message = "";
    if (err instanceof Error) message = err.message;
    const ErrorValues = Object.values(PossibleErrors);
    if (!ErrorValues.includes(message as PossibleError)) {
      message = PossibleErrors.Unknown_Error;
    }
    switch (message as PossibleError) {
      case PossibleErrors.Unable_To_Locate_Users_By_ID: {
        API_Res = {
          message: "Failure",
          data: { message: PossibleErrors.Unable_To_Locate_Users_By_ID },
        };
        Response_Init = {
          status: 500,
          statusText: PossibleErrors.Unable_To_Locate_Users_By_ID,
        };
        break;
      }
      default: {
        API_Res = {
          message: "Failure",
          data: { message: PossibleErrors.Unknown_Error },
        };
        Response_Init = {
          status: 500,
          statusText: PossibleErrors.Unknown_Error,
        };
        break;
      }
    }
    return NextResponse.json(API_Res, Response_Init);
  } finally {
    () => {
      session.endSession();
    };
  }
}
