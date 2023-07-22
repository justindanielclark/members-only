import getMovieCredits from "@/lib/TMDB/getMovieCredits";
import getMovieDetails from "@/lib/TMDB/getMovieDetails";
import { SubMainContainer, mainContainerDefaultClasses } from "@/lib/sharedComponents/MainContainer";
import { notFound } from "next/navigation";
import reduceCrew from "@/lib/utils/reduceCrew";
import getSessionOnServer from "@/lib/providers/getSessionOnServer";
import { redirect } from "next/navigation";
import getMovieRecommendations from "@/lib/TMDB/getMovieRecommendations";
import { Metadata } from "next";
import UserContext from "@/lib/providers/UserProvider";
import _mongo from "@/lib/mongoDB/_mongo";
import BannerContent from "./components/content/BannerContent";
import CastAndCrew from "./components/content/CastAndCrew";
import Recommendations from "./components/content/Recommendations";
import { MovieReviewData, User } from "../../../../types/types";
import { WithId } from "mongodb";
import Reviews from "./components/content/Reviews";

type Props = {
  params: {
    movieID: string;
  };
};

export async function generateMetadata({ params: { movieID } }: Props): Promise<Metadata> {
  const id = Number.parseInt(movieID);
  if (Number.isNaN(id)) {
    notFound();
  }
  const fetchedMovie = await getMovieDetails(id);
  if (!fetchedMovie.hasOwnProperty("message")) {
    return {
      title: `MovieBase: ${(fetchedMovie as MovieDetails).title}`,
      description: `Movie Page For ${(fetchedMovie as MovieDetails).title}`,
    };
  }
  return {
    title: "Unknown Movie ID",
  };
}

export default async function MoviePage({ params: { movieID } }: Props) {
  //Redirect if not logged in
  const session = await getSessionOnServer();
  if (session == null) {
    redirect("/unauthorized");
  }
  //Redirect if param is not a number
  const id = Number.parseInt(movieID);
  if (Number.isNaN(id)) {
    notFound();
  }
  const [fetchedMovie, fetchedCredits, fetchedRecommendations, reviews, user] = await Promise.all([
    getMovieDetails(id),
    getMovieCredits(id),
    getMovieRecommendations(id),
    _mongo.movieReviews.retriveAllMovieReviewsByMovieID(id),
    _mongo.user.retrieveUser(session.user.email as string, session.user.provider as string),
  ]);
  if (user) {
    if (!fetchedMovie.hasOwnProperty("message")) {
      const movie = fetchedMovie as MovieDetails;
      const { _id, ...simplifiedUser } = user;
      const movieMap = new Map<number, FetchedMovie>();
      const { cast, crew } = fetchedCredits as Cast;
      const reducedCrew = reduceCrew(crew);
      fetchedRecommendations.forEach((m) => movieMap.set(movie.id, m));
      const reviewers = await Promise.all(
        reviews.map((review) => {
          return _mongo.user.retrieveUserByID(review.user);
        })
      );
      const reviewerMap = new Map<string, WithId<User>>();
      reviewers.forEach((reviewer) => {
        if (reviewer) {
          reviewerMap.set(reviewer._id.toString(), reviewer);
        }
      });
      const reviewData = reviews.reduce((acc, cur) => {
        const { _id, ...reviewWithoutID } = cur;
        const user = reviewerMap.get(cur.user);
        if (user) {
          acc.push({ review: cur, user });
        }
        return acc;
      }, [] as MovieReviewData);

      return (
        <main className={mainContainerDefaultClasses}>
          <UserContext movieMap={movieMap} user={simplifiedUser}>
            <BannerContent movie={movie} />
            <SubMainContainer className="px-4 py-4 flex flex-col">
              <CastAndCrew cast={cast} crew={reducedCrew} movie={movie} />
              <Recommendations movies={fetchedRecommendations} />
              <Reviews data={reviewData} />
            </SubMainContainer>
          </UserContext>
        </main>
      );
    } else {
      notFound();
    }
  } else {
    return (
      <SubMainContainer>
        <h1 className="text-xl font-bold">
          Unable to pull User Data from server to render this page. Please try again later...
        </h1>
      </SubMainContainer>
    );
  }
}
