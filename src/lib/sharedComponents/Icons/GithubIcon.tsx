"use client";
import { IconContext } from "react-icons";
import { AiFillGithub } from "react-icons/ai";
export default function GitHubIcon() {
  return (
    <IconContext.Provider value={{ className: "w-6 h-6 inline" }}>
      <AiFillGithub />
    </IconContext.Provider>
  );
}
