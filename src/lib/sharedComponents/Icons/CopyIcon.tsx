"use client";
import { IconContext } from "react-icons";
import { AiOutlineCopy } from "react-icons/ai";
export default function CopyIcon() {
  return (
    <IconContext.Provider value={{ className: "w-6 h-6 inline" }}>
      <AiOutlineCopy />
    </IconContext.Provider>
  );
}
