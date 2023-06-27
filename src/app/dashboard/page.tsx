import { authOptions } from "../api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import MainContainer from "@/lib/sharedComponents/MainContainer";
import SearchBar from "@/lib/sharedComponents/SearchBar";
import TopMovies from "./components/TopMovies";
import getPopularMovies from "@/lib/TMDB/getPopularMovies";
import _mongo from "@/lib/mongoDB/_mongo";
import UserMovieList from "./components/UserMovieLists";
import UserContext from "@/lib/providers/UserProvider";
import getAllMovies from "@/lib/TMDB/getAllMovies";
import { getUserListByName } from "@/lib/utils/getUserListByName";

async function Dashboard() {
  let session, content;
  session = await getServerSession(authOptions);

  if (session === null) {
    redirect("/unauthorized");
  } else {
    const [movies, user] = await Promise.all([
      getPopularMovies(),
      _mongo.user.retrieveUser(session.user.email as string, session.user.provider as string),
    ]);
    if (user) {
      //MovieMap Loaded With Every Fetched Popular Movie
      const movieMap = new Map<number, FetchedMovie>();
      movies.forEach((movie) => movieMap.set(movie.id, movie));
      //Split out the _id from the user, create a simplified user object
      const { _id, ...simplifiedUser } = user;
      //Take the user's watch list and pull out any movie id's we've already requested in PopularMovies
      const simpUserWatchList = getUserListByName(simplifiedUser, "Watch List");
      const reducedSimpUserWatchList = [...simpUserWatchList.movies].reduce((acc, cur) => {
        if (!movieMap.get(cur)) {
          acc.push(cur);
        }
        return acc;
      }, [] as Array<number>);
      //Request the movies we haven't already requested
      const fetchedUserWatchList = await getAllMovies(reducedSimpUserWatchList);
      //Once we have them, add them into the movieMap for the dashboard
      fetchedUserWatchList.forEach((movie) => movieMap.set(movie.id, movie));
      content = (
        <MainContainer>
          <SearchBar lastSearch="" />
          <UserContext user={simplifiedUser} movieMap={movieMap}>
            <TopMovies
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
              listTitle="Your Watchlist"
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
