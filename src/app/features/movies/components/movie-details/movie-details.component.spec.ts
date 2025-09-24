import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MovieDetailsComponent } from './movie-details.component';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { ActivatedRoute } from '@angular/router';
import * as MoviesActions from '../../store/movies.actions';
import * as MoviesSelectors from '../../store/movies.selectors';
import { MemoizedSelector } from '@ngrx/store';
import { Movie, Cast, Crew } from '../../../../core/models/movie.model';
import { firstValueFrom } from 'rxjs';
import { MoviesState } from '../../store/movies.reducer';

interface AppState {
  movieDetails: MoviesState;
}

describe('MovieDetailsComponent', () => {
  let component: MovieDetailsComponent;
  let fixture: ComponentFixture<MovieDetailsComponent>;
  let store: MockStore<AppState>;
  let mockSelectMovieDetails: MemoizedSelector<AppState, Movie | null>;
  let mockSelectMovieCast: MemoizedSelector<AppState, Cast[]>;
  let mockSelectMovieCrew: MemoizedSelector<AppState, Crew[]>;
  let mockSelectLoading: MemoizedSelector<AppState, boolean>;

  const mockMovie: Movie = {
    id: 1,
    title: 'Test Movie',
    overview: 'Some overview',
    runtime: 120,
    release_date: '2025-01-01',
    vote_average: 8.5,
    imdbVotes: 1000,
    popularity: 50,
    popularityChange: 5,
    adult: false,
    backdrop_path: '/path.jpg',
    genres: [{ id: 1, name: 'Action' }],
    credits: undefined
  };

 const mockCast: Cast[] = [
  {
    cast_id: 1,
    character: 'Hero',
    name: 'Actor One',
    profile_path: '/actor1.jpg',
    cast: [],
    crew: []
  },
  {
    cast_id: 2,
    character: 'Villain',
    name: 'Actor Two',
    profile_path: undefined,
    cast: [],
    crew: []
  }
];

const mockCrew: Crew[] = [
  {
    credit_id: '1',
    job: 'Director',
    name: 'Director One',
    profile_path: '/dir1.jpg',
  },
  {
    credit_id: '2',
    job: 'Writer',
    name: 'Writer One',
    profile_path: null,
  }
];


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MovieDetailsComponent],
      providers: [
        provideMockStore({
          initialState: {
            movieDetails: {
              movies: [],
              movie: null,
              loading: false,
              error: null
            }
          }
        }),
        {
          provide: ActivatedRoute,
          useValue: { snapshot: { paramMap: new Map([['id', '1']]) } }
        }
      ]
    }).compileComponents();

    store = TestBed.inject(MockStore);

    // Override selectors used in the component
    mockSelectMovieDetails = store.overrideSelector(MoviesSelectors.selectMovieDetails, null);
    mockSelectMovieCast = store.overrideSelector(MoviesSelectors.selectMovieCastDetails, []);
    mockSelectMovieCrew = store.overrideSelector(MoviesSelectors.selectMovieCrewDetails, []);
    mockSelectLoading = store.overrideSelector(MoviesSelectors.selectMoviesLoading, false);

    fixture = TestBed.createComponent(MovieDetailsComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should dispatch load actions on init', () => {
    const dispatchSpy = spyOn(store, 'dispatch');
    fixture.detectChanges();

    expect(dispatchSpy).toHaveBeenCalledWith(MoviesActions.loadMovieDetails({ movieId: 1 }));
    expect(dispatchSpy).toHaveBeenCalledWith(MoviesActions.loadMovieCastDetails({ movieId: 1 }));
    expect(dispatchSpy).toHaveBeenCalledWith(MoviesActions.loadMovieCrewDetails({ movieId: 1 }));
  });

  it('should select movie details, cast, crew, and loading state', async () => {
    fixture.detectChanges();

    // Set results for selectors
    mockSelectMovieDetails.setResult(mockMovie);
    mockSelectMovieCast.setResult(mockCast);
    mockSelectMovieCrew.setResult(mockCrew);
    mockSelectLoading.setResult(true);

    store.refreshState();
    fixture.detectChanges();

    expect(await firstValueFrom(component.movie$)).toEqual(mockMovie);
    expect(await firstValueFrom(component.cast$)).toEqual(mockCast);
    expect(await firstValueFrom(component.crew$)).toEqual(mockCrew);
    expect(await firstValueFrom(component.loading$)).toBeTrue();
  });

  it('should toggle cast visibility', () => {
    expect(component.showAllCast).toBeFalse();
    component.toggleCast();
    expect(component.showAllCast).toBeTrue();
  });

  it('should toggle crew visibility', () => {
    expect(component.showAllCrew).toBeFalse();
    component.toggleCrew();
    expect(component.showAllCrew).toBeTrue();
  });

  it('should return full image URL when profile path exists', () => {
    expect(component.getProfileImage('/image.jpg')).toBe('https://image.tmdb.org/t/p/w200/image.jpg');
  });

  it('should return null when profile path is missing', () => {
    expect(component.getProfileImage(null)).toBeNull();
    expect(component.getProfileImage(undefined)).toBeNull();
  });

  it('should generate initials from name', () => {
    expect(component.getInitials('John Doe')).toBe('JD');
    expect(component.getInitials('Alice')).toBe('A');
    expect(component.getInitials(undefined)).toBe('');
  });
});
