import { GNewsArticle } from './g-news-article';

export interface GNewsResponse {
    articles: GNewsArticle[];
    totalArticles: number;
}
