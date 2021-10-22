import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowDaysComponent } from './show-days.component';

describe('ShowDaysComponent', () => {
  let component: ShowDaysComponent;
  let fixture: ComponentFixture<ShowDaysComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowDaysComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowDaysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
