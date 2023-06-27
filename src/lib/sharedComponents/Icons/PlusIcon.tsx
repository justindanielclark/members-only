"use client";
import { IconContext } from "react-icons";
import { FaPlus } from "react-icons/fa";
export default function PlusIcon() {
  return (
    <IconContext.Provider value={{ className: "w-6 h-6 inline" }}>
      <FaPlus />
    </IconContext.Provider>
  );
}
