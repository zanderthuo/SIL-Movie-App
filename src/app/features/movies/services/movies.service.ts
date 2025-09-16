import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { MovieResponse } from '../../../core/models/movie-response.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  private http = inject(HttpClient);
  private apiUrl = environment.apiUrl;
  private apiKey = environment.apiKey;

  getTrendingMovies(page = 1): Observable<MovieResponse> {
    return this.http.get<MovieResponse>(
      `${this.apiUrl}/trending/movie/week?api_key=${this.apiKey}&page=${page}`
    );
  }

  getPopularMovies(page = 1): Observable<MovieResponse> {
    return this.http.get<MovieResponse>(
      `${this.apiUrl}/movie/popular?api_key=${this.apiKey}&page=${page}`
    );
  }
  getTopRatedMovies(page = 1): Observable<MovieResponse> {
    return this.http.get<MovieResponse>(
      `${this.apiUrl}/movie/top_rated?api_key=${this.apiKey}&page=${page}`
    );
  }

  getMovieDetails(movieId: number): Observable<any> {
    return this.http.get<any>(
      `${this.apiUrl}/movie/${movieId}?api_key=${this.apiKey}&append_to_response=videos,credits`
    );
  }

  getCastDetails(movieId: number): Observable<any> {
    return this.http.get<any>(
      `${this.apiUrl}/movie/${movieId}/credits?api_key=${this.apiKey}`
    );
  }

}
