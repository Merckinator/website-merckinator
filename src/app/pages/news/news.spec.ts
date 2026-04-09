import { HttpClient } from '@angular/common/http';
import { provideHttpClient } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { News } from './news';
import { Gnews } from './services/gnews';

describe('News', () => {
  let component: News;
  let fixture: ComponentFixture<News>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [News],
      providers: [provideHttpClient(), Gnews],
    }).compileComponents();

    fixture = TestBed.createComponent(News);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
