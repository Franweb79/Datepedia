import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';


import { ShowDaysComponent } from './show-days.component';
import { DatesService } from '../../../services/dates-service/dates.service';

describe('ShowDaysComponent', () => {
  let component: ShowDaysComponent;
  let fixture: ComponentFixture<ShowDaysComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowDaysComponent ],
      imports: [ HttpClientTestingModule ],
      providers:[DatesService]

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
  it('test convertDatesToModal(), to check if dates are ordered to be shown on modal-> 2021-09-06 and 2022-05-04',()=>{
    
    component.firstDateToShowOnModal="2021-09-06";
    component.lastDateToShowOnModal="2022-05-04";
    
    component.convertDatesToModal();


    expect(component.firstDateToShowOnModal).toBe("2022-05-04");
    expect(component.lastDateToShowOnModal).toBe("2021-09-06");
  });
});
