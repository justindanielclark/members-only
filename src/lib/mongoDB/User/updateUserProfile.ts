import { getUserCollection } from "./_user";

export default async function updateUserProfile(userLookup: string, handle: string, aboutMe: string) {
  const userCollection = await getUserCollection();
  const user = await userCollection.updateOne({ lookup: userLookup }, { $set: { handle, aboutMe } });
  return user;
}
