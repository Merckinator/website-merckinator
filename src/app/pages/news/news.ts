import {
    Component,
    computed,
    DestroyRef,
    inject,
    OnInit,
    signal,
    ChangeDetectionStrategy,
} from '@angular/core';
import { PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';
import { debounceTime, distinctUntilChanged, skip, fromEvent } from 'rxjs';
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
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class News implements OnInit {
    articles = signal<GNewsArticle[]>([]);
    error = signal<string | null>(null);
    currentPage = signal(1);
    totalArticles = signal(0);

    hasMore = computed(() => this.articles().length < this.totalArticles());

    searchQuery = signal('');

    gNews = inject(Gnews);
    private destroyRef = inject(DestroyRef);
    private router = inject(Router);
    private route = inject(ActivatedRoute);
    private platformId = inject(PLATFORM_ID);

    showScrollTop = signal(false);

    constructor() {
        toObservable(this.searchQuery)
            .pipe(
                skip(1),
                debounceTime(300),
                distinctUntilChanged(),
                takeUntilDestroyed(this.destroyRef)
            )
            .subscribe((query) => {
                void this.router.navigate([], {
                    relativeTo: this.route,
                    queryParams: query.trim() ? { q: query.trim() } : { q: null },
                    queryParamsHandling: 'merge',
                    replaceUrl: true,
                });
                this.loadNews(1);
            });

        if (isPlatformBrowser(this.platformId)) {
            fromEvent(window, 'scroll')
                .pipe(takeUntilDestroyed(this.destroyRef))
                .subscribe(() => {
                    const scrollPosition = window.scrollY;
                    this.showScrollTop.set(scrollPosition > 300);
                });
        }
    }

    ngOnInit(): void {
        const q = this.route.snapshot.queryParamMap.get('q');
        if (q) {
            this.searchQuery.set(q);
        }
        this.loadNews(1);
    }

    loadNews(page: number = 1): void {
        this.error.set(null);
        this.gNews
            .getTopHeadlines(page, this.searchQuery())
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe({
                next: (response) => {
                    if (page === 1) {
                        this.articles.set(response.articles ?? []);
                    } else {
                        this.articles.update((current) => [
                            ...current,
                            ...(response.articles ?? []),
                        ]);
                    }
                    this.totalArticles.set(response.totalArticles ?? 0);
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

    clearSearch(): void {
        this.searchQuery.set('');
    }

    scrollToTop(): void {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    }

    onSearchInput(event: Event): void {
        const value = (event.target as HTMLInputElement).value;
        this.searchQuery.set(value);
    }
}
