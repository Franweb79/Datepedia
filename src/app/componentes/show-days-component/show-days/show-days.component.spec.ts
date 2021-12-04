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
  it('test convertDatesToModal(), this dates should change order to be shown on modal-> 2021-09-06 and 2022-05-04',()=>{
    
    const myDatesService=TestBed.inject(DatesService);

    /*we pass array numbers as would be passed to the service from the form after converting*/

    myDatesService.date1=[2021,9,6];

    myDatesService.date2=[2022,5,4];

    
    
    /*component.firstDateToShowOnModal="2021-09-06";
    component.lastDateToShowOnModal="2022-05-04";*/
    
    component.convertDatesToModal();

    /*after calling convertDatesToModal, first date to show on modal should be 2022,5,4 
    because month is lower*/

    expect(component.firstDateToShowOnModal).toBe("2022,5,4");
    expect(component.lastDateToShowOnModal).toBe("2021,9,6");
  });

  it('test convertDatesToModal(), this dates should change order to be shown on modal because month is the same so we compare the days-> 2021-11-06 and 2020-11-04',()=>{
    
    const myDatesService=TestBed.inject(DatesService);

    /*we pass array numbers as would be passed to the service from the form after converting*/

    myDatesService.date1=[2021,11,6];

    myDatesService.date2=[2020,11,4];

    
    component.convertDatesToModal();

    

    expect(component.firstDateToShowOnModal).toBe("2020,11,4");
    expect(component.lastDateToShowOnModal).toBe("2021,11,6");
  });

  it('test convertDatesToModal(), this dates should change order to be shown on modal because year and month is the same so we compare the days-> 2021-11-06 and 2021-11-04',()=>{
    
    const myDatesService=TestBed.inject(DatesService);

    /*we pass array numbers as would be passed to the service from the form after converting*/

    myDatesService.date1=[2021,11,6];

    myDatesService.date2=[2021,11,4];

    
    component.convertDatesToModal();

    

    expect(component.firstDateToShowOnModal).toBe("2021,11,4");
    expect(component.lastDateToShowOnModal).toBe("2021,11,6");
  });

  it('test convertDatesToModal(), this dates should change order to be shown on modal-> 2021-12-03 and 2019-11-03 (second year lower. second month lower. same day)',()=>{
    
    const myDatesService=TestBed.inject(DatesService);

    /*we pass array numbers as would be passed to the service from the form after converting*/

    myDatesService.date1=[2021,12,3];

    myDatesService.date2=[2019,11,3];

    
    component.convertDatesToModal();

    

    expect(component.firstDateToShowOnModal).toBe("2019,11,3");
    expect(component.lastDateToShowOnModal).toBe("2021,12,3");
  });

  it('test convertDatesToModal(), this dates should change order to be shown on modal-> 2021-11-08 and 2022-06-12 (second year higer. second month lower)',()=>{
    
    const myDatesService=TestBed.inject(DatesService);

    /*we pass array numbers as would be passed to the service from the form after converting*/

    myDatesService.date1=[2021,11,8];

    myDatesService.date2=[2022,6,12];

    
    component.convertDatesToModal();

    

    expect(component.firstDateToShowOnModal).toBe("2022,6,12");
    expect(component.lastDateToShowOnModal).toBe("2021,11,8");
  });
 

});
