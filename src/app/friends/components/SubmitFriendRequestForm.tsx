"use client";
import { MouseEvent, useState, ChangeEvent } from "react";
import SubHeader from "@/lib/sharedComponents/Headers/SubHeader";
import { toast } from "react-toastify";
import makeFriendRequest from "@/lib/api/makeFriendRequest";

type Props = {
  profileUserID: string;
};

export default function SubmitFriendRequestForm({ profileUserID }: Props) {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [inputFriendID, setInputFriendID] = useState<string>("");

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputFriendID(e.target.value);
  };
  const handleSubmit = (e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
    e.preventDefault();
    setIsSubmitting(true);
    const submissionRequest = makeFriendRequest({ receiverUserID: inputFriendID, senderUserID: profileUserID })
      .then((res) => {
        if (!res.ok) {
          throw new Error();
        } else {
          return res;
        }
      })
      .then(() => {
        toast("Friend Added!");
      })
      .catch((err) => {
        toast("Unable to Complete Request", {});
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };
  return (
    <section>
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
