export default async function makeFriendRequest(friendRequestBody: FriendRequest_PostRequest) {
  return await fetch("/api/friendrequest", {
    method: "POST",
    body: JSON.stringify(friendRequestBody),
  });
}
