"use client";
import { IconContext } from "@react-icons/all-files";
import { BsStarHalf } from "@react-icons/all-files/bs/BsStarHalf";
export default function StarHalfIcon() {
  return (
    <IconContext.Provider value={{ className: "w-6 h-6 inline bg-yellow-800" }}>
      <BsStarHalf />
    </IconContext.Provider>
  );
}
