export default async function deleteFriendRequest(requestID: string) {
  return fetch(`/api/friendrequest/${requestID}`, {
    method: "DELETE",
  });
}
