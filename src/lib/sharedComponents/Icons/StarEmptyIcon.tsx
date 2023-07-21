"use client";
import { IconContext } from "@react-icons/all-files";
import { BsStar } from "@react-icons/all-files/bs/BsStar";
export default function StarEmptyIcon() {
  return (
    <IconContext.Provider value={{ className: "w-6 h-6 inline bg-yellow-800" }}>
      <BsStar />
    </IconContext.Provider>
  );
}
