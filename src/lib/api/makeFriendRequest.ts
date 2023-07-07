export default async function makeFriendRequest(friendRequestBody: FriendRequestRequest) {
  console.log(friendRequestBody);
  return await fetch("/api/friendrequest", {
    method: "POST",
    body: JSON.stringify(friendRequestBody),
  });
}
