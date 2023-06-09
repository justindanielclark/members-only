import { ObjectId, WithId } from "mongodb";
import { getUserCollection } from "./_user";
import { User } from "../../../../types/types";

export default async function retrieveUserByID(id: string): Promise<WithId<User> | null> {
  const userCollection = await getUserCollection();
  const user = userCollection.findOne({ _id: new ObjectId(id) });
  return user;
}
