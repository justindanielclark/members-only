"use client";
import { useState } from "react";
import Image from "next/image";
import { signOut, signIn, useSession } from "next-auth/react";
import React from "react";
import GoogleSVG from "../../../public/GoogleLogo.svg";
import GithubSVG from "../../../public/GithubLogo.svg";
import Link from "next/link";
import HamburgerIcon from "@/lib/sharedComponents/Icons/HamburgerIcon";
import GearIcon from "@/lib/sharedComponents/Icons/GearIcon";
import FriendIcon from "@/lib/sharedComponents/Icons/FriendIcon";
import SignOutIcon from "@/lib/sharedComponents/Icons/SignOutIcon";

const menuAnimatingStates = ["open", "opening", "closed", "closing"] as const;
type AnimationState = (typeof menuAnimatingStates)[number];

function Header() {
  const [menuAnimationState, setMenuAnimationState] = useState<AnimationState>("closed");
  const { data: session, status } = useSession();

  let content: JSX.Element;
  switch (status) {
    case "authenticated": {
      if (session) {
        content = (
          <div
            className="flex flex-row items-center justify-center w-12 h-12 cursor-pointer"
            onClick={() => {
              if (menuAnimationState === "open") {
                setMenuAnimationState("closing");
              } else if (menuAnimationState === "closed") {
                setMenuAnimationState("opening");
              }
            }}
          >
            <HamburgerIcon />
          </div>
        );
      } else {
        content = <div>There has been an error with session...</div>;
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
      content = <div>Loading...</div>;
      break;
    }
    default: {
      content = <div>There has been an error related to authentication</div>;
      break;
    }
  }
  return (
    <header className="bg-slate-900 border-b border-slate-600 relative">
      <div className="max-w-7xl mx-auto bg-slate-900 z-50 relative">
        <div className="relative w-full flex flex-row bg-slate-900 justify-between h-12 items-center z-50 px-4">
          <Link href={session ? "/dashboard" : "/"}>MovieBase</Link>
          {content}
        </div>
        {menuAnimationState !== "closed" && status == "authenticated" ? (
          <HeaderMenu state={menuAnimationState} setState={setMenuAnimationState} />
        ) : undefined}
      </div>
    </header>
  );
}

type HeaderMenuProps = {
  state: AnimationState;
  setState: React.Dispatch<React.SetStateAction<AnimationState>>;
};

function HeaderMenu({ state, setState }: HeaderMenuProps) {
  const classes: Array<string> = (() => {
    switch (state) {
      case "open": {
        return ["translate-y-full"];
      }
      case "opening": {
        return ["translate-y-0", "animate-headerMenuDown"];
      }
      case "closed": {
        return ["translate-y-0"];
      }
      case "closing": {
        return ["translate-y-full", "animate-headerMenuUp"];
      }
      default: {
        throw new Error("Unexpected Animation State");
      }
    }
  })();
  return (
    <div
      className={`bottom-0 absolute right-5 bg-slate-900 rounded-b-lg ${classes.join(" ")}`}
      style={{ animationFillMode: "forwards" }}
      onAnimationEnd={(e) => {
        if (e.animationName === "headerMenuDown") {
          setState("open");
        } else if (e.animationName === "headerMenuUp") {
          setState("closed");
        }
      }}
    >
      <ul className="flex flex-col min-w-56 pt-4">
        <li className="text-right whitespace-nowrap p-2 cursor-pointer hover:bg-slate-700/80">
          <Link href={"/profile"} className="w-full flex flex-row items-center gap-4 justify-end">
            <span>Profile / Settings</span>
            <GearIcon />
          </Link>
        </li>
        <li className="text-right whitespace-nowrap p-2 cursor-pointer hover:bg-slate-700/80">
          <Link href={"/friends"} className="w-full flex flex-row items-center gap-4 justify-end">
            <span>View and Add Friends</span>
            <FriendIcon />
          </Link>
        </li>
        <li className="text-right whitespace-nowrap p-2 cursor-pointer hover:bg-slate-700/80">
          <button
            className="w-full text-right flex flex-row items-center gap-4 justify-end"
            onClick={(e) => {
              e.preventDefault();
              signOut();
            }}
          >
            <span>Sign Out</span>
            <SignOutIcon />
          </button>
        </li>
      </ul>
    </div>
  );
}

export default Header;
