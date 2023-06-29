import { User } from "../../../../types/types";
import { getUserCollection } from "./_user";

export default async function createUser(email: string, provider: string, name: string, photoPath: string) {
  const userCollection = await getUserCollection();
  const user: User = {
    lookup: `${email}[${provider}]`,
    friends: [],
    handle: name.length > 20 ? name.slice(0, 20) : name,
    photoPath,
    aboutMe: "",
    lists: [
      { name: "Watched", movies: [] },
      { name: "Watch List", movies: [] },
    ],
  };
  await userCollection.insertOne(user);
  return;
}
