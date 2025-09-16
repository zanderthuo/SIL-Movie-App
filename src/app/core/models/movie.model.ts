export interface Movie {
  id: number;
  title?: string;
  adult?: boolean;
  name?: string;
  overview?: string;
  poster_path?: string;
  options?: string[];
  genre_ids?: number[];
  year?: number;
  rating?: number ;
  runtime?: any;
  original_language?: string;
  description?: string;
  poster?: string;
  backdrop_path?: string;
  awards?: string;
  popularity?: number;
  popularityChange?: number;
  imdbRating?: number;
  imdbVotes?: number | string;
  vote_average?: number;
  vote_count?: number;
  release_date?: string;
  first_air_date?: string;
  genres?: { id: number; name: string }[];
  videos?: { title: string; thumbnail: string }[];
  photos?: string[];
  cast?: { name: string; role: string; image: string }[];
  director?: string;
  writers?: string[];
}

export interface Cast {
  adult?: boolean;
  gender?: number;
  id?: number;
  known_for_department?: string;
  name?: string;
  original_name?: string;
  popularity?: number;
  profile_path?: string;
  cast_id?: number;
  character?: string;
  credit_id?: string;
  order?: number;
}


export interface Crew {
  adult?: boolean;
  gender?: number;
  id?: number;
  known_for_department?: string;
  name?: string;
  original_name?: string;
  popularity?: number;
  profile_path?: string | null;
  credit_id?: string;
  department?: string;
  job?: string;
}
