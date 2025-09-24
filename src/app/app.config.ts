import { ApplicationConfig, provideZoneChangeDetection, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideHttpClient } from '@angular/common/http';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import {
  movieCastDetailsReducer,
  movieCrewDetailsReducer,
  movieDetailsReducer,
  moviesReducer,
  popularMoviesReducer,
  searchMoviesReducer,
  topRatedMoviesReducer,
} from './features/movies/store/movies.reducer';
import { MoviesEffects } from './features/movies/store/movies.effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),

    provideStore({
      movies: moviesReducer,
      popularMovies: popularMoviesReducer,
      topRatedMovies: topRatedMoviesReducer,
      movieDetails: movieDetailsReducer,
      movieCast: movieCastDetailsReducer,
      movieCrew: movieCrewDetailsReducer,
      searchMovie: searchMoviesReducer,
    }),

    provideEffects([MoviesEffects]),

    provideHttpClient(),

    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
  ],
};
