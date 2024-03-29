"use client";
import Link from "next/link";
import { useState } from "react";
import deleteFriendRequest from "@/lib/api/deleteFriendRequest";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import CopiedToastId from "@/lib/sharedComponents/Toasts/CopiedToast";
import ToastWithHeader from "@/lib/sharedComponents/Toasts/ToastWithHeader";

type Props = {
  profileID: string;
  requestID: string;
};

export default function OutGoingRequestListItemActions({ profileID, requestID }: Props) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const handleClick = () => {
    setIsSubmitting(true);
    deleteFriendRequest(requestID)
      .then((res) => {
        if (!res.ok) {
          throw new Error(res.statusText);
        } else {
          return res.json() as Promise<API_Response<simpleMessage>>;
        }
      })
      .then((data) => {
        toast(data.message, CopiedToastId);
      })
      .catch((err) => {
        let message = "";
        if (err instanceof Error) message = err.message;
        toast(<ToastWithHeader title="Unable to Complete Request:" text={message} />, CopiedToastId);
      })
      .finally(() => {
        setIsSubmitting(false);
        router.refresh();
      });
  };
  return (
    <div className="flex sm:flex-col flex-row text-xs h-full justify-end gap-2 sm:gap-0">
      <Link href={`/profile/${profileID}`} className="text-right p-1 grow-0 shrink hover:underline">
        View Profile
      </Link>
      <button
        className={`text-right p-1 grow-0 shrink ${
          isSubmitting ? "text-gray-400 line-through" : "text-red-400 hover:underline"
        }`}
        onClick={handleClick}
      >
        Retract Request
      </button>
    </div>
  );
}
