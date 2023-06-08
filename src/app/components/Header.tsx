"use client";
import { signOut, signIn, useSession } from "next-auth/react";
import React from "react";

function Header() {
  const { data: session, status } = useSession();
  let content: JSX.Element;
  switch (status) {
    case "authenticated": {
      content = (
        <div>
          <p>Welcome User</p>
          <button onClick={() => signOut()}>Sign Out!</button>
        </div>
      );
      break;
    }
    case "unauthenticated": {
      content = (
        <div>
          <p>You will need to login to participate</p>
          <button onClick={() => signIn()}>Sign In!</button>
        </div>
      );
      break;
    }
    case "loading": {
      content = <div></div>;
      break;
    }
    default: {
      content = <div>There has been some type of error</div>;
      break;
    }
  }
  return <header className="h-12 bg-slate-900 flex justify-end items-center">{content}</header>;
}

export default Header;
