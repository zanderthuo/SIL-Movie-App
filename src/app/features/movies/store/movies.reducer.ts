import { createReducer, on } from '@ngrx/store';
import * as MoviesActions from './movies.actions';
import { Movie } from '../../../core/models/movie.model';

export interface MoviesState {
  movie: any;
  movies: Movie[];
  loading: boolean;
  error: string | null;
}

export const initialState: MoviesState = {
  movies: [],
  movie: {},
  loading: false,
  error: null,
};

export const moviesReducer = createReducer(
  initialState,

  // Start loading
  on(MoviesActions.loadMovies, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  // Success
  on(MoviesActions.loadMoviesSuccess, (state, { movies }) => ({
    ...state,
    movies,
    loading: false,
  })),

  // Failure
  on(MoviesActions.loadMoviesFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  }))
);

export const popularMoviesReducer = createReducer(
  initialState,

  // Start loading more popular movies
  on(MoviesActions.loadMorePopularMovies, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  // Success
  on(MoviesActions.loadMorePopularMoviesSuccess, (state, { movies }) => ({
    ...state,
    movies: [...state.movies, ...movies], // Append new movies
    loading: false,
  })),

  // Failure
  on(MoviesActions.loadMorePopularMoviesFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  }))
);

export const topRatedMoviesReducer = createReducer(
  initialState,

  // Start loading top rated movies
  on(MoviesActions.loadTopRatedMovies, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  // Success
  on(MoviesActions.loadTopRatedMoviesSuccess, (state, { movies }) => ({
    ...state,
    movies,
    loading: false,
  })),

  // Failure
  on(MoviesActions.loadTopRatedMoviesFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  }))
);

export const movieDetailsReducer = createReducer(
  {
    movie: null as any,
    loading: false,
    error: null as string | null,
  },

  // Start loading movie details
  on(MoviesActions.loadMovieDetails, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  // Success
  on(MoviesActions.loadMovieDetailsSuccess, (state, { movie }) => ({
    ...state,
    movie,
    loading: false,
  })),

  // Failure
  on(MoviesActions.loadMovieDetailsFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  }))
);

export const movieCastDetailsReducer = createReducer(
  {
    cast: [] as any[],
    loading: false,
    error: null as string | null,
  },

  // Start loading movie cast details
  on(MoviesActions.loadMovieCastDetails, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  // Success
  on(MoviesActions.loadMovieCastDetailsSuccess, (state, { cast }) => ({
    ...state,
    cast,
    loading: false,
  })),

  // Failure
  on(MoviesActions.loadMovieCastDetailsFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  }))
);

export const movieCrewDetailsReducer = createReducer(
  {
    crew: [] as any[],
    loading: false,
    error: null as string | null,
  },

  // Start loading movie crew details
  on(MoviesActions.loadMovieCrewDetails, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  // Success
  on(MoviesActions.loadMovieCrewDetailsSuccess, (state, { crew }) => ({
    ...state,
    crew,
    loading: false,
  })),

  // Failure
  on(MoviesActions.loadMovieCrewDetailsFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  }))
);

export const searchMoviesReducer = createReducer(
  initialState,

  // Start searching movies
  on(MoviesActions.searchMovies, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  // Success
  on(MoviesActions.searchMoviesSuccess, (state, { movies }) => ({
    ...state,
    movies,
    loading: false,
  })),

  // Failure
  on(MoviesActions.searchMoviesFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  }))
);
