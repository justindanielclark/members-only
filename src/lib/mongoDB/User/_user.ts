import getMovieDatabaseCollection from "../getMovieDatabaseCollection";
import createUser from "./createUser";
import updateUser from "./updateUser";

export async function getUserCollection() {
  const database = await getMovieDatabaseCollection();
  try {
    return database.collection('Users');
  } catch {
    throw new Error('Unable to grab Users collection in getUser.ts')
  }
  
}


const exportable = {
  createUser,
  updateUser,
};

export default exportable;
