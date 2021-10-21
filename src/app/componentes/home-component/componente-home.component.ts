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

  

  myDatesForm:FormGroup=new FormGroup({
    "firstYearToCheckDateString": new FormControl("2004-06-04", Validators.required),
    "lastYearToCheckDateString": new FormControl("2018-09-06", Validators.required),
  });

  
  

  constructor(private _dates:DatesService) {
   

   }

  ngOnInit(): void {
  }

  onSubmit(){

    //set totalDays to 0

    this._dates.totalDays=0;

    //detrucutring the object with dates values into const, more usable
    const {firstYearToCheckDateString, lastYearToCheckDateString}=this.myDatesForm.value;


  this._dates.calculateTotalDaysBetweenDates(firstYearToCheckDateString,lastYearToCheckDateString)

    console.log (this._dates.totalDays);

    

   //TODO we could calc now days of date 1, days of bdate 2, days between years if so
   //and add all of them.
   //TODO if there is equal year, see if needed to order months or not.
    
  }

  

  

}
