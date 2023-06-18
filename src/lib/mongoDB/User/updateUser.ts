import DbConnection from "../DbConnection";

export default async function updateUser() {
  const db = await DbConnection.get();
}
