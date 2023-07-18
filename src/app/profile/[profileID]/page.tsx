import _mongo from "@/lib/mongoDB/_mongo";
import { authOptions } from "../../api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import MainContainer from "@/lib/sharedComponents/MainContainer";
import { notFound } from "next/navigation";
import ImageWithFallback from "@/lib/sharedComponents/FallbackImage";
import getAllMovies from "@/lib/TMDB/getAllMovies";
import { getUserListByName } from "@/lib/utils/getUserListByName";
import UserContext from "@/lib/providers/UserProvider";
import UserMovieList from "@/lib/sharedComponents/UserMovieList";
import SectionContainer from "@/lib/sharedComponents/Containers/SectionContainer";
import SubHeader from "@/lib/sharedComponents/Headers/SubHeader";

type Props = {
  params: {
    profileID: string;
  };
};

export default async function profilePage({ params: { profileID } }: Props) {
  let session, content;
  session = await getServerSession(authOptions);

  if (session === null) {
    return redirect("/unauthorized");
  } else {
    const [user, profile] = await Promise.all([
      _mongo.user.retrieveUser(session.user.email as string, session.user.provider as string),
      _mongo.user.retrieveUserByID(profileID),
    ]);
    if (profile == null) {
      return notFound();
    }
    if (user && profile) {
      if (user._id.toString() === profile._id.toString()) {
        return redirect("/profile");
      }
      const userList = getUserListByName(user, "Watch List").movies;
      const profileList = getUserListByName(profile, "Watch List").movies;
      const uniqueMovies = new Map<number, boolean>();
      const allMovies: Array<number> = [];
      const sharedMovies: Array<number> = [];

      //Remove duplicate movies by adding them into a map, populate array of shared movies
      if (userList.length > profileList.length) {
        allMovies.push(...userList);
        userList.forEach((movie) => uniqueMovies.set(movie, true));
        profileList.forEach((movie) => {
          if (uniqueMovies.get(movie) == undefined) {
            uniqueMovies.set(movie, true);
          } else {
            sharedMovies.push(movie);
          }
        });
      } else {
        allMovies.push(...profileList);
        profileList.forEach((movie) => uniqueMovies.set(movie, true));
        userList.forEach((movie) => {
          if (uniqueMovies.get(movie) == undefined) {
            uniqueMovies.set(movie, true);
          } else {
            sharedMovies.push(movie);
          }
        });
      }
      //Get All Movie Data and Store It In Map To Pass Along To Other Components
      const uniqueMoviesArray = await getAllMovies(Array.from(uniqueMovies.keys()));
      const movieMap = new Map<number, FetchedMovie>();
      uniqueMoviesArray.forEach((movie) => {
        movieMap.set(movie.id, movie);
      });

      content = (
        <MainContainer>
          <div className="flex flex-row gap-4 items-center border-b-2 border-white p-4">
            <ImageWithFallback
              src={profile.photoPath}
              width={40}
              height={40}
              alt="User Profile Photo"
              crossOrigin=""
              priority={true}
              className="rounded-lg h-20 max-h-20 w-20 max-w-20"
            />
            <h1 className="text-3xl font-bold">
              {profile.handle}
              {"'s Profile"}
            </h1>
          </div>
          {profile.aboutMe.length > 0 ? (
            <SectionContainer>
              <SubHeader>About Me:</SubHeader>
              <p className="p-4">{profile.aboutMe}</p>
            </SectionContainer>
          ) : undefined}
          {profileList.length > 0 ? (
            <UserContext movieMap={movieMap} user={user}>
              <UserMovieList listTitle={`${profile.handle}'s Watch List`} list={profileList} />
            </UserContext>
          ) : undefined}
          {sharedMovies.length > 0 ? (
            <UserContext movieMap={movieMap} user={user}>
              <UserMovieList listTitle="Common Watch List Movies" list={sharedMovies} />
            </UserContext>
          ) : undefined}
        </MainContainer>
      );
    } else {
      throw new Error("Unable to load user/profile content...");
    }
  }
  return content;
}
