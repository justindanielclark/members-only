import { ObjectId } from "mongodb";

type User = {
  //Combination of email[provider] ~ Example: jclark@gmail.com[github]
  lookup: string;
  handle: string;
  lists: Array<List>;
  friends: Array<Friend>;
};

type List = {
  name: string;
  movies: Array<MovieIDs>;
};
type Friend = {
  name: string;
  _id: ObjectId;
};

type MovieIDs = {
  _id: ObjectId;
  TMDB_ID: number;
};

type MovieList = {
  name: string;
  createdOn: Date;
  movies: Array<MovieIDs>;
};
