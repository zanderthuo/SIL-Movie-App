import { createReducer, on } from '@ngrx/store';
import * as MoviesActions from './movies.actions';
import { Movie } from '../../../core/models/movie.model';

export interface MoviesState {
  movies: Movie[];
  loading: boolean;
  error: string | null;
}

export const initialState: MoviesState = {
  movies: [],
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
