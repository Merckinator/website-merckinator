import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Gnews } from './services/gnews';
import { GNewsArticle } from './types/g-news-article';
import { tap } from 'rxjs';
import { Article } from './article/article';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

@Component({
    selector: 'merck-news',
    imports: [Article, ProgressSpinnerModule],
    providers: [Gnews],
    templateUrl: './news.html',
    styleUrl: './news.scss',
})
export class News implements OnInit {
    articles = signal<GNewsArticle[]>([]);
    error = signal<string | null>(null);

    gNews = inject(Gnews);
    private destroyRef = inject(DestroyRef);

    ngOnInit(): void {
        this.loadNews();
    }

    loadNews(): void {
        this.error.set(null);
        this.gNews
            .getTopHeadlines()
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe({
                next: (response) => this.articles.set(response.articles),
                error: (error) => {
                    console.error(
                        'There was an error fetching the Top Headlines from GNews',
                        error
                    );
                    this.error.set('Failed to load news. Please try again.');
                },
            });
    }
}
