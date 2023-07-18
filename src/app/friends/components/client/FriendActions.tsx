"use client";
import { useState } from "react";
import removeFriend from "@/lib/api/removeFriend";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import ToastWithHeader from "@/lib/sharedComponents/Toasts/ToastWithHeader";
import Link from "next/link";
import CopiedToastId from "@/lib/sharedComponents/Toasts/CopiedToast";

type Props = {
  requestorID: string;
  friendID: string;
};

export default function FriendActions({ requestorID, friendID }: Props) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const handleClickRemoveFriend = () => {
    setIsSubmitting(true);
    removeFriend({ friendID, requestorID })
      .then((res) => {
        if (!res.ok) {
          throw new Error();
        }
        toast(res.statusText, CopiedToastId);
      })
      .catch(() => {
        toast(
          <ToastWithHeader
            title="Internal Server Error"
            text="There Was An Issue With This Request. Please Try Again Later"
          />,
          CopiedToastId
        );
        setIsSubmitting(false);
      })
      .finally(() => {
        router.refresh();
      });
  };
  return (
    <div className="flex sm:flex-col flex-row text-xs h-full justify-end gap-2 sm:gap-0">
      <Link href={`/profile/${friendID}`} className="text-right hover:underline p-1 grow-0 shrink">
        View Profile
      </Link>
      <button
        className={`text-right p-1 grow-0 shrink ${
          isSubmitting ? "text-gray-400 line-through" : "text-red-400 hover:underline"
        }`}
        onClick={handleClickRemoveFriend}
      >
        Remove Friend
      </button>
    </div>
  );
}
