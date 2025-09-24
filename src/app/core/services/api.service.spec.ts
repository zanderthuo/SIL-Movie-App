import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { environment } from '../../../environments/environment';
import { MoviesService } from '../../features/movies/services/movies.service';
import { MovieResponse } from '../models/movie-response.model';

describe('MoviesService', () => {
  let service: MoviesService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [MoviesService],
    });

    service = TestBed.inject(MoviesService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // ✅ ensures no outstanding requests
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch trending movies (default page = 1)', () => {
    const mockResponse: MovieResponse = {
      results: [{
        id: 1, title: 'Movie A', backdrop_path: '/abc.jpg',
        overview: ''
      }],
      page: 1,
      total_pages: 10,
      total_results: 100,
    };

    service.getTrendingMovies().subscribe((res: MovieResponse) => {
      expect(res.page).toBe(1);
      expect(res.results.length).toBe(1);
      expect(res.results[0].title).toBe('Movie A');
    });


    const req = httpMock.expectOne(
      `${environment.apiUrl}/trending/movie/week?api_key=${environment.apiKey}&page=1`
    );
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should fetch trending movies for given page', () => {
    const mockResponse: MovieResponse = {
      results: [{ id: 2, title: 'Movie B', backdrop_path: '/def.jpg', overview: '' }],
      page: 2,
      total_pages: 10,
      total_results: 100,
    };

    service.getTrendingMovies(2).subscribe((res: MovieResponse) => {
      expect(res.page).toBe(2);
      expect(res.results[0].title).toBe('Movie B');
    });

    const req = httpMock.expectOne(
      `${environment.apiUrl}/trending/movie/week?api_key=${environment.apiKey}&page=2`
    );
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });
});
