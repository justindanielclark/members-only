import { getFriendRequestsCollection } from "./_friendRequests";

const typesOfIDs = ["receiverID", "senderID"] as const;
type ID_Type = (typeof typesOfIDs)[number];

export default async function retrieveSpecificFriendRequest(senderID: string, receiverID: string) {
  const FriendRequests = await getFriendRequestsCollection();
  let results = FriendRequests.findOne({ senderID, receiverID });
  return results;
}
