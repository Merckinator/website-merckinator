import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { GNewsResponse } from '../types/g-news-response';

const G_NEWS_URL = 'https://function-bun-production-eba5.up.railway.app/api/';
const G_NEWS_TOP_HEADLINES_URL = G_NEWS_URL + 'top-headlines';

@Injectable()
export class Gnews {
    private http = inject(HttpClient);

    getTopHeadlines() {
        return this.http.get<GNewsResponse>(G_NEWS_TOP_HEADLINES_URL);
    }
}
