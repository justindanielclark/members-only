type FetchedPopularMovies = {
  page: number;
  results: Array<fetchedMovie>;
  total_pages: number;
  total_results: number;
};

type FetchedMovie = {
  adult: boolean;
  backdrop_path: string;
  id: number;
  title: string;
  original_language: string;
  original_title: string;
  overview: string;
  poster_path: string;
  media_type: string;
  genre_ids: Array<number>;
  popularity: number;
  release_date: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
};

type Poster = Pick<FetchedMovie, "id" | "poster_path" | "title">;

const backdrop_sizes = ["w300", "w780", "w1280", "original"] as const;
const logo_sizes = ["w45", "w92", "w154", "w185", "w300", "w500", "original"] as const;
const poster_sizes = ["w92", "w154", "w185", "w342", "w500", "w780", "original"] as const;
const profile_sizes = ["w45", "w185", "h632", "original"] as const;
const still_sizes = ["w92", "w185", "w300", "original"] as const;

type Backdrop_size = (typeof backdrop_sizes)[number];
type Logo_size = (typeof logo_sizes)[number];
type Poster_size = (typeof poster_sizes)[number];
type Profile_size = (typeof profile_sizes)[number];
type Still_size = (typeof still_sizes)[number];

type Configuration = {
  images: {
    base_url: string;
    secure_base_url: string;
    background_sizes: Array<string>;
    logo_sizes: Array<string>;
    poster_sizes: Array<string>;
    profile_sizes: Array<string>;
    still_sizes: Array<string>;
  };
};
