import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { MoviesService } from './movies.service';
import { environment } from '../../../../environments/environment';
import { MovieResponse } from '../../../core/models/movie-response.model';

describe('MoviesService', () => {
  let service: MoviesService;
  let httpMock: HttpTestingController;
  const apiUrl = environment.apiUrl;
  const apiKey = environment.apiKey;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [MoviesService]
    });

    service = TestBed.inject(MoviesService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // ✅ ensures no pending HTTP calls
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch trending movies', () => {
    const mockResponse: MovieResponse = { page: 1, results: [], total_pages: 1, total_results: 0 };

    service.getTrendingMovies(1).subscribe((res) => {
      expect(res).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${apiUrl}/trending/movie/week?api_key=${apiKey}&page=1`);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should fetch popular movies', () => {
    const mockResponse: MovieResponse = { page: 1, results: [], total_pages: 1, total_results: 0 };

    service.getPopularMovies(1).subscribe((res) => {
      expect(res).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${apiUrl}/movie/popular?api_key=${apiKey}&page=1`);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should fetch top rated movies', () => {
    const mockResponse: MovieResponse = { page: 1, results: [], total_pages: 1, total_results: 0 };

    service.getTopRatedMovies(1).subscribe((res) => {
      expect(res).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${apiUrl}/movie/top_rated?api_key=${apiKey}&page=1`);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should fetch movie details', () => {
    const mockResponse = { id: 123, title: 'Test Movie' };

    service.getMovieDetails(123).subscribe((res) => {
      expect(res).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(
      `${apiUrl}/movie/123?api_key=${apiKey}&append_to_response=videos,credits`
    );
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should fetch cast details', () => {
  const mockResponse = {
    id: 123,
    cast: [],
    crew: []
  };

  service.getCastDetails(123).subscribe((res) => {
    expect(res).toEqual(mockResponse);
  });

  const req = httpMock.expectOne(`${apiUrl}/movie/123/credits?api_key=${apiKey}`);
  expect(req.request.method).toBe('GET');
  req.flush(mockResponse);
});


  it('should search movies', () => {
    const mockResponse: MovieResponse = { page: 1, results: [], total_pages: 1, total_results: 0 };

    service.searchMovies('batman', 1).subscribe((res) => {
      expect(res).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(
      `${apiUrl}/search/movie?api_key=${apiKey}&query=batman&page=1`
    );
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });
});
