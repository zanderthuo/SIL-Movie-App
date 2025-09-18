import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
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
  private store = inject(Store);
  private route = inject(ActivatedRoute);

  movie$!: Observable<Movie | null>;
  cast$!: Observable<Cast[]>;
  crew$!: Observable<Crew[]>;
  loading$!: Observable<boolean>;

  showAllCast = false;
  showAllCrew = false;

  defaultAvatar = 'assets/avatar.jpg'; // 👈 put a placeholder in assets

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

  toggleCast() {
    this.showAllCast = !this.showAllCast;
  }

  toggleCrew() {
    this.showAllCrew = !this.showAllCrew;
  }

  getProfileImage(path: string | null | undefined): string {
  return path ? 'https://image.tmdb.org/t/p/w200' + path : this.defaultAvatar;
}
}
