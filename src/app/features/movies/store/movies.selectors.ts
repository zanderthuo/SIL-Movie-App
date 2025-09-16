import { createFeatureSelector, createSelector } from '@ngrx/store';
import { MoviesState } from './movies.reducer';

// Feature key
export const selectMoviesState =
  createFeatureSelector<MoviesState>('movies');

// Select list of movies
export const selectAllMovies = createSelector(
  selectMoviesState,
  (state) => state.movies
);

// Loading state
export const selectMoviesLoading = createSelector(
  selectMoviesState,
  (state) => state.loading
);

// Error state
export const selectMoviesError = createSelector(
  selectMoviesState,
  (state) => state.error
);

export const selectPopularMoviesState = createFeatureSelector<MoviesState>('popularMovies');

export const selectAllPopularMovies = createSelector(
  selectPopularMoviesState,
  (state) => state.movies
);

export const selectPopularMoviesLoading = createSelector(
  selectPopularMoviesState,
  (state) => state.loading
);

export const selectPopularMoviesError = createSelector(
  selectPopularMoviesState,
  (state) => state.error
);

export const selectTopRatedMoviesState = createFeatureSelector<MoviesState>('topRatedMovies');

export const selectAllTopRatedMovies = createSelector(
  selectTopRatedMoviesState,
  (state) => state.movies
);

export const selectTopRatedMoviesLoading = createSelector(
  selectTopRatedMoviesState,
  (state) => state.loading
);

export const selectTopRatedMoviesError = createSelector(
  selectTopRatedMoviesState,
  (state) => state.error
);


export const selectMovieDetailsState = createFeatureSelector<MoviesState>('movieDetails');

export const selectMovieDetails = createSelector(
  selectMovieDetailsState,
  (state) => state.movie
);

export const selectMovieDetailsLoading = createSelector(
  selectMovieDetailsState,
  (state) => state.loading
);

export const selectMovieDetailsError = createSelector(
  selectMovieDetailsState,
  (state) => state.error
);

export const selectMovieCastDetails = createSelector(
  selectMovieDetailsState,
  (state) => (state.movie as any)?.credits?.cast || []
);

export const selectMovieCastLoading = createSelector(
  selectMovieDetailsState,
  (state) => state.loading
);

export const selectMovieCastError = createSelector(
  selectMovieDetailsState,
  (state) => state.error
);

export const selectMovieCrewDetails = createSelector(
  selectMovieDetailsState,
  (state) => (state.movie as any)?.credits?.crew || []
);

export const selectMovieCrewLoading = createSelector(
  selectMovieDetailsState,
  (state) => state.loading
);

export const selectMovieCrewError = createSelector(
  selectMovieDetailsState,
  (state) => state.error
);
