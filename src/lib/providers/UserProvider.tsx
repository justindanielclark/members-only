"use client";
import { User } from "../../../types/types";
import { createContext, useContext } from "react";

type Props = {
  user: User | null;
  children: React.ReactNode;
};

const context = createContext<User | null>(null);

export default function UserContext({ user, children }: Props) {
  return <context.Provider value={user}>{children}</context.Provider>;
}

export const useUserContext = () => useContext(context);
