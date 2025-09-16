import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Cast, Crew, Movie } from '../../../../core/models/movie.model';
import { loadMovieDetails, loadMovieCastDetails, loadMovieCrewDetails } from '../../store/movies.actions';
import { selectMovieCastDetails, selectMovieCrewDetails, selectMovieDetails, selectMoviesLoading } from '../../store/movies.selectors';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-movie-details',
  imports: [CommonModule],
  templateUrl: './movie-details.component.html',
  styleUrl: './movie-details.component.css'
})
export class MovieDetailsComponent {
  movie$!: Observable<Movie | null>;
  cast$!: Observable<Cast[]>;
  crew$!: Observable<Crew[]>;
  loading$!: Observable<boolean>;

  constructor(private store: Store, private route: ActivatedRoute) { }

  ngOnInit(): void {
    const movieId = this.route.snapshot.paramMap.get('id');
    if (movieId) {
      this.store.dispatch(loadMovieDetails({ movieId: Number(movieId) }));
      this.store.dispatch(loadMovieCastDetails({ movieId: Number(movieId) }));
      this.store.dispatch(loadMovieCrewDetails({ movieId: Number(movieId) }));
    }

    this.movie$ = this.store.select(selectMovieDetails);
    this.cast$ = this.store.select(selectMovieCastDetails);
    this.crew$ = this.store.select(selectMovieCrewDetails);
    this.loading$ = this.store.select(selectMoviesLoading);
  }
}
