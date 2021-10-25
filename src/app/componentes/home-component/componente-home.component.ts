import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { DatesService } from 'src/app/services/dates-service/dates.service';


@Component({
  selector: 'app-componente-home',
  templateUrl: './componente-home.component.html',
  styleUrls: ['./componente-home.component.css']
})
export class HomeComponent implements OnInit {

  title:string = 'Days between dates calculator';

  public totalDays:number;

  public isFlipped:boolean;
  
  /*TODO crear mi validacion custom para que se desactive el boton de enviar
  si son la misma fecha
  //TODO hacer igual que si es la misma fecha vuelva a 2select two different dates"
  
  If want to set a date here, must be following format string: 'yyyy-mm-dd'
  */
  myDatesForm:FormGroup=new FormGroup({
    "firstYearToCheckDateString": new FormControl("", Validators.compose([Validators.required]) ),
    "lastYearToCheckDateString": new FormControl("", Validators.required),
  },this._dates.validatorFields());

  
  

  constructor(private _dates:DatesService) {
    
    this.totalDays=0;

    this.isFlipped=false;

   }

  ngOnInit(): void {
  }

  onSubmit():void{

    

      //set totalDays to 0

      this._dates.totalDays=0;

      //detrucutring the object with dates values into const, more usable
      const {firstYearToCheckDateString, lastYearToCheckDateString}=this.myDatesForm.value;


      this._dates.calculateTotalDaysBetweenDates(firstYearToCheckDateString,lastYearToCheckDateString)

      console.log (this._dates.totalDays);

      this.getTotalDays();


      this.flip();
    
    
  }

  /*
    as service is private, we can show it on the template, so we create a property
    calles "totaldays" here on this class to assign what the _dates.totalDays property
    on that service has
  */

  getTotalDays():number{

    this.totalDays=this._dates.totalDays;

    return this.totalDays;//for testing on spec

  }

  //will be triggered when push calculñate along with ngsubmit
  flip(){
    this.isFlipped=!this.isFlipped;
  }
  

}
