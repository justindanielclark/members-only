import { RemoveFriendRequest } from "../../../types/types";

export default async function removeFriend(body: RemoveFriendRequest) {
  return fetch("/api/friends", {
    method: "PUT",
    body: JSON.stringify(body),
  });
}
