import { Routes } from '@angular/router';
import { HomepageComponent } from './features/movies/components/homepage/homepage.component';
import { MovieDetailsComponent } from './features/movies/components/movie-details/movie-details.component';
import { SignUpComponent } from './features/auth/components/sign-up/sign-up.component';
import { SignInComponent } from './features/auth/components/sign-in/sign-in.component';

export const routes: Routes = [
  { path: 'signin', component: SignInComponent },
  { path: 'signup', component: SignUpComponent },
  { path: '', component: HomepageComponent, pathMatch: 'full' },
  { path: 'movies/:id', component: MovieDetailsComponent }
];
