"use client";
import { IconContext } from "@react-icons/all-files";
import { FaUserFriends } from "@react-icons/all-files/fa/FaUserFriends";
export default function FriendIcon() {
  return (
    <IconContext.Provider value={{ className: "w-6 h-6 inline" }}>
      <FaUserFriends />
    </IconContext.Provider>
  );
}

// "use client";
// import { IconContext } from "react-icons";
// import { FaUserFriends } from "react-icons/fa";
// export default function FriendIcon() {
//   return (
//     <IconContext.Provider value={{ className: "w-6 h-6 inline" }}>
//       <FaUserFriends />
//     </IconContext.Provider>
//   );
// }
