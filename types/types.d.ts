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
  movies: Array<number>;
};
type Friend = {
  name: string;
  _id: ObjectId;
};
