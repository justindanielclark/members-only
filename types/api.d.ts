interface API_Response<T> {
  message: "Success" | "Failure";
  data: T;
}

interface WatchListMethod<K> {
  type: K;
}

type WatchListRequest = {
  movieID: number;
  lookup: string;
};

interface SeenListMethod<K> {
  type: K;
}
type SeenListRequest = {
  movieID: number;
  lookup: string;
};

type WatchlistAddMovieRequest = WatchListMethod<"Add"> & WatchListRequest;
type WatchListRemoveMovieRequest = WatchListMethod<"Remove"> & WatchListRequest;
type SeenlistAddMovieRequest = SeenListMethod<"Add"> & SeenListRequest;
type SeenListRemoveMovieRequest = SeenListMethod<"Remove"> & SeenListRequest;
