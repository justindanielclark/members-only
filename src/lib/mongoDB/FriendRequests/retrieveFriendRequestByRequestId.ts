import { ObjectId } from "mongodb";
import { getFriendRequestsCollection } from "./_friendRequests";
export default async function retrieveFriendRequestByRequestId(requestID: string) {
  const friendRequestCollection = await getFriendRequestsCollection();
  const result = await friendRequestCollection.findOne({ _id: new ObjectId(requestID) });
  return result;
}
