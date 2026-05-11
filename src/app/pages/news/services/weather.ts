import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, finalize } from 'rxjs';

export interface WeatherData {
  location: {
    name: string;
    region: string;
    country: string;
    lat: number;
    lon: number;
    tz_id: string;
  };
  current: {
    date: string;
    time: string;
    temp_c: number;
    temp_f: number;
    condition: {
      text: string;
      icon: string;
      code: number;
    };
    wind_mph: number;
    wind_kph: number;
    humidity: number;
    feelslike_c: number;
    feelslike_f: number;
  };
}

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private _loading = signal(false);
  loading = this._loading.asReadonly();

  // Replace with your actual Railway proxy URL once deployed
  private readonly API_URL = '/api/weather'; 

  constructor(private http: HttpClient) {}

  getWeather(query: string): Observable<WeatherData> {
    this._loading.set(true);
    return this.http.get<WeatherData>(`${this.API_URL}?q=${query}`).pipe(
      finalize(() => this._loading.set(false))
    );
  }
}
