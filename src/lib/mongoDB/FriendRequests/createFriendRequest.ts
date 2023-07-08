import { getFriendRequestsCollection } from "./_friendRequests";
export default async function createFriendRequest(senderID: string, receiverID: string) {
  const friendRequestCollection = await getFriendRequestsCollection();
  const result = await friendRequestCollection.insertOne({ sent: new Date(), senderID, receiverID });
  return result;
}
