import DbConnection from "./DbConnection";
import _user from "./User/_user";
import _friendRequests from "./FriendRequests/_friendRequests";
import _movieReviews from "./MovieReviews/_movieReviews";

const exportable = {
  db: DbConnection,
  user: _user,
  friendRequests: _friendRequests,
  movieReviews: _movieReviews,
};

export default exportable;
