import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { MovieCardComponent } from './movie-card.component';
import { Movie } from '../../../core/models/movie.model';

describe('MovieCardComponent', () => {
  let component: MovieCardComponent;
  let fixture: ComponentFixture<MovieCardComponent>;

  const mockMovie: Movie & { options: string[] } = {
    id: 1,
    title: 'Inception',
    overview: 'A mind-bending thriller about dream invasion.',
    vote_average: 8.8,
    poster_path: '/inception.jpg',
    backdrop_path: '/inception-bg.jpg',
    release_date: '2010-07-16',
    options: ['Watch options', 'Trailer'] // 👈 added here for buttons
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MovieCardComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(MovieCardComponent);
    component = fixture.componentInstance;
    component.movie = mockMovie;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the movie title', () => {
    const titleEl = fixture.debugElement.query(By.css('.card-title')).nativeElement;
    expect(titleEl.textContent).toContain(mockMovie.title);
  });

  it('should render the movie rating', () => {
    const ratingEl = fixture.debugElement.query(By.css('.movie-rating')).nativeElement;
    expect(ratingEl.textContent).toBe((mockMovie.vote_average ?? '').toString());
  });

  it('should render the movie image with correct alt text', () => {
    const imgEl: HTMLImageElement = fixture.debugElement.query(By.css('img')).nativeElement;
    expect(imgEl).toBeTruthy();
    expect(imgEl.alt).toBe(mockMovie.title ?? '');
    expect(imgEl.src).toContain((mockMovie.poster_path ?? '').replace('/', '')); // relative path check
  });

  it('should render buttons for each movie option', () => {
    const buttons = fixture.debugElement.queryAll(By.css('button'));
    const buttonTexts = buttons.map(btn => btn.nativeElement.textContent.trim());
    expect(buttonTexts).toEqual(mockMovie.options);
  });

  it('should render play icon for "Watch options" button', () => {
    const button = fixture.debugElement.query(By.css('button:nth-of-type(1) i.bi-play-fill'));
    expect(button).toBeTruthy();
  });

  it('should render trailer icon for "Trailer" button', () => {
    const button = fixture.debugElement.query(By.css('button:nth-of-type(2) i.bi-play-btn-fill'));
    expect(button).toBeTruthy();
  });
});
