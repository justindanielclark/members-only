"use client";
import { IconContext } from "@react-icons/all-files";
import { AiFillEyeInvisible } from "@react-icons/all-files/ai/AiFillEyeInvisible";
export default function UnseenIcon() {
  return (
    <IconContext.Provider value={{ className: "w-6 h-6 inline" }}>
      <AiFillEyeInvisible />
    </IconContext.Provider>
  );
}

// "use client";
// import { IconContext } from "react-icons";
// import { AiFillEyeInvisible } from "react-icons/ai";
// export default function UnseenIcon() {
//   return (
//     <IconContext.Provider value={{ className: "w-6 h-6 inline" }}>
//       <AiFillEyeInvisible />
//     </IconContext.Provider>
//   );
// }
