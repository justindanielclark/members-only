"use client";
import { IconContext } from "react-icons";
import { PiSignOutBold } from "react-icons/pi";
export default function SignOutIcon() {
  return (
    <IconContext.Provider value={{ className: "w-6 h-6 inline" }}>
      <PiSignOutBold />
    </IconContext.Provider>
  );
}
