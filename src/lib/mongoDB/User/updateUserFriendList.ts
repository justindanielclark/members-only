import { getUserCollection } from "./_user";
import { ObjectId } from "mongodb";
export default async function updateUserFriendList(userID: string, newFriendsList: Array<string>) {
  const lookupID = new ObjectId(userID);
  const userCollection = await getUserCollection();
  const user = await userCollection.updateOne({ _id: lookupID }, { $set: { friends: newFriendsList } });
  return user;
}
