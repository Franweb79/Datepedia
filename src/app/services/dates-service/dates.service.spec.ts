import { TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';


import { DatesService } from './dates.service';

describe('DatesService', () => {
  let service: DatesService;

  const myFormBuilder:FormBuilder=new FormBuilder()


  beforeEach(() => {
    TestBed.configureTestingModule({
     
    });
    service = TestBed.inject(DatesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

 
});
