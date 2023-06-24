import { getUserCollection } from "./_user";

export default async function updateUserWatchedList(userLookup: string, watchedList: Array<number>) {
  const userCollection = await getUserCollection();
  const user = await userCollection.updateOne(
    { lookup: userLookup, "lists.name": "Watch List" },
    { $set: { "lists.$.movies": watchedList } }
  );
  return user;
}
