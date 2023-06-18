import DbConnection from "./DbConnection";
import _user from "./User/_user";

const exportable = {
  db: DbConnection,
  user: _user,
};

export default exportable;
