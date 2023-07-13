"use client";
import { IconContext } from "@react-icons/all-files";
import { AiFillCheckSquare } from "@react-icons/all-files/ai/AiFillCheckSquare";
export default function GitHubIcon() {
  return (
    <IconContext.Provider value={{ className: "w-6 h-6 inline bg-green-900" }}>
      <AiFillCheckSquare />
    </IconContext.Provider>
  );
}
