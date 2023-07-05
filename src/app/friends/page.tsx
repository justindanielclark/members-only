import MainContainer from "@/lib/sharedComponents/MainContainer";
import getSessionOnServer from "@/lib/providers/getSessionOnServer";
import { redirect } from "next/navigation";
import _mongo from "@/lib/mongoDB/_mongo";
import MainHeader from "@/lib/sharedComponents/Headers/MainHeader";
import SubHeader from "@/lib/sharedComponents/Headers/SubHeader";

export default async function FriendsPage() {
  const session = await getSessionOnServer();
  if (session == null) {
    redirect("/unauthorized");
  }
  const user = await _mongo.user.retrieveUser(session.user.email as string, session.user.provider as string);

  return (
    <MainContainer>
      <MainHeader>Friends:</MainHeader>
      <SubHeader>Your Friends:</SubHeader>
      <SubHeader>Friend Requests:</SubHeader>
      <SubHeader>Sent Friend Requests:</SubHeader>
    </MainContainer>
  );
}
