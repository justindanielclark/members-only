"use client";
import { IconContext } from "@react-icons/all-files";
import { AiFillEye } from "@react-icons/all-files/ai/AiFillEye";
export default function SeenIcon() {
  return (
    <IconContext.Provider value={{ className: "w-6 h-6 inline" }}>
      <AiFillEye />
    </IconContext.Provider>
  );
}
