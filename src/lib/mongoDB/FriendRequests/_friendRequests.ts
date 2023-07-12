import { FriendRequest } from "../../../../types/types";
import getMovieDatabaseCollection from "../getMovieDatabaseCollection";
import createFriendRequest from "./createFriendRequest";
import retrieveFriendRequestsByID from "./retrieveFriendRequestsByID";
import retrieveSpecificFriendRequest from "./retrieveSpecificFriendRequest";
import deleteFriendRequest from "./deleteFriendRequest";

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
  retrieveFriendRequestsByID,
  retrieveSpecificFriendRequest,
  deleteFriendRequest,
};

export default exportable;
