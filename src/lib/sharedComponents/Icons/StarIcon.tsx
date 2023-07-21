"use client";
import { IconContext } from "@react-icons/all-files";
import { BsStarFill } from "@react-icons/all-files/bs/BsStarFill";
export default function StarIcon() {
  return (
    <IconContext.Provider value={{ className: "w-6 h-6 inline bg-yellow-800" }}>
      <BsStarFill />
    </IconContext.Provider>
  );
}
