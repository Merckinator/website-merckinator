import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { WelcomeComponent } from './welcome.component';

describe('Welcome', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WelcomeComponent],
      providers: [provideRouter([])],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(WelcomeComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
});
