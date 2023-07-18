"use client";
import Link from "next/link";
import { useState } from "react";
import acceptFriendRequest from "@/lib/api/acceptFriendRequest";
import deleteFriendRequest from "@/lib/api/deleteFriendRequest";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import CopiedToastId from "@/lib/sharedComponents/Toasts/CopiedToast";

type Props = {
  profileID: string;
  requestID: string;
};

export default function InComingRequestListItemActions({ profileID, requestID }: Props) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const handleAcceptClick = () => {
    setIsSubmitting(true);
    acceptFriendRequest(requestID)
      .then((res) => {
        toast(res.statusText, CopiedToastId);
        router.refresh();
      })
      .catch(() => {
        toast("There Was An Error With The Request", CopiedToastId);
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };
  const handleDenyClick = () => {
    setIsSubmitting(true);
    deleteFriendRequest(requestID)
      .then((res) => {
        toast(res.statusText, CopiedToastId);
        router.refresh();
      })
      .catch(() => {
        toast("There Was An Error With The Request", CopiedToastId);
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };
  return (
    <div className="flex sm:flex-col flex-row text-xs h-full justify-end gap-2 sm:gap-0">
      <Link href={`/profile/${profileID}`} className="text-right p-1 grow-0 shrink hover:underline">
        View Profile
      </Link>
      <button
        className={`text-right p-1 grow-0 shrink ${
          isSubmitting ? "text-gray-400 line-through" : "text-green-400 hover:underline"
        }`}
        onClick={handleAcceptClick}
      >
        Accept
      </button>
      <button
        className={`text-right p-1 grow-0 shrink ${
          isSubmitting ? "text-gray-400 line-through" : "text-red-400 hover:underline"
        }`}
        onClick={handleDenyClick}
      >
        Deny
      </button>
    </div>
  );
}
