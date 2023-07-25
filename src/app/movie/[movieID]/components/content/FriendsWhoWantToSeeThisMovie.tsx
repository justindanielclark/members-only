import { WithId } from "mongodb";
import Link from "next/link";
import { User } from "../../../../../../types/types";
import Accordian from "@/lib/sharedComponents/Containers/Accordian";
import ImageWithFallback from "@/lib/sharedComponents/FallbackImage";
type Props = {
  friends: Array<WithId<User>>;
};
export default function FriendsWhoWantToSeeThisMovie({ friends }: Props) {
  if (friends.length === 0) return undefined;

  return (
    <Accordian title={`In Your Friends Watchlist (${friends.length})`} openOnLoad={false}>
      <ul className="p-4 grid grid-flow-col lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 [&>*:nth-child(7n+1)]:bg-slate-950/10 [&>*:nth-child(7n+2)]:bg-slate-950/20 [&>*:nth-child(7n+3)]:bg-slate-950/30 [&>*:nth-child(7n+4)]:bg-slate-950/40 [&>*:nth-child(7n+5)]:bg-slate-950/30 [&>*:nth-child(7n+6)]:bg-slate-950/20 [&>*:nth-child(7n+7)]:bg-slate-950/10">
        {friends.map((friend) => (
          <FriendListing key={friend.handle} user={friend} />
        ))}
      </ul>
    </Accordian>
  );
}

type FriendListingProps = {
  user: WithId<User>;
};
function FriendListing({ user }: FriendListingProps) {
  return (
    <li>
      <Link href={`/profile/${user._id.toString()}`} className="rounded-lg overflow-hidden">
        <div className="flex flex-row items-center gap-4 p-4 rounded-lg">
          <ImageWithFallback
            src={user.photoPath}
            width={40}
            height={40}
            alt={`${user.handle} profile photo`}
            crossOrigin=""
            priority={true}
            className="rounded-lg h-10 max-h-10 w-10 max-w-10 border-white border"
          />
          <p className="font-bold">{user.handle}</p>
        </div>
      </Link>
    </li>
  );
}
