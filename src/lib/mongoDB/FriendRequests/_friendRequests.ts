import { FriendRequest } from "../../../../types/types";
import getMovieDatabaseCollection from "../getMovieDatabaseCollection";
import createFriendRequest from "./createFriendRequest";
import retrieveFriendRequestByRequestId from "./retrieveFriendRequestByRequestId";
import retrieveFriendRequestsByID from "./retrieveFriendRequestsByID";
import retrieveSpecificFriendRequest from "./retrieveSpecificFriendRequest";
import deleteFriendRequest from "./deleteFriendRequest";
import deleteFriendRequestByID from "./deleteFriendRequestByID";

export async function getFriendRequestsCollection() {
  const database = await getMovieDatabaseCollection();
  try {
    return database.collection<FriendRequest>("Friend Requests");
  } catch {
    throw new Error("Unable to grab Friend Requests collection in getFriendRequests.ts");
  }
}

const exportable = {
  createFriendRequest,
  retrieveFriendRequestByRequestId,
  retrieveFriendRequestsByID,
  retrieveSpecificFriendRequest,
  deleteFriendRequest,
  deleteFriendRequestByID,
};

export default exportable;
