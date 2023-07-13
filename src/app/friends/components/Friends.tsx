import { WithId } from "mongodb";
import { User } from "../../../../types/types";
import ImageWithFallback from "@/lib/sharedComponents/FallbackImage";

type Props = {
  friends: Array<WithId<User>>;
  sharedMovies: Array<number>;
};

export default function Friends({ friends, sharedMovies }: Props) {
  if (friends.length === 0) {
    return (
      <div className="p-4 border-white/10 border-b-2 border-r-2">
        {"You'll Need To Add Some Friends To See Them Here"}
      </div>
    );
  }

  return (
    <ul className="border-white/10 border-b-2 border-r-2">
      {friends.map((friend, idx) => (
        <Friend key={friend._id.toString()} user={friend} numShared={sharedMovies[idx]} />
      ))}
    </ul>
  );
}

type FriendProps = {
  user: User;
  numShared: number;
};
function Friend({ user, numShared }: FriendProps) {
  let counter = 0;

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
            <p className="text-xs px-1">{`${numShared} shared in watchlist`}</p>
          </div>
        </div>
        {/* Actions */}
        <div className="flex sm:flex-col flex-row text-xs h-full justify-end gap-2 sm:gap-0">
          <button className="text-right hover:underline p-1 grow-0 shrink">View Profile</button>
          <button className="text-red-400  text-right hover:underline p-1 grow-0 shrink">Remove Friend</button>
        </div>
      </div>
    </li>
  );
}
