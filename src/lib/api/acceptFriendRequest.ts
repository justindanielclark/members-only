export default async function acceptFriendRequest(requestID: string) {
  return fetch(`/api/friends`, {
    method: "POST",
    body: JSON.stringify({ requestID }),
  });
}
