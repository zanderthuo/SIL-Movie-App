import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private http = inject(HttpClient);
  private baseUrl = environment.apiUrl;
  private apiKey = environment.apiKey;

  /**
   * Generic GET request
   * @param endpoint API endpoint (e.g. "movie/popular")
   * @param params Extra query parameters
   */
  get<T>(endpoint: string, params: Record<string, string | number> = {}): Observable<T> {
    let httpParams = new HttpParams().set('api_key', this.apiKey);

    Object.entries(params).forEach(([key, value]) => {
      httpParams = httpParams.set(key, value.toString());
    });

    return this.http.get<T>(`${this.baseUrl}/${endpoint}`, { params: httpParams });
  }

  /**
   * Generic POST request
   */
  post<T, B = unknown>(
    endpoint: string,
    body: B,
    params: Record<string, string | number> = {}
  ): Observable<T> {
    let httpParams = new HttpParams().set('api_key', this.apiKey);

    Object.entries(params).forEach(([key, value]) => {
      httpParams = httpParams.set(key, value.toString());
    });

    return this.http.post<T>(`${this.baseUrl}/${endpoint}`, body, { params: httpParams });
  }
}
