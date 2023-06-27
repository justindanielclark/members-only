"use client";
import { IconContext } from "react-icons";
import { AiFillEyeInvisible } from "react-icons/ai";
export default function UnseenIcon() {
  return (
    <IconContext.Provider value={{ className: "w-6 h-6 inline" }}>
      <AiFillEyeInvisible />
    </IconContext.Provider>
  );
}
