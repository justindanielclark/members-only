import { authOptions } from "./api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth/next";
import getPopularMovies from "./lib/TMDB/getPopularMovies";
import { redirect } from "next/navigation";
import PosterSlider from "./components/PosterSlider";
import MainContainer from "./lib/sharedComponents/MainContainer";

export default async function Home() {
  let session,
    movies = [],
    moviePosters: Array<Array<Poster>> = [[], [], []];
  session = await getServerSession(authOptions);
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
    <MainContainer className="flex flex-col lg:flex-row lg:flex-wrap lg:items-center items-stretch bg-slate-900/40 p-4">
      <section className="w-full lg:w-1/3 order-1 relative">
        <div className="w-full h-fit lg:absolute lg:top-1/2 lg:-translate-y-1/2 p-2">
          <h1 className="font-bold text-6xl bg-slate-200 text-black p-2 mb-8">MovieBase</h1>
          <div className="text-xl px-8 lg:p-0">
            <p className="font-bold">A simple way to:</p>
            <ul className="pl-2">
              <li>- Catalogue which movies you want to see</li>
              <li>- Track which movies you have seen</li>
              <li>- Share both with friends</li>
            </ul>
          </div>
        </div>
      </section>
      <section className="w-full lg:w-2/3 order-2 my-4 p-4 rounded-lg">
        <PosterSlider posters={moviePosters[0]} />
      </section>
      <section className="w-full lg:w-1/3 order-4 relative">
        <div className="w-full h-fit lg:absolute lg:top-1/2 lg:-translate-y-1/2 p-2">
          <h1 className="font-bold text-3xl bg-slate-200 text-black p-2 mb-8">Lorem Ipsum</h1>
          <div className="text-xl px-8 lg:p-0">
            <p className="font-bold">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit esse exercitationem quos quaerat
              quod aliquid a ipsam vel, harum quasi! Voluptates, voluptatum illo! Commodi nesciunt repudiandae porro hic
              quis voluptates?
            </p>
          </div>
        </div>
      </section>
      <section className="h-fit w-full lg:w-2/3 order-4 lg:order-3 my-4 p-4 rounded-lg">
        <PosterSlider posters={moviePosters[1]} reversed />
      </section>
      <section className="w-full lg:w-1/3 order-5 relative">
        <div className="w-full h-fit lg:absolute lg:top-1/2 lg:-translate-y-1/2 p-2">
          <h1 className="font-bold text-3xl bg-slate-200 text-black p-2 mb-8">Lorem Ipsum</h1>
          <div className="text-xl px-8 lg:p-0">
            <p className="font-bold">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis facere eius dolorum cum, distinctio unde
              mollitia, hic corporis autem quasi voluptate, dolore asperiores totam? Quasi enim nihil eos est totam!
            </p>
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
