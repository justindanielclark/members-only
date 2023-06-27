import { User, List } from "../../../types/types";
export function getUserListByName(user: User, listname: string): List {
  const returnList = user.lists.find((item) => item.name == listname);
  if (returnList) {
    return returnList;
  }
  return { name: "undefined", movies: [] } as List;
}
