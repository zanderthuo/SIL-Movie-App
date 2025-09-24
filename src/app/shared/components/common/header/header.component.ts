import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { Movie } from '../../../../core/models/movie.model';
import * as MoviesActions from '../../../../features/movies/store/movies.actions';
import * as MoviesSelectors from '../../../../features/movies/store/movies.selectors';

@Component({
  selector: 'app-header',
  imports: [CommonModule, FormsModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  private store = inject(Store);
  private router = inject(Router);

  searchQuery = '';
  searchResults$: Observable<Movie[]> = this.store.select(MoviesSelectors.selectAllSearchResults);

  onSearchSubmit(event: Event) {
    event.preventDefault();
    const query = this.searchQuery.trim();
    if (query) {
      this.store.dispatch(MoviesActions.searchMovies({ query }));
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
