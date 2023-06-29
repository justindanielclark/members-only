import { User } from "../../../../types/types";
import getMovieDatabaseCollection from "../getMovieDatabaseCollection";
import createUser from "./createUser";
import retrieveUser from "./retrieveUser";
import retrieveUserByLookup from "./retrieveUserByLookup";
import updateUserWatchedList from "./updateUserWatchedList";
import updateUserSeenList from "./updateUserSeenList";
import updateUserProfile from "./updateUserProfile";

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
  retrieveUserByLookup,
  updateUserWatchedList,
  updateUserSeenList,
  updateUserProfile,
};

export default exportable;
