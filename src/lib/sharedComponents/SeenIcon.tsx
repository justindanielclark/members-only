"use client";
import { IconContext } from "react-icons";
import { AiFillEye } from "react-icons/ai";
export default function SeenIcon() {
  return (
    <IconContext.Provider value={{ className: "w-6 h-6 inline" }}>
      <AiFillEye />
    </IconContext.Provider>
  );
}
