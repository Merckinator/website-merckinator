import { GNewsSource } from './g-news-source';

export interface GNewsArticle {
    content: string;
    description: string;
    id: string;
    image: string;
    lang: string;
    publishedAt: string;
    source: GNewsSource;
    title: string;
    url: string;
}
