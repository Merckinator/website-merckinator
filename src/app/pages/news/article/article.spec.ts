import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Article } from './article';
import { GNewsArticle } from '../types/g-news-article';

describe('Article', () => {
  let component: Article;
  let fixture: ComponentFixture<Article>;

  const mockArticle: GNewsArticle = {
    content: 'Test content',
    description: 'Test description',
    id: 'test-id',
    image: 'https://example.com/image.jpg',
    lang: 'en',
    publishedAt: new Date().toISOString(),
    source: { country: 'us', id: 'test', name: 'Test Source', url: 'https://example.com' },
    title: 'Test Article',
    url: 'https://example.com/article',
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Article],
    })
      .overrideComponent(Article, {
        set: { template: '<div>Mock Article</div>' },
      })
      .compileComponents();

    fixture = TestBed.createComponent(Article);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
