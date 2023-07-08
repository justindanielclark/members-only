import DbConnection from "./DbConnection";
import _user from "./User/_user";
import _friendRequests from "./FriendRequests/_friendRequests";

const exportable = {
  db: DbConnection,
  user: _user,
  friendRequests: _friendRequests,
};

export default exportable;
