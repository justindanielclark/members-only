import { WithId } from "mongodb";
import { getUserCollection } from "./_user";
import { User } from "../../../../types/types";

export default async function retrieveUser(email: string, provider: string): Promise<WithId<User> | null> {
  const userCollection = await getUserCollection();
  const user = await userCollection.findOne({ lookup: `${email}[${provider}]` });
  return user;
}
