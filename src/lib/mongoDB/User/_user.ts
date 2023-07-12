import { User } from "../../../../types/types";
import getMovieDatabaseCollection from "../getMovieDatabaseCollection";
import createUser from "./createUser";
import retrieveUser from "./retrieveUser";
import retrieveUserByLookup from "./retrieveUserByLookup";
import retrieveUserByID from "./retrieveUserByID";
import updateUserWatchedList from "./updateUserWatchedList";
import updateUserSeenList from "./updateUserSeenList";
import updateUserProfile from "./updateUserProfile";
import updateUserFriendList from "./updateUserFriendList";

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
  retrieveUserByID,
  updateUserWatchedList,
  updateUserSeenList,
  updateUserProfile,
  updateUserFriendList,
};

export default exportable;
