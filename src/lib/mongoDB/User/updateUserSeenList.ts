import { getUserCollection } from "./_user";

export default async function updateUserSeenList(userLookup: string, seenList: Array<number>) {
  const userCollection = await getUserCollection();
  const user = await userCollection.updateOne(
    { lookup: userLookup, "lists.name": "Watched" },
    { $set: { "lists.$.movies": seenList } }
  );
  return user;
}
