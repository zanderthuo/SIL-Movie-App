import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { Movie } from '../../../../core/models/movie.model';
import * as MoviesActions from '../../../../features/movies/store/movies.actions';
import * as MoviesSelectors from '../../../../features/movies/store/movies.selectors';
import { Store } from '@ngrx/store';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  imports: [CommonModule, FormsModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  private store = inject(Store);
  private router = inject(Router);

  searchQuery = '';
  searchResults$!: Observable<Movie[]>;

  constructor() {
    this.searchResults$ = this.store.select(MoviesSelectors.selectAllSearchResults);
  }

  onSearchSubmit(event: Event) {
    event.preventDefault();
    if (this.searchQuery.trim()) {
      this.store.dispatch(MoviesActions.searchMovies({ query: this.searchQuery.trim() }));
    } 
  }

  clearSearch() {
    this.searchQuery = '';
    this.store.dispatch(MoviesActions.clearSearchResults());
  }

  goToMovieDetails(movie: Movie) {
    this.clearSearch();
    this.router.navigate(['/movies', movie.id]);
  }
}
