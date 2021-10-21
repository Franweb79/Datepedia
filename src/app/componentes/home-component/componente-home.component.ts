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

  public totalDays:number;
  
  /*TODO crear mi validacion custom para que se desactive el boton de enviar
  si son la misma fecha*/
  myDatesForm:FormGroup=new FormGroup({
    "firstYearToCheckDateString": new FormControl("", Validators.required),
    "lastYearToCheckDateString": new FormControl("", Validators.required),
  });

  
  

  constructor(private _dates:DatesService) {
    
    this.totalDays=0;

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

    this.getTotalDays();

   //TODO we could calc now days of date 1, days of bdate 2, days between years if so
   //and add all of them.
   //TODO if there is equal year, see if needed to order months or not.
    
  }

  /*
    as service is private, we can show it on the template, so we create a property
    calles "totaldays" here on this class to assign what the _dates.totalDays property
    on that service has
  */

  getTotalDays(){

    this.totalDays=this._dates.totalDays;

  }

  

  

}
