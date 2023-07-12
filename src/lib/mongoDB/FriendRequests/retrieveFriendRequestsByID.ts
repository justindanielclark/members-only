import { getFriendRequestsCollection } from "./_friendRequests";
import { WithId } from "mongodb";
import { FriendRequest } from "../../../../types/types";

const typesOfIDs = ["receiverID", "senderID"] as const;
type ID_Type = (typeof typesOfIDs)[number];

export default async function retrieveFriendRequstsByID(ID: string, type: ID_Type) {
  const FriendRequests = await getFriendRequestsCollection();
  let results: WithId<FriendRequest>[] = await (async () => {
    switch (type) {
      case "receiverID": {
        return await FriendRequests.find({ receiverID: ID }).toArray();
      }
      case "senderID": {
        return await FriendRequests.find({ senderID: ID }).toArray();
      }
    }
  })();
  return results;
}
