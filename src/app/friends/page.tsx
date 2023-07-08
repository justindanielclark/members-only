import MainContainer from "@/lib/sharedComponents/MainContainer";
import getSessionOnServer from "@/lib/providers/getSessionOnServer";
import { redirect } from "next/navigation";
import _mongo from "@/lib/mongoDB/_mongo";
import Accordian from "@/lib/sharedComponents/Containers/Accordian";
import SubmitFriendRequestForm from "./components/SubmitFriendRequestForm";
import MainHeader from "@/lib/sharedComponents/Headers/MainHeader";

export default async function FriendsPage() {
  const session = await getSessionOnServer();
  if (session == null) {
    redirect("/unauthorized");
  }
  const user = await _mongo.user.retrieveUser(session.user.email as string, session.user.provider as string);
  if (user) {
    return (
      <MainContainer>
        <div className="max-w-xl mx-auto p-4">
          <SubmitFriendRequestForm profileUserID={user._id.toString()} />
          <Accordian title="Your Friends:" openOnLoad={false}>
            <div>You have no friends</div>
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
