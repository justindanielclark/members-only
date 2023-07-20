"use client";
import { IconContext } from "@react-icons/all-files";
import { BiPencil } from "@react-icons/all-files/bi/BiPencil";
export default function PencilIcon() {
  return (
    <IconContext.Provider value={{ className: "w-6 h-6 inline" }}>
      <BiPencil />
    </IconContext.Provider>
  );
}
