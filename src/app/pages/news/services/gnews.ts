import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { GNewsResponse } from '../types/g-news-response';
import { tap } from 'rxjs';

const G_NEWS_URL = 'https://function-bun-production-eba5.up.railway.app/api/';
const G_NEWS_TOP_HEADLINES_URL = G_NEWS_URL + 'top-headlines';

@Injectable()
export class Gnews {
    private http = inject(HttpClient);

    private _loading = signal(false);
    loading = this._loading.asReadonly();

    getTopHeadlines() {
        this._loading.set(true);

        return this.http.get<GNewsResponse>(G_NEWS_TOP_HEADLINES_URL).pipe(
            tap({
                finalize: () => this._loading.set(false),
            })
        );
    }
}
