import { ObjectId } from "mongodb";

type User = {
  //Combination of email[provider] ~ Example: jclark@gmail.com[github]
  lookup: string;
  handle: string;
  aboutMe: string;
  photoPath: string;
  lists: Array<List>;
  friends: Array<Friend>;
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

type Friend = {
  name: string;
  _id: ObjectId;
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
