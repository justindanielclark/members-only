import { User } from "../../../../types/types";
type Props = {
  friends: Array<User>;
};
export default function Friends({ friends }: Props) {
  if (friends.length === 0) {
    return <div>You have no Friends loser</div>;
  }
  return <div>You have so many friends!</div>;
}
