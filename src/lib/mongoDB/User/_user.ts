import { User } from "../../../../types/types";
import getMovieDatabaseCollection from "../getMovieDatabaseCollection";
import createUser from "./createUser";
import retrieveUser from "./retrieveUser";
import updateUserWatchedList from "./updateUserWatchedList";

export async function getUserCollection() {
  const database = await getMovieDatabaseCollection();
  try {
    return database.collection<User>("Users");
  } catch {
    throw new Error("Unable to grab Users collection in getUser.ts");
  }
}

const exportable = {
  createUser,
  retrieveUser,
  updateUserWatchedList,
};

export default exportable;
