import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { MoviesService } from '../services/movies.service';
import * as MoviesActions from './movies.actions';
import { catchError, map, mergeMap, of } from 'rxjs';

@Injectable()
export class MoviesEffects {
  private actions$ = inject(Actions);
  private moviesService = inject(MoviesService);

  // Effect for trending movies
  loadTrendingMovies$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MoviesActions.loadMovies),
      mergeMap(() =>
        this.moviesService.getTrendingMovies().pipe(
          map((res) =>
            MoviesActions.loadMoviesSuccess({ movies: res.results })
          ),
          catchError((err) =>
            of(MoviesActions.loadMoviesFailure({ error: err.message }))
          )
        )
      )
    )
  );

  loadPopularMovies$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MoviesActions.loadMorePopularMovies),
      mergeMap(() =>
        this.moviesService.getPopularMovies().pipe(
          map((res) =>
            MoviesActions.loadMorePopularMoviesSuccess({ movies: res.results })
          ),
          catchError((err) =>
            of(MoviesActions.loadMorePopularMoviesFailure({ error: err.message }))
          )
        )
      )
    )
  );

  loadTopRatedMovies$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MoviesActions.loadTopRatedMovies),
      mergeMap(() =>
        this.moviesService.getTopRatedMovies().pipe(
          map((res) =>
            MoviesActions.loadTopRatedMoviesSuccess({ movies: res.results })
          ),
          catchError((err) =>
            of(MoviesActions.loadTopRatedMoviesFailure({ error: err.message }))
          )
        )
      )
    )
  );
}
