"use client";
import Image from "next/image";
import { signOut, signIn, useSession } from "next-auth/react";
import React from "react";
import GoogleSVG from "../../../public/GoogleLogo.svg";
import GithubSVG from "../../../public/GithubLogo.svg";

function Header() {
  const { data: session, status } = useSession();
  let content: JSX.Element;
  switch (status) {
    case "authenticated": {
      if (session) {
        content = (
          <div className="flex flex-row gap-4">
            <Image
              className="rounded-full border-2 border-slate-600"
              src={session.user.image as string}
              alt="profile_photo"
              width={40}
              height={40}
            />
            <button onClick={() => signOut()}>Sign Out!</button>
          </div>
        );
      } else {
        content = <div>There has been an error...</div>;
      }

      break;
    }
    case "unauthenticated": {
      content = (
        <div>
          <button onClick={() => signIn()} className="mr-4">
            Sign In With
            <Image
              className="inline mx-2"
              src={GithubSVG}
              width={25}
              height={25}
              style={{ width: "25px", height: "auto" }}
              alt="Github Logo"
            />
            or
            <Image
              className="inline mx-2"
              src={GoogleSVG}
              width={25}
              height={25}
              style={{ width: "25px", height: "auto" }}
              alt="Google Logo"
            />
          </button>
        </div>
      );
      break;
    }
    case "loading": {
      content = <></>;
      break;
    }
    default: {
      content = <div>There has been an error related to authentication</div>;
      break;
    }
  }
  return (
    <header className="bg-slate-900 border-b border-slate-600">
      <div className="max-w-7xl mx-auto flex justify-end h-12 items-center">{content}</div>
    </header>
  );
}

export default Header;
