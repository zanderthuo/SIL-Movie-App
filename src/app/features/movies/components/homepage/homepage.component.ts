import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovieCardComponent } from '../../../../shared/components/movie-card/movie-card.component';
import { Store } from '@ngrx/store';
import * as MoviesActions from '../../store/movies.actions';
import * as MoviesSelectors from '../../store/movies.selectors';
import { Observable, Subscription } from 'rxjs';
import { Movie } from '../../../../core/models/movie.model';
import { Router } from '@angular/router';

export interface HeroContent {
  title: string;
  watchNowText: string;
  duration: string;
  backdrop_path?: string;
}

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [MovieCardComponent, CommonModule],
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit, OnDestroy {
  private store = inject(Store);
  router = inject(Router);

  trendingMovies: Movie[] = [];
  trendingIndex = 0;
  trendingInterval: ReturnType<typeof setInterval> | null = null;

  trendingLoading$!: Observable<boolean>;
  trendingError$!: Observable<string | null>;
  heroSectionContent: HeroContent = {
  title: '',
  watchNowText: '',
  duration: '',
  backdrop_path: ''
};


  // Popular / Top Rated placeholders
  allPopularMovies: Movie[] = [];
  allTopRatedMovies: Movie[] = [];
  pageSize = 6;
  popularPage = 0;
  topRatedPage = 0;

  private subscription: Subscription = new Subscription();

  ngOnInit(): void {
    // Dispatch load action
    this.store.dispatch(MoviesActions.loadMovies());
    this.store.dispatch(MoviesActions.loadMorePopularMovies());
    this.store.dispatch(MoviesActions.loadTopRatedMovies());

    // Subscribe to trending movies from store
    const trendingSub = this.store.select(MoviesSelectors.selectAllMovies).subscribe((movies: Movie[]) => {
      if (movies.length) {
        this.trendingMovies = movies;
        this.trendingIndex = 0;
        this.updateHeroContent();
        this.startAutoRotate();
      }
    });
    this.subscription.add(trendingSub);

    // Subscribe to popular movies
    const popularSub = this.store.select(MoviesSelectors.selectAllPopularMovies).subscribe((movies: Movie[]) => {
      this.allPopularMovies = movies || [];
    });
    this.subscription.add(popularSub);

    // Subscribe to top rated movies
    const topRatedSub = this.store.select(MoviesSelectors.selectAllTopRatedMovies).subscribe((movies: Movie[]) => {
      this.allTopRatedMovies = movies || [];
    });
    this.subscription.add(topRatedSub);

    this.trendingLoading$ = this.store.select(MoviesSelectors.selectMoviesLoading);
    this.trendingError$ = this.store.select(MoviesSelectors.selectMoviesError);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.stopAutoRotate();
  }

  // Update hero content based on trendingIndex
  updateHeroContent() {
    if (!this.trendingMovies.length) return;
    const movie = this.trendingMovies[this.trendingIndex];
    this.heroSectionContent = {
      title: movie.title || movie.name || 'Untitled',
      watchNowText: 'Watch Now',
      duration: '0:57',
      backdrop_path: movie.backdrop_path
    };
  }

  // Hero next / prev buttons
  nextHero() {
    if (this.trendingMovies.length && this.trendingIndex < this.trendingMovies.length - 1) {
      this.trendingIndex++;
      this.updateHeroContent();
    }
  }

  prevHero() {
    if (this.trendingMovies.length && this.trendingIndex > 0) {
      this.trendingIndex--;
      this.updateHeroContent();
    }
  }

  // Auto rotate every 10 seconds
  startAutoRotate() {
    this.stopAutoRotate(); // clear any existing
    this.trendingInterval = setInterval(() => {
      if (this.trendingMovies.length) {
        this.trendingIndex = (this.trendingIndex + 1) % this.trendingMovies.length;
        this.updateHeroContent();
      }
    }, 10000);
  }

  stopAutoRotate() {
    if (this.trendingInterval) {
      clearInterval(this.trendingInterval);
      this.trendingInterval = null;
    }
  }

  // Popular / TopRated pagination getters
  get popularMovies() {
    const start = this.popularPage * this.pageSize;
    return this.allPopularMovies.slice(start, start + this.pageSize);
  }

  get topRatedMovies() {
    const start = this.topRatedPage * this.pageSize;
    return this.allTopRatedMovies.slice(start, start + this.pageSize);
  }

  // Popular / TopRated pagination handlers
  nextPopular() {
    if ((this.popularPage + 1) * this.pageSize < this.allPopularMovies.length) this.popularPage++;
  }
  prevPopular() {
    if (this.popularPage > 0) this.popularPage--;
  }
  nextTopRated() {
    if ((this.topRatedPage + 1) * this.pageSize < this.allTopRatedMovies.length) this.topRatedPage++;
  }
  prevTopRated() {
    if (this.topRatedPage > 0) this.topRatedPage--;
  }

  goToMovieDetails(movie: Movie) {
  this.router.navigate(['/movies', movie.id]);
}
}
