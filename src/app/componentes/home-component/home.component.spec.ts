import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, FormControl } from '@angular/forms';

import { HomeComponent } from './home.component';

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

  it('same year. same month. same day-> 1st date: 14-10-2012, 2nd date:14-10-2012',()=>{
    component.myDatesForm=myFormBuilder.group({
      firstYearToCheckDateString:"2012-10-14",
      lastYearToCheckDateString:"2012-10-14"
    });
  
    fixture.nativeElement.querySelector("#submitDatesButton");
    component.onSubmit();
  
  
    expect(component.totalDays).toBe(0);
  });

    

  it('same year. same month. day higher-> 1st date: 12-04-2004, 2nd date:06-04-2004',()=>{
    component.myDatesForm=myFormBuilder.group({
      firstYearToCheckDateString:"2004-04-12",
      lastYearToCheckDateString:"2004-04-06"
    });
  
    fixture.nativeElement.querySelector("#submitDatesButton");
    component.onSubmit();
  
  
    expect(component.totalDays).toBe(6);
  });

  it('same year. same month. day lower-> 1st date: 06-04-2004, 2nd date:08-04-2004',()=>{
    component.myDatesForm=myFormBuilder.group({
      firstYearToCheckDateString:"2004-04-06",
      lastYearToCheckDateString:"2004-04-08"
    });
  
    fixture.nativeElement.querySelector("#submitDatesButton");
    component.onSubmit();
  
      
    expect(component.totalDays).toBe(2);
  });

  it('same year. month lower. day lower-> 1st date: 06-04-2004, 2nd date:11-06-2004',()=>{
    component.myDatesForm=myFormBuilder.group({
      firstYearToCheckDateString:"2004-04-06",
      lastYearToCheckDateString:"2004-06-11"
    });
  
    fixture.nativeElement.querySelector("#submitDatesButton");
    component.onSubmit();
  
  
    expect(component.totalDays).toBe(66);
  });

  it('same year. month higher, day lower-> 1st date: 06-10-2012, 2nd date:06-04-2012',()=>{
    component.myDatesForm=myFormBuilder.group({
      firstYearToCheckDateString:"2012-10-06",
      lastYearToCheckDateString:"2012-04-06"
    });
  
    fixture.nativeElement.querySelector("#submitDatesButton");
    component.onSubmit();
  
  
    expect(component.totalDays).toBe(183);
  });
  
    
  
  it('same year. same month. day higer-> 1st date: 14-10-2012, 2nd date:06-10-2012',()=>{
    component.myDatesForm=myFormBuilder.group({
      firstYearToCheckDateString:"2012-10-14",
      lastYearToCheckDateString:"2012-10-06"
    });
  
    fixture.nativeElement.querySelector("#submitDatesButton");
    component.onSubmit();
  
  
    expect(component.totalDays).toBe(8);
  });
  
  

  
  it('lower year. same month. same day-> 1st date: 06-04-2004, 2nd date:06-04-2008',()=>{
    component.myDatesForm=myFormBuilder.group({
      firstYearToCheckDateString:"2004-04-06",
      lastYearToCheckDateString:"2008-04-06"
    });

    fixture.nativeElement.querySelector("#submitDatesButton");
    component.onSubmit();


    expect(component.totalDays).toBe(1461);
  });

  it('lower year. lower month. same day-> 1st date: 06-02-2004, 2nd date:06-04-2008',()=>{
    component.myDatesForm=myFormBuilder.group({
      firstYearToCheckDateString:"2004-02-06",
      lastYearToCheckDateString:"2008-04-06"
    });

    fixture.nativeElement.querySelector("#submitDatesButton");
    component.onSubmit();


    expect(component.totalDays).toBe(1521);
  });

  it('lower year. lower month. lower day-> 1st date: 05-02-2004, 2nd date:06-04-2008',()=>{
    component.myDatesForm=myFormBuilder.group({
      firstYearToCheckDateString:"2004-02-05",
      lastYearToCheckDateString:"2008-04-06"
    });

    fixture.nativeElement.querySelector("#submitDatesButton");
    component.onSubmit();


    expect(component.totalDays).toBe(1522);
  });

  it('lower year. lower month. higer day-> 1st date: 05-02-2004, 2nd date:06-04-2008',()=>{
    component.myDatesForm=myFormBuilder.group({
      firstYearToCheckDateString:"2004-02-07",
      lastYearToCheckDateString:"2008-04-06"
    });

    fixture.nativeElement.querySelector("#submitDatesButton");
    component.onSubmit();


    expect(component.totalDays).toBe(1520);
  });

  it('higer year. Higher month. Same day-> 1st date: 06-10-2012, 2nd date:06-04-2008',()=>{
    component.myDatesForm=myFormBuilder.group({
      firstYearToCheckDateString:"2012-10-06",
      lastYearToCheckDateString:"2008-04-06"
    });

    fixture.nativeElement.querySelector("#submitDatesButton");
    component.onSubmit();


    expect(component.totalDays).toBe(1644);
  });

  it('higer year. Higher month. lower day-> 1st date: 05-10-2012, 2nd date:06-04-2008',()=>{
    component.myDatesForm=myFormBuilder.group({
      firstYearToCheckDateString:"2012-10-05",
      lastYearToCheckDateString:"2008-04-06"
    });

    fixture.nativeElement.querySelector("#submitDatesButton");
    component.onSubmit();


    expect(component.totalDays).toBe(1643);
  });

  it('higer year, higer month, higer day-> 1st date: 06-12-2012, 2nd date:04-10-2008',()=>{
    component.myDatesForm=myFormBuilder.group({
      firstYearToCheckDateString:"2012-12-06",
      lastYearToCheckDateString:"2008-10-04"
    });

    fixture.nativeElement.querySelector("#submitDatesButton");
    component.onSubmit();


    expect(component.totalDays).toBe(1524);
  });

  
  it('higer year, lower month, higer day-> 1st date: 06-08-2012, 2nd date:04-10-2008',()=>{
    component.myDatesForm=myFormBuilder.group({
      firstYearToCheckDateString:"2012-08-06",
      lastYearToCheckDateString:"2008-10-04"
    });

    fixture.nativeElement.querySelector("#submitDatesButton");
    component.onSubmit();


    expect(component.totalDays).toBe(1402);
  });

  it('higer  year. lower month. lower day-> 1st date: 02-08-2012, 2nd date:04-10-2008',()=>{
    component.myDatesForm=myFormBuilder.group({
      firstYearToCheckDateString:"2012-08-02",
      lastYearToCheckDateString:"2008-10-04"
    });

    fixture.nativeElement.querySelector("#submitDatesButton");
    component.onSubmit();


    expect(component.totalDays).toBe(1398);
  });
  
  
  
});
