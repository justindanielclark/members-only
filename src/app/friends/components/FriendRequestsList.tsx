import { FriendRequest } from "../../../../types/types";
import { WithId } from "mongodb";
import { User } from "../../../../types/types";
import ImageWithFallback from "@/lib/sharedComponents/FallbackImage";
import OutGoingRequestListItemActions from "./client/OutgoingRequestListItemActions";

type Props = {
  lookup: "senderID" | "receiverID";
  friendRequests: Array<WithId<FriendRequest>>;
  userMap: Map<string, WithId<User>>;
};
export default function FriendRequestList({ friendRequests, userMap, lookup }: Props) {
  const requests: Array<JSX.Element> = [];
  friendRequests.forEach((request) => {
    const user = lookup === "receiverID" ? userMap.get(request.receiverID) : userMap.get(request.senderID);
    if (user) {
      requests.push(
        lookup === "receiverID" ? (
          <OutgoingRequestListItem user={user} request={request} key={user._id.toString()} />
        ) : (
          <IncomingRequestListItem user={user} request={request} key={user._id.toString()} />
        )
      );
    }
  });
  return <ul className="border-white/10 border-b-2 border-r-2">{requests}</ul>;
}

type RequestListItemProps = {
  request: WithId<FriendRequest>;
  user: WithId<User>;
};

function IncomingRequestListItem({ request, user }: RequestListItemProps) {
  return (
    <li className="grid grid-cols-[32px_1fr] sm:items-center items-start p-2 even:bg-slate-900/20 odd:bg-slate-700/20 hover:bg-slate-800 cursor-pointer">
      {/* Image */}
      <ImageWithFallback
        src={user.photoPath}
        width={32}
        height={32}
        alt={`${user.handle} Profile Photo`}
        crossOrigin=""
        priority={true}
        className="rounded-lg h-8 max-h-8 w-8 max-w-8"
      />
      <div className="flex sm:flex-row flex-col px-2">
        {/* Name and Info */}
        <div className="sm:flex-1">
          <div className="flex-1 flex flex-col">
            <h2 className="text-xl">{user.handle}</h2>
            <p className="text-xs">{`Received ${request.sent.toLocaleDateString()}`}</p>
          </div>
        </div>
        {/* Actions */}
        <div className="flex sm:flex-col flex-row text-xs h-full justify-end gap-2 sm:gap-0">
          <button className="text-right hover:underline p-1 grow-0 shrink">View Profile</button>
          <button className="text-green-400  text-right hover:underline p-1 grow-0 shrink">Accept</button>
          <button className="text-red-400  text-right hover:underline p-1 grow-0 shrink">Deny</button>
        </div>
      </div>
    </li>
  );
}

function OutgoingRequestListItem({ request, user }: RequestListItemProps) {
  return (
    <li className="grid grid-cols-[32px_1fr] sm:items-center items-start p-2 even:bg-slate-900/20 odd:bg-slate-700/20 hover:bg-slate-800">
      {/* Image */}
      <ImageWithFallback
        src={user.photoPath}
        width={32}
        height={32}
        alt={`${user.handle} Profile Photo`}
        crossOrigin=""
        priority={true}
        className="rounded-lg h-8 max-h-8 w-8 max-w-8"
      />
      <div className="flex sm:flex-row flex-col px-2">
        {/* Name and Info */}
        <div className="sm:flex-1">
          <div className="flex-1 flex flex-col">
            <h2 className="text-xl">{user.handle}</h2>
            <p className="text-xs">{`Sent ${request.sent.toLocaleDateString()}`}</p>
          </div>
        </div>
        {/* Actions */}
        <OutGoingRequestListItemActions profileID={user._id.toString()} requestID={request._id.toString()} />
      </div>
    </li>
  );
}
