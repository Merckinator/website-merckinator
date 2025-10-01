import { Component, inject, OnInit, signal } from '@angular/core';
import { Gnews } from './services/gnews';
import { GNewsArticle } from './types/g-news-article';
import { tap } from 'rxjs';
import { Article } from './article/article';

@Component({
    selector: 'merck-news',
    imports: [Article],
    providers: [Gnews],
    templateUrl: './news.html',
    styleUrl: './news.scss',
})
export class News implements OnInit {
    articles = signal<GNewsArticle[]>([]);

    private gNews = inject(Gnews);

    ngOnInit(): void {
        this.gNews
            .getTopHeadlines()
            .pipe(tap((response) => console.debug('The GNews response was:', response)))
            .subscribe({
                next: (response) => this.articles.set(response.articles),
                error: (error) =>
                    console.error(
                        'There was an error fetching the Top Headlines from GNews',
                        error
                    ),
            });
    }
}
