export default async function makeFriendRequest(friendRequestBody: FriendRequestRequest) {
  return await fetch("/api/friendrequest", {
    method: "POST",
    body: JSON.stringify(friendRequestBody),
  });
}
