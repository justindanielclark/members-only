"use client";
import { FriendType } from "@/lib/utils/friendTypes";
import { useState } from "react";
import deleteFriendRequest from "@/lib/api/deleteFriendRequest";
import makeFriendRequest from "@/lib/api/makeFriendRequest";
import acceptFriendRequest from "@/lib/api/acceptFriendRequest";
import removeFriend from "@/lib/api/removeFriend";
import { toast } from "react-toastify";
type Props = {
  userID: string;
  profileID: string;
  friendStatus: FriendType;
  friendRequestID?: string;
};
export default function Controls({ friendStatus, userID, profileID, friendRequestID }: Props) {
  const [requestID, setRequestID] = useState<string | undefined>(friendRequestID);
  const [friendType, setFriendType] = useState<FriendType | "transitioning">(friendStatus);
  const handleSendFriendRequest = () => {
    if (friendType !== "transitioning") {
      setFriendType("transitioning");
      const promise = makeFriendRequest({ receiverUserID: profileID, senderUserID: userID })
        .then((res) => {
          if (!res.ok) {
            throw new Error();
          }
          setFriendType("request-sent");
          return res.json();
        })
        .then((data) => {
          setRequestID(data.data.data);
        })
        .catch(() => {
          setFriendType("not-friends");
        });
      toast.promise(promise, {
        success: "Friend Request Sent",
        pending: "Sending...",
        error: "Error. Please Try Again Later",
      });
    }
  };
  const handleRetractFriendRequest = () => {
    if (friendType !== "transitioning" && typeof requestID == "string") {
      setFriendType("transitioning");
      const promise = deleteFriendRequest(requestID)
        .then((res) => {
          if (!res.ok) {
            throw new Error();
          }
          setFriendType("not-friends");
          return res.json();
        })
        .catch(() => {
          setFriendType("request-sent");
        });
      toast.promise(promise, {
        success: "Friend Request Retracted",
        pending: "Retracting Request",
        error: "Error. Please Try Again Later",
      });
    }
  };
  const handleAddFriend = () => {
    if (friendType !== "transitioning" && typeof requestID == "string") {
      setFriendType("transitioning");
      const promise = acceptFriendRequest(requestID)
        .then((res) => {
          if (!res.ok) {
            throw new Error();
          }
          setFriendType("friends");
          setRequestID(undefined);
        })
        .catch(() => {
          setFriendType("request-pending");
        });
      toast.promise(promise, {
        success: "Friend Request Accepted",
        pending: "Accepting...",
        error: "Error. Please Try Again Later",
      });
    }
  };
  const handleDeleteFriend = () => {
    if (friendType !== "transitioning" && typeof requestID == "string") {
      setFriendType("transitioning");
      const promise = removeFriend({ friendID: userID, requestorID: profileID })
        .then((res) => {
          if (!res.ok) {
            throw new Error();
          }
          setFriendType("not-friends");
        })
        .catch(() => {
          setFriendType("friends");
        });
      toast.promise(promise, {
        success: "Friend Removed",
        pending: "Removing...",
        error: "Error. Please Try Again Later",
      });
    }
  };

  const content: JSX.Element = (() => {
    console.log(friendType);
    switch (friendType) {
      case "friends": {
        return (
          <div>
            <button className="px-2 py-1 rounded-lg bg-red-900" onClick={handleDeleteFriend}>
              Remove Friend
            </button>
          </div>
        );
      }
      case "not-friends": {
        return (
          <div>
            <button className="px-2 py-1 rounded-lg bg-green-900" onClick={handleSendFriendRequest}>
              Send Friend Request
            </button>
          </div>
        );
      }
      case "request-pending": {
        return (
          <div>
            <button className="px-2 py-1 rounded-lg bg-green-900" onClick={handleAddFriend}>
              Accept Friend Request
            </button>
          </div>
        );
      }
      case "request-sent": {
        return (
          <div>
            <button className="px-2 py-1 rounded-lg bg-red-900" onClick={handleRetractFriendRequest}>
              Retract Friend Request
            </button>
          </div>
        );
      }
      case "transitioning": {
        return (
          <div>
            <button className="px-2 py-1 rounded-lg bg-gray-300 text-black">Requesting...</button>
          </div>
        );
      }
      default: {
        return <div> There has been an error! </div>;
      }
    }
  })();

  return content;
}
