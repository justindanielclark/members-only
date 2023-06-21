import { authOptions } from "../api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import MainContainer from "@/lib/sharedComponents/MainContainer";
import Search from "./components/Search";
import TopMovies from "./components/TopMovies";
import getPopularMovies from "@/lib/TMDB/getPopularMovies";
import _mongo from "@/lib/mongoDB/_mongo";
import UserMovieList from "./components/UserMovieLists";

async function Dashboard() {
  let session, content;
  session = await getServerSession(authOptions);

  if (session === null) {
    redirect("/unauthorized");
  } else {
    const movies = await getPopularMovies();
    const user = await _mongo.user.retrieveUser(session.user.email as string, session.user.provider as string);
    content = (
      <MainContainer>
        <Search />
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
      </MainContainer>
    );
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
