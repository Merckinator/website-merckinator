import { TestBed } from '@angular/core/testing';

import { Gnews } from './gnews';

describe('Gnews', () => {
  let service: Gnews;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Gnews);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
