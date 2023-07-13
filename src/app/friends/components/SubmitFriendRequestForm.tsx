"use client";
import { MouseEvent, useState, ChangeEvent } from "react";
import SubHeader from "@/lib/sharedComponents/Headers/SubHeader";
import { toast } from "react-toastify";
import makeFriendRequest from "@/lib/api/makeFriendRequest";

import { useRouter } from "next/navigation";

type Props = {
  profileUserID: string;
};

export default function SubmitFriendRequestForm({ profileUserID }: Props) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [inputFriendID, setInputFriendID] = useState<string>("");

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputFriendID(e.target.value);
  };
  const handleSubmit = (e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
    e.preventDefault();
    setIsSubmitting(true);
    makeFriendRequest({ receiverUserID: inputFriendID, senderUserID: profileUserID })
      .then((res) => {
        if (!res.ok) {
          throw new Error(res.statusText);
        } else {
          return res.json() as Promise<API_Response<simpleMessage>>;
        }
      })
      .then((data) => {
        toast(data.data.message);
      })
      .catch((err) => {
        let message = "";
        if (err instanceof Error) message = err.message;
        toast(
          <div className="flex flex-col">
            <p className="font-bold underline">Unable to Complete Request:</p>
            <p>{message}</p>
          </div>
        );
      })
      .finally(() => {
        setIsSubmitting(false);
        router.refresh();
      });
  };
  return (
    <section className="my-4">
      <SubHeader>Send a Friend Request To Another User:</SubHeader>
      <form action="" method="POST" className="my-2">
        <div className="flex flex-col">
          <div className="flex flex-col sm:flex-row sm:items-end flex-wrap">
            <label htmlFor="profileID" className="font-bold text-xl">
              User Profile ID:
            </label>
            <p className="text-xs flex-1 text-right sm:whitespace-nowrap">Found on the Profile Page</p>
          </div>
          <input
            name="profileID"
            id="profileID"
            type="text"
            className="text-black p-2 my-2"
            value={inputFriendID}
            onChange={handleInputChange}
          />
        </div>
        <button
          onClick={handleSubmit}
          className={`whitespace-nowrap my-4 p-2 rounded-lg float-right after:clear-both ${
            isSubmitting ? "bg-inherit" : "bg-green-900"
          }`}
        >
          {isSubmitting ? "Submitting..." : "Submit Friend Request"}
        </button>
      </form>
    </section>
  );
}
