import { Component, inject, OnInit } from '@angular/core';
import { Gnews } from './services/gnews';
import { GNewsArticle } from './types/g-news-article';
import { tap } from 'rxjs';

@Component({
    selector: 'merck-news',
    imports: [],
    providers: [Gnews],
    templateUrl: './news.html',
    styleUrl: './news.scss',
})
export class News implements OnInit {
    articles: GNewsArticle[] = [];

    private gNews = inject(Gnews);

    ngOnInit(): void {
        this.gNews
            .getTopHeadlines()
            .pipe(tap((response) => console.debug('The GNews response was:', response)))
            .subscribe({
                next: (response) => (this.articles = response.articles),
                error: (error) =>
                    console.error(
                        'There was an error fetching the Top Headlines from GNews',
                        error
                    ),
            });
    }
}
