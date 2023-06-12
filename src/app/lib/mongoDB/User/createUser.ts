import DbConnection from "../DbConnection";

export default async function createUser() {
  const db = await DbConnection.get();
}
