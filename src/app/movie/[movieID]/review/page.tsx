import getSessionOnServer from "@/lib/providers/getSessionOnServer";
import MainContainer from "@/lib/sharedComponents/MainContainer";
import { redirect, notFound } from "next/navigation";
import getMovieDetails from "@/lib/TMDB/getMovieDetails";
import _mongo from "@/lib/mongoDB/_mongo";
import ReviewForm from "./components/ReviewForm";
type Props = {
  params: {
    movieID: string;
  };
};
export default async function page({ params: { movieID } }: Props) {
  const session = await getSessionOnServer();
  if (session == null) {
    redirect("/unauthorized");
  }
  //Redirect if param is not a number
  const id = Number.parseInt(movieID);
  if (Number.isNaN(id)) {
    notFound();
  }
  const [fetchedMovie, user] = await Promise.all([
    getMovieDetails(id),
    _mongo.user.retrieveUser(session.user.email as string, session.user.provider as string),
  ]);
  if (user && !fetchedMovie.hasOwnProperty("message")) {
    const movie = fetchedMovie as MovieDetails;
    return (
      <>
        <MainContainer>
          <ReviewForm movie={movie} />
        </MainContainer>
      </>
    );
  } else {
    return notFound();
  }
}
