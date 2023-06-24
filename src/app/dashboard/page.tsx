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
import { User } from "../../../types/types";

async function Dashboard() {
  let session, content;
  session = await getServerSession(authOptions);

  if (session === null) {
    redirect("/unauthorized");
  } else {
    const movies = await getPopularMovies();
    const user = await _mongo.user.retrieveUser(session.user.email as string, session.user.provider as string);
    if (user) {
      const { _id, ...simplifiedUser } = user;
      content = (
        <MainContainer>
          <SearchBar lastSearch="" />
          <UserContext user={simplifiedUser}>
            <TopMovies movies={movies} />
            <UserMovieList
              list={[]}
              emptyRender={emptyWatchlist(
                "Your Watchlist",
                "You'll need to add movies to your watchlist to fill this out."
              )}
              listTitle="Your Watchlist"
            />
            <UserMovieList
              list={[]}
              emptyRender={emptyWatchlist("Seen", "Marking movies as 'Watched' will help fill this out.")}
              listTitle="Seen"
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
    <section className="m-2">
      <h1 className="text-2xl font-bold">{title}:</h1>
      <p>{notice}</p>
    </section>
  );
}

export default Dashboard;
