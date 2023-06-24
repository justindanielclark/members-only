export default async function getPersonDetails(personID: number): Promise<FetchedData<PersonDetails>> {
  const search = new URL("https://api.themoviedb.org");
  search.pathname = `/3/person/${personID}`;
  search.searchParams.set("language", "en-US");

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
  try {
    const response = await fetch(search, options);
    if (response.ok) {
      const data = (await response.json()) as PersonDetails;
      return {
        succeeded: true,
        data,
      };
    }
    return {
      succeeded: false,
      data: null,
    };
  } catch {
    return {
      succeeded: false,
      data: null,
    };
  }
}
