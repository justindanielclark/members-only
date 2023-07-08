import { FriendRequest } from "../../../../types/types";
import getMovieDatabaseCollection from "../getMovieDatabaseCollection";
import createFriendRequest from "./createFriendRequest";
import retrieveFriendRequstsByReceiver from "./retrieveFriendRequestsByReceiver";
import retrieveFriendRequstsBySender from "./retrieveFriendRequestsBySender";

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
  retrieveFriendRequstsByReceiver,
  retrieveFriendRequstsBySender,
};

export default exportable;
