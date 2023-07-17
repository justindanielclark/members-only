import { WithId } from "mongodb";
import { User } from "../../../../types/types";
import ImageWithFallback from "@/lib/sharedComponents/FallbackImage";
import FriendActions from "./client/FriendActions";

type Props = {
  user: WithId<User>;
  friends: Array<WithId<User>>;
  sharedMovies: Array<number>;
};

export default function Friends({ user, friends, sharedMovies }: Props) {
  if (friends.length === 0) {
    return (
      <div className="p-4 border-white/10 border-b-2 border-r-2">
        {"You'll Need To Add Some Friends To See Them Here"}
      </div>
    );
  }
  const userID = user._id.toString();
  return (
    <ul className="border-white/10 border-b-2 border-r-2">
      {friends.map((friend, idx) => (
        <Friend key={friend._id.toString()} friend={friend} numShared={sharedMovies[idx]} userID={userID} />
      ))}
    </ul>
  );
}

type FriendProps = {
  userID: string;
  friend: WithId<User>;
  numShared: number;
};
function Friend({ userID, friend, numShared }: FriendProps) {
  return (
    <li className="grid grid-cols-[32px_1fr] sm:items-center items-start p-2 even:bg-slate-900/20 odd:bg-slate-700/20 hover:bg-slate-800 cursor-pointer">
      {/* Image */}
      <ImageWithFallback
        src={friend.photoPath}
        width={32}
        height={32}
        alt={`${friend.handle} Profile Photo`}
        crossOrigin=""
        priority={true}
        className="rounded-lg h-8 max-h-8 w-8 max-w-8"
      />
      <div className="flex sm:flex-row flex-col px-2">
        {/* Name and Info */}
        <div className="sm:flex-1">
          <div className="flex-1 flex flex-col">
            <h2 className="text-xl">{friend.handle}</h2>
            <p className="text-xs px-1">{`${numShared} shared in watchlist`}</p>
          </div>
        </div>
        {/* Actions */}
        <FriendActions friendID={friend._id.toString()} requestorID={userID} />
      </div>
    </li>
  );
}
