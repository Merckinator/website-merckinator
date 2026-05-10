import { Component, input, ChangeDetectionStrategy } from '@angular/core';
import { GNewsArticle } from '../types/g-news-article';
import { DatePipe, NgOptimizedImage } from '@angular/common';

@Component({
    selector: 'merck-article',
    imports: [DatePipe, NgOptimizedImage],
    templateUrl: './article.html',
    styleUrl: './article.scss',
    host: { ngSkipHydration: 'true' },
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Article {
    article = input.required<GNewsArticle>();
}
