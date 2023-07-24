import { getFriendRequestsCollection } from "./_friendRequests";
export default async function retrieveFriendRequestByIDs(senderID: string, receiverID: string) {
  const friendRequestCollection = await getFriendRequestsCollection();
  const result = await friendRequestCollection.findOne({ senderID, receiverID });
  return result;
}
