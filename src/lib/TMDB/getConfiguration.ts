// Returns Configuration File For TMDB Data

const search = new URL("https://api.themoviedb.org");
search.pathname = "/3/configuration";

const options: RequestInit = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: process.env.TMDB_AUTH_KEY as string,
  },
  next: {
    revalidate: 86400,
  },
};

export default async function getConfiguration(): Promise<Configuration | null> {
  return fetch(search, options).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return null;
  });
}
