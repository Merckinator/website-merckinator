import { Component, computed, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Gnews } from './services/gnews';
import { GNewsArticle } from './types/g-news-article';
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
    currentPage = signal(1);
    totalArticles = signal(0);
    
    hasMore = computed(() => this.articles().length < this.totalArticles());

    gNews = inject(Gnews);
    private destroyRef = inject(DestroyRef);

    ngOnInit(): void {
        this.loadNews();
    }

    loadNews(page: number = 1): void {
        this.error.set(null);
        this.gNews
            .getTopHeadlines(page)
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe({
                next: (response) => {
                    if (page === 1) {
                        this.articles.set(response.articles);
                    } else {
                        this.articles.update(current => [...current, ...response.articles]);
                    }
                    this.totalArticles.set(response.totalArticles);
                    this.currentPage.set(page);
                },
                error: (error) => {
                    console.error(
                        'There was an error fetching the Top Headlines from GNews',
                        error
                    );
                    this.error.set('Failed to load news. Please try again.');
                },
            });
    }

    loadMore(): void {
        if (!this.gNews.loading() && this.hasMore()) {
            this.loadNews(this.currentPage() + 1);
        }
    }
}