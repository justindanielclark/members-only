import { authOptions } from "../api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import MainContainer from "@/lib/sharedComponents/MainContainer";
import SearchBar from "@/lib/sharedComponents/SearchBar";
import getPopularMovies from "@/lib/TMDB/getPopularMovies";
import _mongo from "@/lib/mongoDB/_mongo";
import UserMovieList from "@/lib/sharedComponents/UserMovieList";
import UserContext from "@/lib/providers/UserProvider";
import getAllMovies from "@/lib/TMDB/getAllMovies";
import { getUserListByName } from "@/lib/utils/getUserListByName";
import { Metadata } from "next";
import MovieCardSlider from "@/lib/sharedComponents/Containers/MovieCardSlider";
import { Session } from "next-auth";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "MovieBase: Dashboard",
  };
}

async function Dashboard() {
  let session: Session | null;
  let content: React.ReactNode;
  session = await getServerSession(authOptions);

  if (session === null) {
    redirect("/unauthorized");
  } else {
    const [movies, user] = await Promise.all([
      getPopularMovies(),
      _mongo.user.retrieveUser(session.user.email as string, session.user.provider as string),
    ]);
    if (user) {
      //MovieMap - Repo for All Fetched Movies By MovieID
      const movieMap = new Map<number, FetchedMovie>();
      //userMovieMap - A Map for Comparisons of User Watch List Movies
      const userMovieMap = new Map<number, boolean>();
      //sharedMoviesMap - A Map of What You and Your Friends Both Want To See
      const sharedMoviesMap = new Map<number, Array<string>>();
      movies.forEach((movie) => movieMap.set(movie.id, movie));
      const { _id, ...simplifiedUser } = user;
      const simpUserWatchList = getUserListByName(simplifiedUser, "Watch List");
      simpUserWatchList.movies.forEach((movie) => {
        userMovieMap.set(movie, true);
      });
      const reducedSimpUserWatchList = [...simpUserWatchList.movies].reduce((acc, cur) => {
        if (!movieMap.get(cur)) {
          acc.push(cur);
        }
        return acc;
      }, [] as Array<number>);
      const fetchedUserWatchList = await getAllMovies(reducedSimpUserWatchList);
      fetchedUserWatchList.forEach((movie) => movieMap.set(movie.id, movie));
      const friends = await Promise.all(user.friends.map((friendID) => _mongo.user.retrieveUserByID(friendID)));
      friends.forEach((friend) => {
        if (friend) {
          const friendList = getUserListByName(friend, "Watch List");
          friendList.movies.forEach((movie) => {
            if (userMovieMap.get(movie)) {
              const mapEntry = sharedMoviesMap.get(movie);
              if (mapEntry) {
                mapEntry.push(friend._id.toString());
              } else {
                sharedMoviesMap.set(movie, [friend._id.toString()]);
              }
            }
          });
        }
      });
      const sortedReducedSharedMoviesArray = Array.from(sharedMoviesMap)
        .sort((a, b) => {
          return a.length - b.length;
        })
        .reduce((acc, cur) => {
          acc.push(cur[0]);
          return acc;
        }, [] as Array<number>);

      content = (
        <MainContainer>
          <SearchBar />
          <UserContext user={simplifiedUser} movieMap={movieMap}>
            <MovieCardSlider
              title="Today's Top Movies:"
              movies={movies.reduce((acc, cur) => {
                acc.push(cur.id);
                return acc;
              }, [] as Array<number>)}
            />
            <UserMovieList
              list={simpUserWatchList.movies}
              emptyRender={emptyWatchlist(
                "Your Watchlist",
                "This is currently empty. You'll need to add movies to your watchlist to fill this out."
              )}
              listTitle="Your Watchlist:"
            />
            <UserMovieList
              list={sortedReducedSharedMoviesArray}
              emptyRender={undefined}
              listTitle="Movies You and Your Friends Want to See:"
            />
          </UserContext>
        </MainContainer>
      );
    } else {
      content = (
        <MainContainer>
          There has been an issue with the server in retrieving User Data. Please try again later.
        </MainContainer>
      );
    }
  }
  return content;
}

function emptyWatchlist(title: string, notice: string) {
  return (
    <section className="m-2 p-2">
      <h1 className="text-2xl font-bold">{title}:</h1>
      <p className="h-poster max-h-poster p-2">{notice}</p>
    </section>
  );
}

export default Dashboard;
