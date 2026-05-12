import { Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { WeatherService, WeatherData } from './services/weather';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { CardModule } from 'primeng/card';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { MessageModule } from 'primeng/message';

@Component({
  selector: 'app-weather',
  standalone: true,
  imports: [CommonModule, FormsModule, ButtonModule, InputTextModule, CardModule, ProgressSpinnerModule, MessageModule],
  template: `
    <div class="weather-container">
      <div class="weather-header">
        <h1 class="weather-title">Weather</h1>
        <p class="weather-subtitle">Current conditions for any location</p>
      </div>

      <div class="search-box">
        <input
          type="text"
          pInputText
          [(ngModel)]="query"
          (keyup.enter)="fetchWeather()"
          placeholder="Enter city or zip code..."
          [disabled]="isLoading()"
        />
        <p-button label="Search" icon="pi pi-search" (onClick)="fetchWeather()" [disabled]="isLoading()"></p-button>
        <p-button
          label="Use my location"
          icon="pi pi-map-marker"
          severity="secondary"
          [outlined]="true"
          (onClick)="useMyLocation()"
          [disabled]="isLoading()"
        ></p-button>
      </div>

      @if (errorMessage()) {
        <div class="error-bar">
          <p-message severity="error" variant="simple" [closable]="true" (onClose)="errorMessage.set(null)">
            {{ errorMessage() }}
          </p-message>
        </div>
      }

      @if (isLoading()) {
        <div class="loader">
          <p-progressSpinner />
        </div>
      } @else if (weatherData()) {
        <div class="weather-display">
          <p-card class="main-card">
            <div class="current-weather">
              <div class="location">
                <h1>{{ weatherData()?.location?.name }}</h1>
                <p>{{ weatherData()?.location?.region }}, {{ weatherData()?.location?.country }}</p>
              </div>
              <div class="main-temp">
                <img [src]="weatherData()?.current?.condition?.icon" [alt]="weatherData()?.current?.condition?.text">
                <span class="temp">{{ weatherData()?.current?.temp_c }}°C</span>
              </div>
              <div class="condition-text">
                {{ weatherData()?.current?.condition?.text }}
              </div>
            </div>

            <div class="details-grid">
              <div class="detail-item">
                <span class="label">Feels Like</span>
                <span class="value">{{ weatherData()?.current?.feelslike_c }}°C</span>
              </div>
              <div class="detail-item">
                <span class="label">Humidity</span>
                <span class="value">{{ weatherData()?.current?.humidity }}%</span>
              </div>
              <div class="detail-item">
                <span class="label">Wind</span>
                <span class="value">{{ weatherData()?.current?.wind_kph }} km/h</span>
              </div>
            </div>
          </p-card>
        </div>
      } @else {
        <div class="empty-state">
          <p>Search for a city to see the current weather!</p>
        </div>
      }
    </div>
  `,
  styles: [`
    .weather-container {
      max-width: 800px;
      margin: 2rem auto;
      padding: 0 1rem;
      font-family: var(--font-family);
    }
    .weather-header {
      text-align: center;
      margin-bottom: var(--space-3xl);
      animation: fadeSlideUp 500ms cubic-bezier(0.4, 0, 0.2, 1) forwards;
    }
    .weather-title {
      font-size: clamp(2.5rem, 6vw, 4rem);
      font-weight: 600;
      letter-spacing: -0.03em;
      margin-bottom: var(--space-sm);
    }
    .weather-subtitle {
      font-family: var(--font-mono);
      font-size: 0.8125rem;
      color: var(--text-muted);
      text-transform: uppercase;
      letter-spacing: 0.08em;
    }
    .search-box {
      display: flex;
      gap: 1rem;
      margin-bottom: 2rem;
      justify-content: center;
      align-items: center;
    }
    .search-box input {
      width: 300px;
    }
    .loader {
      display: flex;
      justify-content: center;
      margin-top: 4rem;
    }
    .weather-display {
      display: flex;
      justify-content: center;
    }
    .main-card {
      width: 100%;
      max-width: 500px;
      text-align: center;
      background: var(--surface-card);
    }
    .current-weather {
      margin-bottom: 2rem;
    }
    .location h1 {
      margin: 0;
      font-size: 2rem;
    }
    .location p {
      margin: 0;
      color: var(--text-color-secondary);
    }
    .main-temp {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 1rem;
      margin: 1.5rem 0;
    }
    .main-temp img {
      width: 64px;
      height: 64px;
    }
    .temp {
      font-size: 3.5rem;
      font-weight: bold;
    }
    .condition-text {
      font-size: 1.25rem;
      text-transform: capitalize;
      margin-bottom: 2rem;
    }
    .details-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 1rem;
      border-top: 1px solid var(--surface-border);
      padding-top: 2rem;
    }
    .detail-item {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }
    .detail-item .label {
      font-size: 0.875rem;
      color: var(--text-color-secondary);
    }
    .detail-item .value {
      font-weight: 600;
    }
    .error-bar {
      display: flex;
      justify-content: center;
      margin-bottom: 1rem;
    }
    .empty-state {
      text-align: center;
      margin-top: 4rem;
      color: var(--text-color-secondary);
    }
  `]
})
export class Weather {
  private weatherService = inject(WeatherService);
  query = signal('');
  weatherData = signal<WeatherData | null>(null);
  errorMessage = signal<string | null>(null);
  locationLoading = signal(false);
  isLoading = computed(() => this.locationLoading() || this.weatherService.loading());

  useMyLocation() {
    if (typeof window === 'undefined') return;

    if (!('geolocation' in navigator)) {
      this.errorMessage.set('Geolocation is not supported by your browser.');
      return;
    }

    this.locationLoading.set(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.errorMessage.set(null);
        const { latitude, longitude } = position.coords;
        this.query.set(`${latitude},${longitude}`);
        this.fetchWeather();
      },
      (error) => {
        this.locationLoading.set(false);
        const messages: Record<number, string> = {
          1: 'Location access was denied. Please check your browser permissions.',
          2: 'Your position could not be determined.',
          3: 'Getting your location timed out. Please try again.'
        };
        this.errorMessage.set(messages[error.code] || 'An unknown location error occurred.');
      },
      { timeout: 8000 }
    );
  }

  fetchWeather() {
    const q = this.query();
    if (!q) return;

    this.errorMessage.set(null);
    this.weatherService.getWeather(q).subscribe({
      next: (data) => {
        this.locationLoading.set(false);
        this.weatherData.set(data);
      },
      error: (err) => {
        this.locationLoading.set(false);
        console.error('Weather fetch failed', err);
        this.weatherData.set(null);
        this.errorMessage.set('Failed to fetch weather data. Please try again.');
      }
    });
  }
}
