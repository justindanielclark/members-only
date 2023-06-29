export default async function updateUser(updateUserBody: UpdateUserRequest) {
  return await fetch("/api/profile", {
    method: "PUT",
    body: JSON.stringify(updateUserBody),
  });
}
