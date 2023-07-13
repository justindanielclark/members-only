import { ObjectId } from "mongodb";
import { getFriendRequestsCollection } from "./_friendRequests";
export default async function deleteFriendRequestByID(requestID: string) {
  const friendRequestCollection = await getFriendRequestsCollection();
  const result = await friendRequestCollection.deleteOne({ _id: new ObjectId(requestID) });
  return result;
}
