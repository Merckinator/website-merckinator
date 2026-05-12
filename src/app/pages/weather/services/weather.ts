import { Injectable, signal } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
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

  private readonly API_URL = 'https://weather-proxy.up.railway.app/weather'; 

  constructor(private http: HttpClient) {}

  getWeather(query: string): Observable<WeatherData> {
    this._loading.set(true);
    const params = new HttpParams().set('q', query);
    return this.http.get<WeatherData>(this.API_URL, { params }).pipe(
      finalize(() => this._loading.set(false))
    );
  }
}
