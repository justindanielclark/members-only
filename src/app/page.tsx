import getSessionOnServer from "@/lib/providers/getSessionOnServer";
import getPopularMovies from "@/lib/TMDB/getPopularMovies";
import { redirect } from "next/navigation";
import PosterSlider from "./components/PosterSlider";
import MainContainer from "@/lib/sharedComponents/MainContainer";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "MovieBase",
  };
}

export default async function Home() {
  let session,
    movies = [],
    moviePosters: Array<Array<Poster>> = [[], [], []];
  session = await getSessionOnServer();
  if (session) {
    redirect("/dashboard");
  } else {
    movies = await getPopularMovies();
    movies.forEach((movie, idx) => {
      const { id, poster_path, title } = movie;
      moviePosters[idx % 3].push({ id, poster_path, title });
    });
  }
  const content = (
    <MainContainer className="flex flex-col lg:flex-row lg:flex-wrap lg:items-center items-stretch bg-slate-900/40">
      <section className="w-full lg:w-1/3 order-1">
        <h1 className="font-bold text-6xl bg-slate-200 text-black p-2 mb-8">MovieBase</h1>
        <div className="text-xl px-8 lg:p-0">
          <p className="font-bold">A simple way to:</p>
          <ul className="pl-2">
            <li>- Catalogue which movies you want to see</li>
            <li>- Track which movies you have seen</li>
            <li>- Share both with friends</li>
          </ul>
        </div>
      </section>
      <section className="w-full lg:w-2/3 order-2 my-4 p-4 rounded-lg">
        <PosterSlider posters={moviePosters[0]} />
      </section>
      <section className="w-full lg:w-1/3 order-4 relative">
        <div className="w-full h-fit lg:absolute lg:top-1/2 lg:-translate-y-1/2 p-2">
          <div className="text-xl px-8 lg:p-0">
            <p className="font-bold">Elevate your movie watching:</p>
            <p className="">Our database</p>
            <ul className="list-disc pl-6">
              <li>makes suggestions based on what is popular,</li>
              <li>makes lookup a breeze,</li>
              <li>and showcases which movies your friends are excited about seeing.</li>
            </ul>
            <p className="font-bold">MovieBase is your ultimate movie companion.</p>
          </div>
        </div>
      </section>
      <section className="h-fit w-full lg:w-2/3 order-4 lg:order-3 my-4 p-4 rounded-lg">
        <PosterSlider posters={moviePosters[1]} reversed />
      </section>
      <section className="w-full lg:w-1/3 order-5 relative">
        <div className="w-full h-fit lg:absolute lg:top-1/2 lg:-translate-y-1/2 p-2">
          <div className="text-xl px-8 lg:p-0">
            <p className="font-bold">Whatever it is you are looking for:</p>
            <p>Our database</p>
            <ul className="list-disc pl-6">
              <li>has over a million movies on record,</li>
              <li>has complete cast and crew credits,</li>
              <li>is quickly searched and indexed</li>
            </ul>
          </div>
        </div>
      </section>
      <section className="h-fit w-full lg:w-2/3 order-6 my-4 p-4 rounded-lg">
        <PosterSlider posters={moviePosters[2]} />
      </section>
    </MainContainer>
  );

  return content;
}
