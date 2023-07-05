import { authOptions } from "../api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import MainContainer from "@/lib/sharedComponents/MainContainer";
import _mongo from "@/lib/mongoDB/_mongo";
import { Metadata } from "next";
import ProfileForm from "./components/ProfileForm";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "MovieBase: Your Profile",
  };
}

async function Dashboard() {
  let session, content;
  session = await getServerSession(authOptions);

  if (session === null) {
    redirect("/unauthorized");
  } else {
    const user = await _mongo.user.retrieveUser(session.user.email as string, session.user.provider as string);
    if (user) {
      const { _id, ...simplifiedUser } = user;
      const userID = _id.toString();
      content = (
        <MainContainer>
          <div className="max-w-xl mx-auto p-4">
            <h1 className="text-2xl font-bold my-8">User Profile / Settings</h1>
            <ProfileForm
              user={simplifiedUser}
              userID={userID}
              provider={session.user.provider as string}
              imgsrc={session.user.image as string}
            />
          </div>
        </MainContainer>
      );
    } else {
      content = (
        <MainContainer>
          <h1 className="text-2xl font-bold my-8">
            There has been an issue with the server in retrieving User Data. Please try again later.
          </h1>
        </MainContainer>
      );
    }
  }
  return content;
}

export default Dashboard;
