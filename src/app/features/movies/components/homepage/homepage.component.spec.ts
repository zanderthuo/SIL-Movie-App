import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HomepageComponent } from './homepage.component';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import * as MoviesActions from '../../store/movies.actions';
import * as MoviesSelectors from '../../store/movies.selectors';
import { MemoizedSelector } from '@ngrx/store';
import { Movie } from '../../../../core/models/movie.model';

interface AppState {
  movies: Movie[];
  loading: boolean;
  error: string | null;
}

describe('HomepageComponent', () => {
  let component: HomepageComponent;
  let fixture: ComponentFixture<HomepageComponent>;
  let store: MockStore<AppState>;
  let mockSelectAllMovies: MemoizedSelector<AppState, Movie[]>;

  const mockMovies: Movie[] = [
    { id: 1, title: 'Movie 1', overview: '...', backdrop_path: '/path1.jpg' },
    { id: 2, title: 'Movie 2', overview: '...', backdrop_path: '/path2.jpg' },
    { id: 3, title: 'Movie 3', overview: '...', backdrop_path: '/path3.jpg' }
  ];

  const initialState = {
    movies: {
      movies: [],        // trending movies
      popular: [],       // popular movies
      topRated: [],      // top rated movies
      loading: false,
      error: null
    }
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomepageComponent],
      providers: [provideMockStore({ initialState })]  // ✅ supply state
    }).compileComponents();

    store = TestBed.inject(MockStore);
    mockSelectAllMovies = store.overrideSelector(
      MoviesSelectors.selectAllMovies,
      []
    );
    store.overrideSelector(MoviesSelectors.selectAllPopularMovies, []);
    store.overrideSelector(MoviesSelectors.selectAllTopRatedMovies, []);
    store.overrideSelector(MoviesSelectors.selectMoviesLoading, false);
    store.overrideSelector(MoviesSelectors.selectMoviesError, null);

    fixture = TestBed.createComponent(HomepageComponent);
    component = fixture.componentInstance;
  });


  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should dispatch load actions on init', () => {
    const dispatchSpy = spyOn(store, 'dispatch');
    fixture.detectChanges();

    expect(dispatchSpy).toHaveBeenCalledWith(MoviesActions.loadMovies());
    expect(dispatchSpy).toHaveBeenCalledWith(MoviesActions.loadMorePopularMovies());
    expect(dispatchSpy).toHaveBeenCalledWith(MoviesActions.loadTopRatedMovies());
  });

  it('should update trending movies and hero content when store provides movies', () => {
    fixture.detectChanges();
    mockSelectAllMovies.setResult(mockMovies);
    store.refreshState();
    fixture.detectChanges();

    expect(component.trendingMovies.length).toBe(3);
    expect(component.heroSectionContent.title).toBe('Movie 1');
  });

  it('should navigate to next and previous hero movies', () => {
    fixture.detectChanges();
    mockSelectAllMovies.setResult(mockMovies);
    store.refreshState();
    fixture.detectChanges();

    component.nextHero();
    expect(component.trendingIndex).toBe(1);
    expect(component.heroSectionContent.title).toBe('Movie 2');

    component.prevHero();
    expect(component.trendingIndex).toBe(0);
    expect(component.heroSectionContent.title).toBe('Movie 1');
  });

  it('should auto rotate hero content', fakeAsync(() => {
    fixture.detectChanges();
    mockSelectAllMovies.setResult(mockMovies);
    store.refreshState();
    fixture.detectChanges();

    const initialTitle = component.heroSectionContent.title;
    tick(10000); // simulate interval
    expect(component.heroSectionContent.title).not.toBe(initialTitle);
  }));

  it('should paginate popular movies', () => {
    component.allPopularMovies = Array.from({ length: 12 }, (_, i) => ({
      id: i + 1,
      title: `Popular ${i + 1}`,
      overview: '',
      backdrop_path: ''
    }));
    component.pageSize = 6;

    expect(component.popularMovies.length).toBe(6);
    component.nextPopular();
    expect(component.popularPage).toBe(1);
    expect(component.popularMovies[0].title).toBe('Popular 7');
  });

  it('should paginate top rated movies', () => {
    component.allTopRatedMovies = Array.from({ length: 10 }, (_, i) => ({
      id: i + 1,
      title: `TopRated ${i + 1}`,
      overview: '',
      backdrop_path: ''
    }));
    component.pageSize = 5;

    expect(component.topRatedMovies.length).toBe(5);
    component.nextTopRated();
    expect(component.topRatedPage).toBe(1);
    expect(component.topRatedMovies[0].title).toBe('TopRated 6');
  });
});
