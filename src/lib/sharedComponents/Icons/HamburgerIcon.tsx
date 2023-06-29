"use client";
import { IconContext } from "@react-icons/all-files";
import { GiHamburgerMenu } from "@react-icons/all-files/gi/GiHamburgerMenu";
export default function HamburgerIcon() {
  return (
    <IconContext.Provider value={{ className: "w-6 h-6 inline" }}>
      <GiHamburgerMenu />
    </IconContext.Provider>
  );
}

// "use client";
// import { IconContext } from "react-icons";
// import { GiHamburgerMenu } from "react-icons/gi";
// export default function HamburgerIcon() {
//   return (
//     <IconContext.Provider value={{ className: "w-6 h-6 inline" }}>
//       <GiHamburgerMenu />
//     </IconContext.Provider>
//   );
// }
