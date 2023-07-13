"use client";
import { IconContext } from "@react-icons/all-files";
import { AiFillCloseSquare } from "@react-icons/all-files/ai/AiFillCloseSquare";
export default function GitHubIcon() {
  return (
    <IconContext.Provider value={{ className: "w-6 h-6 inline bg-red-900" }}>
      <AiFillCloseSquare />
    </IconContext.Provider>
  );
}
