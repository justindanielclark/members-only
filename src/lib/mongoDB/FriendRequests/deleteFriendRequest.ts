import { getFriendRequestsCollection } from "./_friendRequests";
export default async function deleteFriendRequest(senderID: string, receiverID: string) {
  const friendRequestCollection = await getFriendRequestsCollection();
  const result = await friendRequestCollection.deleteOne({ senderID, receiverID });
  return result;
}
