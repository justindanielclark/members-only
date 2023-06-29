"use client";
import { IconContext } from "@react-icons/all-files";
import { FaEllipsisV } from "@react-icons/all-files/fa/FaEllipsisV";
export default function VertEllipsisIcon() {
  return (
    <IconContext.Provider value={{ className: "w-4 h-4 inline" }}>
      <FaEllipsisV />
    </IconContext.Provider>
  );
}
