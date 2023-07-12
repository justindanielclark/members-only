import MainContainer from "@/lib/sharedComponents/MainContainer";
import getSessionOnServer from "@/lib/providers/getSessionOnServer";
import { redirect } from "next/navigation";
import _mongo from "@/lib/mongoDB/_mongo";
import Accordian from "@/lib/sharedComponents/Containers/Accordian";
import SubmitFriendRequestForm from "./components/SubmitFriendRequestForm";
import MainHeader from "@/lib/sharedComponents/Headers/MainHeader";
import Friends from "./components/Friends";
import { WithId } from "mongodb";
import { User } from "../../../types/types";

export default async function FriendsPage() {
  const session = await getSessionOnServer();
  if (session == null) {
    redirect("/unauthorized");
  }
  const user = await _mongo.user.retrieveUser(session.user.email as string, session.user.provider as string);

  if (user) {
    const friends = (await Promise.all(user.friends.map((friend) => _mongo.user.retrieveUserByID(friend)))).filter(
      (friend) => friend !== null
    ) as Array<WithId<User>>;
    const outgoingRequests = await _mongo.friendRequests.retrieveFriendRequestsByID(user._id.toString(), "senderID");
    const incomingRequests = await _mongo.friendRequests.retrieveFriendRequestsByID(user._id.toString(), "senderID");
    return (
      <MainContainer>
        <div className="max-w-xl mx-auto p-4">
          <SubmitFriendRequestForm profileUserID={user._id.toString()} />
          <Accordian title="Your Friends:" openOnLoad={false}>
            <Friends friends={friends} />
          </Accordian>
          <Accordian title="Received Friend Requests:" openOnLoad={false}>
            <div>You have no friends</div>
          </Accordian>
          <Accordian title="Sent Friend Requests:" openOnLoad={false}>
            <div>You have no friends</div>
          </Accordian>
        </div>
      </MainContainer>
    );
  } else {
    return (
      <MainContainer>
        <MainHeader>
          There has been an issue with the server in retrieving User Data. Please try again later.
        </MainHeader>
      </MainContainer>
    );
  }
}
