import { ObjectId, WithId } from "mongodb";
import { getUserCollection } from "./_user";
import { User } from "../../../../types/types";
import { useStyleRegistry } from "styled-jsx";

export default async function retrieveUserByHandle(handle: string): Promise<Array<WithId<User>>> {
  const userCollection = await getUserCollection();
  const users = (await userCollection.aggregate([{ $match: { handle } }]).toArray()) as Array<WithId<User>>;
  return users;
}
