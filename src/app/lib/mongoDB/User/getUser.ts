import DbConnection from "../DbConnection";

export default async function getUser() {
  const db = await DbConnection.get();
}
