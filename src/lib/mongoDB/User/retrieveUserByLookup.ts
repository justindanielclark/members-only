import { WithId } from "mongodb";
import { getUserCollection } from "./_user";
import { User } from "../../../../types/types";

export default async function retrieveUserByLookup(lookup: string): Promise<WithId<User> | null> {
  const userCollection = await getUserCollection();
  const user = await userCollection.findOne({ lookup });
  return user;
}
