import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';

import { HomeComponent } from './componente-home.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  const myFormBuilder:FormBuilder=new FormBuilder()

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  /*
    DATES MUST ALWAYS BE PATTERN YYYY-MM-DD, NOW WITH DD-MM-YYYY
  */
  it('same month and year: 1st date: 06-04-2004, 2nd date:08-04-2004',()=>{
    component.myDatesForm=myFormBuilder.group({
      firstYearToCheckDateString:"2004-04-06",
      lastYearToCheckDateString:"2004-04-08"
    });

    fixture.nativeElement.querySelector("#submitDatesButton");
    component.onSubmit();

    
    expect(component.totalDays).toBe(2);
  });

  it('same year: 1st date: 06-04-2004, 2nd date:11-06-2004',()=>{
    component.myDatesForm=myFormBuilder.group({
      firstYearToCheckDateString:"2004-04-06",
      lastYearToCheckDateString:"2004-06-11"
    });

    fixture.nativeElement.querySelector("#submitDatesButton");
    component.onSubmit();


    expect(component.totalDays).toBe(66);
  });
  it('same day and month: 1st date: 06-04-2004, 2nd date:06-04-2008',()=>{
    component.myDatesForm=myFormBuilder.group({
      firstYearToCheckDateString:"2004-04-06",
      lastYearToCheckDateString:"2008-04-06"
    });

    fixture.nativeElement.querySelector("#submitDatesButton");
    component.onSubmit();


    expect(component.totalDays).toBe(1461);
  });

  it('1st date is higer on year: 1st date: 06-10-2012, 2nd date:06-04-2008',()=>{
    component.myDatesForm=myFormBuilder.group({
      firstYearToCheckDateString:"2012-10-06",
      lastYearToCheckDateString:"2008-04-06"
    });

    fixture.nativeElement.querySelector("#submitDatesButton");
    component.onSubmit();


    expect(component.totalDays).toBe(1644);
  });

  it('1st date is higer on month: 1st date: 06-10-2012, 2nd date:06-04-2012',()=>{
    component.myDatesForm=myFormBuilder.group({
      firstYearToCheckDateString:"2012-10-06",
      lastYearToCheckDateString:"2012-04-06"
    });

    fixture.nativeElement.querySelector("#submitDatesButton");
    component.onSubmit();


    expect(component.totalDays).toBe(183);
  });

  it('1st date is higer on day: 1st date: 14-10-2012, 2nd date:06-10-2012',()=>{
    component.myDatesForm=myFormBuilder.group({
      firstYearToCheckDateString:"2012-10-14",
      lastYearToCheckDateString:"2012-10-06"
    });

    fixture.nativeElement.querySelector("#submitDatesButton");
    component.onSubmit();


    expect(component.totalDays).toBe(8);
  });

  it('1st date is higer on year and day only but month is lower: 1st date: 06-08-2012, 2nd date:04-10-2008',()=>{
    component.myDatesForm=myFormBuilder.group({
      firstYearToCheckDateString:"2012-08-06",
      lastYearToCheckDateString:"2008-10-04"
    });

    fixture.nativeElement.querySelector("#submitDatesButton");
    component.onSubmit();


    expect(component.totalDays).toBe(1402);
  });

  it('1st date is higer on year only but month and day are lower: 1st date: 02-08-2012, 2nd date:04-10-2008',()=>{
    component.myDatesForm=myFormBuilder.group({
      firstYearToCheckDateString:"2012-08-02",
      lastYearToCheckDateString:"2008-10-04"
    });

    fixture.nativeElement.querySelector("#submitDatesButton");
    component.onSubmit();


    expect(component.totalDays).toBe(1398);
  });
  it('1st date is higer on everything: 1st date: 06-12-2012, 2nd date:04-10-2008',()=>{
    component.myDatesForm=myFormBuilder.group({
      firstYearToCheckDateString:"2012-12-06",
      lastYearToCheckDateString:"2008-10-04"
    });

    fixture.nativeElement.querySelector("#submitDatesButton");
    component.onSubmit();


    expect(component.totalDays).toBe(1524);
  });

  it('exact dates: 1st date: 14-10-2012, 2nd date:14-10-2012',()=>{
    component.myDatesForm=myFormBuilder.group({
      firstYearToCheckDateString:"2012-10-14",
      lastYearToCheckDateString:"2012-10-14"
    });

    fixture.nativeElement.querySelector("#submitDatesButton");
    component.onSubmit();


    expect(component.totalDays).toBe(0);
  });
});
