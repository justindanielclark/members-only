"use client";
import { IconContext } from "react-icons";
import { BsGearFill } from "react-icons/bs";
export default function GearIcon() {
  return (
    <IconContext.Provider value={{ className: "w-6 h-6 inline" }}>
      <BsGearFill />
    </IconContext.Provider>
  );
}
