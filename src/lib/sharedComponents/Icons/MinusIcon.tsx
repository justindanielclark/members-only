"use client";
import { IconContext } from "@react-icons/all-files";
import { FaMinus } from "@react-icons/all-files/fa/FaMinus";
export default function MinusIcon() {
  return (
    <IconContext.Provider value={{ className: "w-6 h-6 inline" }}>
      <FaMinus />
    </IconContext.Provider>
  );
}
