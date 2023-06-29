"use client";
import { IconContext } from "@react-icons/all-files";
import { BsGearFill } from "@react-icons/all-files/bs/BsGearFill";
export default function GearIcon() {
  return (
    <IconContext.Provider value={{ className: "w-6 h-6 inline" }}>
      <BsGearFill />
    </IconContext.Provider>
  );
}
