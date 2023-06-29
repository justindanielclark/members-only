"use client";
import { IconContext } from "@react-icons/all-files";
import { BsLink } from "@react-icons/all-files/bs/BsLink";
export default function LinkIcon() {
  return (
    <IconContext.Provider value={{ className: "w-6 h-6 inline" }}>
      <BsLink />
    </IconContext.Provider>
  );
}

// "use client";
// import { IconContext } from "react-icons";
// import { BsLink } from "react-icons/bs";
// export default function LinkIcon() {
//   return (
//     <IconContext.Provider value={{ className: "w-6 h-6 inline" }}>
//       <BsLink />
//     </IconContext.Provider>
//   );
// }
