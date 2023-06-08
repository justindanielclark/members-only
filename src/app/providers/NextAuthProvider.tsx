"use client";
import { SessionProvider } from "next-auth/react";

interface Props {
  children: React.ReactNode;
}

function NextAuthProvider({ children }: Props) {
  return <SessionProvider>{children}</SessionProvider>;
}

export default NextAuthProvider;
