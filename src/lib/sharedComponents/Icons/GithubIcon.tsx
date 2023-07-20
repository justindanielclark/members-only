"use client";
import { IconContext } from "@react-icons/all-files";
import { AiFillGithub } from "@react-icons/all-files/ai/AiFillGithub";
export default function GitHubIcon() {
  return (
    <IconContext.Provider value={{ className: "w-6 h-6 inline" }}>
      <AiFillGithub />
    </IconContext.Provider>
  );
}
