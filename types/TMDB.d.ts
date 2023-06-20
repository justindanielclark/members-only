type FetchMessage = {
  message: string;
  statusCode: number;
};

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

type ProductionCompany = {
  id: number;
  logo_path: string;
  name: string;
  origin_country: string;
};

type ProductionCountry = {
  name: string;
};

type SpokenLanguage = {
  english_name: string;
  name: string;
};

type MovieDetails = {
  adult: boolean;
  backdrop_path: string | null;
  belongs_to_collection: MovieCollection | null;
  budget: number;
  genres: Array<Genre>;
  homepage: string;
  id: number;
  imdb_id: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: Array<ProductionCompany>;
  production_countries: Array<ProductionCountry>;
  release_date: string;
  revenue: number;
  runtime: number;
  spoken_languages: Array<SpokenLanguage>;
  status: string;
  tagline: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
};

type Genre = {
  id: number;
  name: string;
};

type MovieCollection = {
  id: number;
  name: string;
  poster_path: string;
  backdrop_path: string;
};

type Cast = {
  id: number;
  cast: Array<CastCredit>;
  crew: Array<CrewCredit>;
};
type CastCredit = {
  adult: boolean;
  gender: 1 | 2;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string;
  cast_id: number;
  character: string;
  credit_id: string;
  order: number;
};
type CrewCredit = {
  adult: false;
  gender: 1 | 2;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string;
  credit_id: number;
  department: string;
  job: string;
};
type ExpandedCrewCredit = Omit<CrewCredit, "job"> & { jobs: Array<string>; jobScore: number };

type MovieImages = {
  backdrops: Array<MovieImageData>;
  id: number;
  logos: Array<MovieImageData>;
  posters: Array<MovieImageData>;
};
type MovieImageData = {
  aspect_ratio: number;
  height: number;
  iso_639_1: number;
  file_path: string;
  vote_average: number;
  vote_count: number;
  width: number;
};

type Recommendation = {
  page: number;
  results: Array<FetchedMovie>;
  total_pages: number;
  total_results: number;
};

type searchResults = {
  page: number;
  total_pages: number;
  total_results: number;
  results: Array<MovieSearchResult>;
};
type MovieSearchResult = {
  adult: false;
  backdrop_path?: string;
  genre_ids: Array<number>;
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
};
