import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { DatesService } from 'src/app/services/dates.service';


@Component({
  selector: 'app-componente-home',
  templateUrl: './componente-home.component.html',
  styleUrls: ['./componente-home.component.css']
})
export class HomeComponent implements OnInit {

  title:string = 'Days between dates calculator';

  public date1:number[];
  public date2:number[];

  myDatesForm:FormGroup=new FormGroup({
    "firstYearToCheckDateString": new FormControl("2004-06-04", Validators.required),
    "lastYearToCheckDateString": new FormControl("2018-09-06", Validators.required),
  });

  
  

  constructor(private _dates:DatesService) {
    this.date1=[];
    this.date2=[];

    this.myDatesForm.patchValue
   }

  ngOnInit(): void {
  }

  onSubmit(){

    //detrucutring the object with dates values into const, more usable
    const {firstYearToCheckDateString, lastYearToCheckDateString}=this.myDatesForm.value;

    //date1 receives the date correctly splitted into a number array with year, month, and day 
    this.date1=this._dates.splitYearToCheckString(firstYearToCheckDateString);

    //detructuring the string array with date year, month and day
    const [date1Year, date1Month, date1Day]=this.date1;
    

    
    //we do same steps for date 2
    this.date2=this._dates.splitYearToCheckString(lastYearToCheckDateString);

    const  [date2Year, date2Month, date2Day]=this.date2;
    
    console.log (this._dates.isLeapYearToCheck(date1Year));
  }

  

  

}
