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

