"use client";
import { useState } from "react";
import removeFriend from "@/lib/api/removeFriend";

type Props = {
  requestorID: string;
  friendID: string;
};

export default function FriendActions({ requestorID, friendID }: Props) {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const handleClickRemoveFriend = () => {
    console.log("requestorID", requestorID);
    console.log("friendID", friendID);
  };
  return (
    <div className="flex sm:flex-col flex-row text-xs h-full justify-end gap-2 sm:gap-0">
      <button className="text-right hover:underline p-1 grow-0 shrink">View Profile</button>
      <button className="text-red-400  text-right hover:underline p-1 grow-0 shrink" onClick={handleClickRemoveFriend}>
        Remove Friend
      </button>
    </div>
  );
}
