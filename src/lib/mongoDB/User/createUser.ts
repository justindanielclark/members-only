import { User } from "../../../../types/types";
import { getUserCollection } from "./_user";

export default async function createUser(email: string, provider: string, name: string) {
  const userCollection = await getUserCollection();
  const user: User = {
    lookup: `${email}[${provider}]`,
    friends: [],
    handle: name,
    lists: [
      { name: "Watched", movies: [] },
      { name: "Watch List", movies: [] },
    ],
  };
  await userCollection.insertOne(user);
  return;
}
