import { ObjectId, WithId } from "mongodb";

type User = {
  //Combination of email[provider] ~ Example: jclark@gmail.com[github]
  lookup: string;
  handle: string;
  aboutMe: string;
  photoPath: string;
  lists: Array<List>;
  friends: Array<string>;
};

type ProviderUser = {
  lookup: string;
  handle: string;
  friends: Array<Friend>;
  lists: Array<CompleteList>;
};

type List = {
  name: string;
  movies: Array<number>;
};
type CompleteList = {
  name: string;
  movies: Array<FetchedMovie>;
};

type Toast = {
  id: string;
  message: string;
  submissionTime: Date;
};

type SearchParameters = {
  page: number;
  query: string;
};

type FriendRequest = {
  sent: Date;
  senderID: string;
  receiverID: string;
};

type AcceptFriendRequest = {
  requestID: string;
};

type RemoveFriendRequest = {
  requestorID: string;
  friendID: string;
};

type FriendWithSharedMoviesInfo = {
  friend: WithId<User>;
  numShared: number;
};

type MovieReview = {
  movie: number;
  user: string;
  title: string;
  date: Date;
  score: number;
  content: string;
};

type MovieReviewDatum = { review: WithId<MovieReview>; user: WithId<User> };
type MovieReviewData = Array<MovieReviewDatum>;
