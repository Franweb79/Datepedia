import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, ValidatorFn, AbstractControl } from '@angular/forms';
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

  /*// TODO tone of these options:
  -dates as a service to be passed directly to modal (propierties from service called date1 and date2)

  -these 2 following properties are used to send to the modal which is actually a "·grandchild", so will be passes
  first to show-days component, then to modal component*/

  public firstDateToSendToModal:string;

  public lastDateToSendToModal:string;
  
  /*
  //TODO hacer igual que si es la misma fecha vuelva a 2select two different dates"
  
  If want to set a date here, must be following format string: 'yyyy-mm-dd'
  */
  myDatesForm:FormGroup=new FormGroup({
    "firstYearToCheckDateString": new FormControl("", Validators.compose([Validators.required]) ),
    "lastYearToCheckDateString": new FormControl("", Validators.required),
  },this.validatorFields());

  
  

  constructor(private _dates:DatesService) {
    
    this.totalDays=0;

    this.isFlipped=false;

    this.firstDateToSendToModal="";
    this.lastDateToSendToModal="";

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

   /*
    TODO TEST esta funcion
    //TODO cuando las fechas sean iguales, si esta mostrandose los resultados d ela op. anterior, que desaparezca el boton 
    amarillo de sabias que y eso tb, que vuelva al "select 2 dates"

  */
    validatorFields(): ValidatorFn  | null{

      return (control:AbstractControl):{[key: string]: boolean} | null=>{
  
  
        const {firstYearToCheckDateString,lastYearToCheckDateString}=control.value;
        
        if(firstYearToCheckDateString===lastYearToCheckDateString){
  
          console.log ("son iguales");
       
          this.totalDays=0;
          this.isFlipped=false;//to be sure that animation will be triggered next time we press calculate
          //o sea que este objeto es el que hace que sea invaLIDO EL FORM, el null no hace nada
         return {'areEqual':false}
  
        }else{
  
          return null;
          
          
  
        }
       
      }
      
  
    }
  

}
