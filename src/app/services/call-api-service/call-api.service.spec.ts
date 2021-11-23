import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';


import { CallApiService } from './call-api.service';

describe('CallApiService', () => {
  let service: CallApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ]
    });
    service = TestBed.inject(CallApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
