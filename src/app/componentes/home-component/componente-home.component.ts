import { Component, OnChanges, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, ValidatorFn, AbstractControl } from '@angular/forms';
import { DatesService } from 'src/app/services/dates-service/dates.service';
import { ShowDaysComponent } from '../show-days-component/show-days/show-days.component';


@Component({
  selector: 'app-componente-home',
  templateUrl: './componente-home.component.html',
  styleUrls: ['./componente-home.component.css']
})
export class HomeComponent implements OnInit {

  title:string = 'Days between dates calculator';

  public totalDays:number;

  public isFlipped:boolean;


  
  /*
  
    If want to set a date here, must be following format string: 'yyyy-mm-dd'
  */
  myDatesForm:FormGroup=new FormGroup({
    "firstYearToCheckDateString": new FormControl("", Validators.compose([Validators.required]) ),
    "lastYearToCheckDateString": new FormControl("", Validators.required),
  },this.validatorFields());

  /*
    this way we bind two properties on the child components 
    and will be changed each time they changed, other way is sending
    on the template html template like with isDivFlipped property for example,
    and the @Input() decorator on child.
    
  */
  @ViewChild('showDaysComponentTemplateReference') showDays!:ShowDaysComponent;

  ngAfterViewInit () {
    // Now you can assign things on child components

    
  }
  

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

      
    /*
      making the method calculateTotalDaysBetweenDates, one of the effects is we have an orderedDatesArray, so we use it
    */
      console.log (this._dates.orderedDatesArray);

      /* 
        first, destructure it
      */

      const [firstOrderedDate, lastOrderedDate]=this._dates.orderedDatesArray;

      /*
        now convert each date to string on the child components properties
        which will be shown

      */

      this.showDays.firstDateToShowWhenFlipped=this._dates.convertArrayOfNumbersIntoString(firstOrderedDate);

      this.showDays.lastDateToShowWhenFlipped=this._dates.convertArrayOfNumbersIntoString(lastOrderedDate);


      //console.log (this._dates.totalDays);

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
        
    
        /*
        
          the ==="" works because by some reason, if we delete some field by hand on the input,
          -for example the days on a valid date we already introduced, control goes to "", so we checked that way
        
        */

          /*
          TODO ask on SO why I can access the formgroup with console.log(control) but when 
          I try to access a property like status it fires the formcontrol´s property (for example status)
          and not the formgroups

          for example if I do now console.log (control) appears the formgroup but
          if i do console.log(control.valid) gets the valid property of one of the inputs, which
          also had that valid property as well as formgroup

          it only seems to work with control.value with gets all the controls like shown on detructuration 

                  const {firstYearToCheckDateString,lastYearToCheckDateString}=control.value;

                  but it doenst work with any other property. If formgroup has VALID set to false, for example,
                  when i get control.valid it gets a valid, maybe because the controls are valid?
                  
          */
        if( (firstYearToCheckDateString===lastYearToCheckDateString) || firstYearToCheckDateString==="" || lastYearToCheckDateString===""){
  
          console.log ("son mal");
       
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
