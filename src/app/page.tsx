import { authOptions } from "./api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth/next";

export default async function Home() {
  const data = await getServerSession(authOptions);
  // console.log("");
  // console.log("From page.tsx");
  // console.log(data);

  console.log(process.env.TMDB_AUTH_KEY);

  const content = data ? (
    <main className="flex-1 bg-slate-800">
      <p>Logged In!</p>
    </main>
  ) : (
    <main className="flex-1 bg-slate-800">
      <p>Logged Out!</p>
    </main>
  );

  return content;
}
