import { Routes } from '@angular/router';
import { HomepageComponent } from './features/movies/components/homepage/homepage.component';
import { MovieDetailsComponent } from './features/movies/components/movie-details/movie-details.component';

export const routes: Routes = [
  { path: '', component: HomepageComponent, pathMatch: 'full' },
  { path: 'movies/:id', component: MovieDetailsComponent }
];
