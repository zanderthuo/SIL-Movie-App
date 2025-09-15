export interface Movie {
  id: number;
  title?: string;        // Some responses use title
  name?: string;         // TV shows sometimes use name
  overview?: string;
  rating?: number; // Add this line
  release_date?: string;
  first_air_date?: string;
  poster_path?: string;
  backdrop_path?: string;
  vote_average?: number;
  vote_count?: number;
  popularity?: number;
  original_language?: string;
  genre_ids?: number[];
  options?: string[];
}
