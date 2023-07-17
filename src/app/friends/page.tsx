import MainContainer from "@/lib/sharedComponents/MainContainer";
import getSessionOnServer from "@/lib/providers/getSessionOnServer";
import { redirect } from "next/navigation";
import _mongo from "@/lib/mongoDB/_mongo";
import Accordian from "@/lib/sharedComponents/Containers/Accordian";
import SubmitFriendRequestForm from "./components/SubmitFriendRequestForm";
import MainHeader from "@/lib/sharedComponents/Headers/MainHeader";
import Friends from "./components/Friends";
import { WithId } from "mongodb";
import { FriendRequest, User } from "../../../types/types";
import { getUserListByName } from "@/lib/utils/getUserListByName";
import FriendRequestList from "./components/FriendRequestsList";
import SubHeader from "@/lib/sharedComponents/Headers/SubHeader";

export default async function FriendsPage() {
  const session = await getSessionOnServer();
  if (session == null) {
    redirect("/unauthorized");
  }
  const user = await _mongo.user.retrieveUser(session.user.email as string, session.user.provider as string);

  if (user) {
    //Grab All Friend IDs, and all incoming and outgoing friend requests
    const [friends, outgoingRequests, incomingRequests] = await Promise.all([
      Promise.all(user.friends.map((friend) => _mongo.user.retrieveUserByID(friend))) as Promise<Array<WithId<User>>>,
      _mongo.friendRequests.retrieveFriendRequestsByID(user._id.toString(), "senderID"),
      _mongo.friendRequests.retrieveFriendRequestsByID(user._id.toString(), "receiverID"),
    ]);

    //Declare an empty array of requests for user info to be populated once we know if there are incoming/outgoing friend requests
    const userInfoPromises: Array<Promise<WithId<User> | null>> = [];
    //Declare an empty map to store user information to be passed to other components so they can do a quick lookup of the user
    const userMap = new Map<string, WithId<User>>();
    //Declare empty arrays to store the date sorted Friend Requests
    let sortedIncomingRequests: WithId<FriendRequest>[] = [];
    let sortedOutgoingRequests: WithId<FriendRequest>[] = [];
    const friendRequestUsers = [];
    if (incomingRequests.length > 0 || outgoingRequests.length > 0) {
      //Only If there are any incoming requests, do we setup the process of sorting them AND starting the promises to request their related User Data
      if (incomingRequests.length > 0) {
        sortedIncomingRequests.push(
          ...incomingRequests.sort((a, b) => {
            return a.sent.getTime() - b.sent.getTime();
          })
        );
        incomingRequests.forEach((request) => {
          userInfoPromises.push(_mongo.user.retrieveUserByID(request.senderID));
        });
      }
      //Only If there are any outgoing requests, do we setup the process of sorting them AND starting the promises to request their related User Data
      if (outgoingRequests.length > 0) {
        sortedOutgoingRequests.push(
          ...outgoingRequests.sort((a, b) => {
            return a.sent.getTime() - b.sent.getTime();
          })
        );
        outgoingRequests.forEach((request) => {
          userInfoPromises.push(_mongo.user.retrieveUserByID(request.receiverID));
        });
      }
      //Request All The Friend User Data At The Same Time, Filter Out Any Possible Nulls, And Set Em To the Map for Easy Lookup via user._id
      friendRequestUsers.push(...(await Promise.all(userInfoPromises)));
      const filteredUsers = friendRequestUsers.filter((user) => (user ? true : false)) as Array<WithId<User>>;
      filteredUsers.forEach((user) => {
        userMap.set(user._id.toString(), user);
      });
    }
    //Build a Map Of All Movies The User Has Watched For Easy Lookup
    const selfUserWatchedMoviesMap = new Map<number, boolean>();
    getUserListByName(user, "Watch List").movies.forEach((movie) => {
      selfUserWatchedMoviesMap.set(movie, true);
    });
    //Go Through Each Friend and Store a Number Representing How Many Shared Movies They Have By Referencing Said Above Map
    const sharedMoviesNumArray = friends.map((friend) => {
      let shared = 0;
      const friendWatchList = getUserListByName(friend, "Watch List");
      friendWatchList.movies.forEach((movie) => {
        if (selfUserWatchedMoviesMap.get(movie)) {
          shared++;
        }
      });
      return shared;
    });

    return (
      <MainContainer>
        <div className="max-w-xl mx-auto">
          <section>
            <SubHeader>Your Friends:</SubHeader>
            <Friends user={user} friends={friends} sharedMovies={sharedMoviesNumArray} />
          </section>

          {incomingRequests.length > 0 ? (
            <section>
              <SubHeader>Received Requests:</SubHeader>
              <FriendRequestList friendRequests={sortedIncomingRequests} lookup="senderID" userMap={userMap} />
            </section>
          ) : undefined}
          {outgoingRequests.length > 0 ? (
            <section>
              <SubHeader>Sent Requests:</SubHeader>
              <FriendRequestList friendRequests={sortedOutgoingRequests} lookup="receiverID" userMap={userMap} />
            </section>
          ) : undefined}

          <SubmitFriendRequestForm profileUserID={user._id.toString()} />
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
