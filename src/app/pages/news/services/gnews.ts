import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { defer } from 'rxjs';
import { GNewsResponse } from '../types/g-news-response';
import { tap } from 'rxjs';

const G_NEWS_URL = 'https://function-bun-production-eba5.up.railway.app/api/';
const G_NEWS_TOP_HEADLINES_URL = G_NEWS_URL + 'top-headlines';

@Injectable()
export class Gnews {
    private http = inject(HttpClient);

    private _loading = signal(false);
    loading = this._loading.asReadonly();

    getTopHeadlines(page: number = 1, query?: string) {
        return defer(() => {
            this._loading.set(true);
            let params = new HttpParams().set('page', page.toString());
            if (query?.trim()) {
                params = params.set('q', query.trim());
            }
            return this.http.get<GNewsResponse>(G_NEWS_TOP_HEADLINES_URL, { params });
        }).pipe(
            tap({
                finalize: () => this._loading.set(false),
            })
        );
    }
}