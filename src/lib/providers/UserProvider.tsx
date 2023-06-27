"use client";
import cloneDeep from "clone-deep";
import { User } from "../../../types/types";
import { createContext, useContext, useEffect, useState } from "react";
import { getUserListByName } from "../utils/getUserListByName";

type Props = {
  user: User;
  movieMap: Map<number, FetchedMovie>;
  children: React.ReactNode;
};

type Context = {
  user: User;
  movieMap: Map<number, FetchedMovie>;
  addWatchListMovie: (movieID: number) => void;
  removeWatchListMovie: (movieID: number) => void;
  addSeenListMovie: (movieID: number) => void;
  removeSeenListMovie: (movieID: number) => void;
};

const context = createContext<Context | null>(null);

export function useUserContext(): Context {
  const UserContext = useContext(context);
  if (UserContext) {
    return UserContext;
  }
  throw new Error("Context is null");
}

export default function UserContext({ user, movieMap, children }: Props) {
  const [state, setState] = useState<User>(user);

  const addWatchListMovie = (movieID: number) => {
    const newState = cloneDeep(state);
    const watchList = getUserListByName(newState, "Watch List");
    watchList.movies.push(movieID);
    setState(newState);
  };

  const removeWatchListMovie = (movieID: number) => {
    const newState = cloneDeep(state);
    const watchList = getUserListByName(newState, "Watch List");
    watchList.movies = watchList.movies.filter((id) => id !== movieID);
    setState(newState);
  };

  const addSeenListMovie = (movieID: number) => {
    const newState = cloneDeep(state);
    const watchList = getUserListByName(newState, "Watched");
    watchList.movies.push(movieID);
    setState(newState);
  };

  const removeSeenListMovie = (movieID: number) => {
    const newState = cloneDeep(state);
    const seenList = getUserListByName(newState, "Watched");
    seenList.movies = seenList.movies.filter((id) => id !== movieID);
    setState(newState);
  };

  const ctx: Context = {
    user,
    movieMap,
    addSeenListMovie,
    addWatchListMovie,
    removeSeenListMovie,
    removeWatchListMovie,
  };
  return <context.Provider value={ctx}>{children}</context.Provider>;
}
