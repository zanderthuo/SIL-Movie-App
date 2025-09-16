import { createAction, props } from '@ngrx/store';
import { Movie } from '../../../core/models/movie.model';

export const loadMovies = createAction('[Movies] Load Trending Movies');

export const loadMoviesSuccess = createAction(
  '[Movies] Load Trending Movies Success',
  props<{ movies: Movie[] }>()
);

export const loadMoviesFailure = createAction(
  '[Movies] Load Trending Movies Failure',
  props<{ error: string }>()
);


export const loadMorePopularMovies = createAction(
  '[Movies] Load More Popular Movies'
);

export const loadMorePopularMoviesSuccess = createAction(
  '[Movies] Load More Popular Movies Success',
  props<{ movies: Movie[] }>()
);

export const loadMorePopularMoviesFailure = createAction(
  '[Movies] Load More Popular Movies Failure',
  props<{ error: string }>()
);

export const loadTopRatedMovies = createAction('[Movies] Load Top Rated Movies');

export const loadTopRatedMoviesSuccess = createAction(
  '[Movies] Load Top Rated Movies Success',
  props<{ movies: Movie[] }>()
);

export const loadTopRatedMoviesFailure = createAction(
  '[Movies] Load Top Rated Movies Failure',
  props<{ error: string }>()
);


export const loadMovieDetails = createAction(
  '[Movies] Load Movie Details',
  props<{ movieId: number }>()
);

export const loadMovieDetailsSuccess = createAction(
  '[Movies] Load Movie Details Success',
  props<{ movie: any }>()
);

export const loadMovieDetailsFailure = createAction(
  '[Movies] Load Movie Details Failure',
  props<{ error: string }>()
);

export const loadMovieCastDetails = createAction(
  '[Movies] Load Movie Cast Details',
  props<{ movieId: number }>()
);

export const loadMovieCastDetailsSuccess = createAction(
  '[Movies] Load Movie Cast Details Success',
  props<{ cast: any[] }>()
);

export const loadMovieCastDetailsFailure = createAction(
  '[Movies] Load Movie Cast Details Failure',
  props<{ error: string }>()
);

export const loadMovieCrewDetails = createAction(
  '[Movies] Load Movie Crew Details',
  props<{ movieId: number }>()
);

export const loadMovieCrewDetailsSuccess = createAction(
  '[Movies] Load Movie Crew Details Success',
  props<{ crew: any[] }>()
);

export const loadMovieCrewDetailsFailure = createAction(
  '[Movies] Load Movie Crew Details Failure',
  props<{ error: string }>()
);
