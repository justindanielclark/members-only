import getSessionOnServer from "@/lib/providers/getSessionOnServer";
import { redirect } from "next/navigation";
import MainContainer from "@/lib/sharedComponents/MainContainer";
import Link from "next/link";
import searchMovieTitle, { nothingFound } from "@/lib/TMDB/searchMovieTitle";
import SearchBar from "@/lib/sharedComponents/SearchBar";
import Result from "./component/Result";
import _mongo from "@/lib/mongoDB/_mongo";
import { Metadata } from "next";
import SectionContainer from "@/lib/sharedComponents/Containers/SectionContainer";
import MainHeader from "@/lib/sharedComponents/Headers/MainHeader";
import InvalidParamsContent from "./component/InvalidParamsPage";
import ValidParamsPage from "./component/ValidParamsPage";
import { SearchParameters } from "../../../types/types";

type UnconfirmedSearchParameters = {
  page?: string;
  query?: string;
};

type Props = {
  searchParams: { [key: string]: string | string[] | undefined };
};

function confirmSearchParams(usp: UnconfirmedSearchParameters): SearchParameters | null {
  if (usp.page && usp.query && usp.query !== "") {
    const pageConversion = Number.parseInt(usp.page);
    if (Number.isNaN(pageConversion)) {
      return null;
    }
    return {
      page: pageConversion,
      query: usp.query,
    };
  }
  return null;
}

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "MovieBase: Search Results",
  };
}

export default async function Search({ searchParams }: Props) {
  const session = await getSessionOnServer();
  if (!session) {
    redirect("/");
  }
  const confirmedParams = confirmSearchParams(searchParams);
  const [movies, user] = await Promise.all([
    (async () => {
      if (confirmedParams) {
        return await searchMovieTitle(confirmedParams.query, confirmedParams.page);
      }
      return nothingFound;
    })(),
    _mongo.user.retrieveUser(session.user.email as string, session.user.provider as string),
  ]);
  const movieMap = new Map<number, FetchedMovie>();
  movies.results.forEach((movie) => movieMap.set(movie.id, movie as FetchedMovie));
  if (user) {
    const { _id, ...simplifiedUser } = user;

    const content = (() => {
      //Search Params are invalid
      if (confirmedParams === null) {
        return <InvalidParamsContent />;
      }
      return (
        //Search Params are Valid
        <ValidParamsPage confirmedParams={confirmedParams} movies={movies} movieMap={movieMap} user={simplifiedUser} />
      );
    })();

    return <MainContainer>{content}</MainContainer>;
  } else {
    return (
      <MainContainer>
        <MainHeader>Unable To Load User Data From Server, Please Retry Again Later...</MainHeader>
      </MainContainer>
    );
  }
}
