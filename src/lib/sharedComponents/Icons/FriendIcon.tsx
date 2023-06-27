"use client";
import { IconContext } from "react-icons";
import { FaUser, FaUserFriends } from "react-icons/fa";
export default function FriendIcon() {
  return (
    <IconContext.Provider value={{ className: "w-6 h-6 inline" }}>
      <FaUserFriends />
    </IconContext.Provider>
  );
}
