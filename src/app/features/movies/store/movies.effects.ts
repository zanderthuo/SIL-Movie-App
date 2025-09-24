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

  loadMovieDetails$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MoviesActions.loadMovieDetails),
      mergeMap((action) =>
        this.moviesService.getMovieDetails(action.movieId).pipe(
          map((movie) =>
            MoviesActions.loadMovieDetailsSuccess({ movie })
          ),
          catchError((err) =>
            of(MoviesActions.loadMovieDetailsFailure({ error: err.message }))
          )
        )
      )
    )
  );

  loadMovieCastDetails$ = createEffect(() =>
  this.actions$.pipe(
    ofType(MoviesActions.loadMovieCastDetails),
    mergeMap((action) =>
      this.moviesService.getCastDetails(action.movieId).pipe(
        // API returns an object with { cast: Cast[], crew: Crew[] }
        map((res) =>
          MoviesActions.loadMovieCastDetailsSuccess({ cast: res.cast })
        ),
        catchError((err) =>
          of(MoviesActions.loadMovieCastDetailsFailure({ error: err.message }))
        )
      )
    )
  )
);


  loadMovieCrewDetails$ = createEffect(() =>
  this.actions$.pipe(
    ofType(MoviesActions.loadMovieCrewDetails),
    mergeMap((action) =>
      this.moviesService.getCastDetails(action.movieId).pipe(
        // API returns an object with { cast: Cast[], crew: Crew[] }
        map((res) =>
          MoviesActions.loadMovieCrewDetailsSuccess({ crew: res.crew })
        ),
        catchError((err) =>
          of(MoviesActions.loadMovieCrewDetailsFailure({ error: err.message }))
        )
      )
    )
  )
);


  searchMovies$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MoviesActions.searchMovies),
      mergeMap((action) =>
        this.moviesService.searchMovies(action.query).pipe(
          map((res) =>
            MoviesActions.searchMoviesSuccess({ movies: res.results })
          ),
          catchError((err) =>
            of(MoviesActions.searchMoviesFailure({ error: err.message }))
          )
        )
      )
    )
  );

}
