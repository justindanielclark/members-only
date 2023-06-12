import { authOptions } from "../api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import MainContainer from "../lib/sharedComponents/MainContainer";
import Search from "./Search/Search";
import TopMovies from "./TopMovies/TopMovies";
import getPopularMovies from "../lib/TMDB/getPopularMovies";

type Props = {};

async function Dashboard({}: Props) {
  let session, content;
  session = await getServerSession(authOptions);

  if (session === null) {
    redirect("/unauthorized");
  } else {
    const movies = await getPopularMovies();
    content = (
      <MainContainer>
        <Search />
        <TopMovies movies={movies} />
      </MainContainer>
    );
  }
  return content;
}

export default Dashboard;
