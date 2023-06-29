"use client";
import { IconContext } from "@react-icons/all-files";
import { AiOutlineCopy } from "@react-icons/all-files/ai/AiOutlineCopy";
export default function CopyIcon() {
  return (
    <IconContext.Provider value={{ className: "w-6 h-6 inline" }}>
      <AiOutlineCopy />
    </IconContext.Provider>
  );
}
