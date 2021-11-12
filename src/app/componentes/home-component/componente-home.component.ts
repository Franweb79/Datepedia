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

  /*
    totalDays will be used by getTotalDays() method.
    
    Receives the value stored on a property on _dates service.

    Will pass its value to another property on child component show-days-component, 
    
    on the HTML template.

  */
  public totalDays:number;

  /*
    
    isFlipped will pass its value to child component show-days-component.

    Will be used on flip() method and on the validatorFields() custom validator

  */
  public isFlipped:boolean;


  
  /*
  
    If you want to set a date here on 1st argument of FormControl, 
    
    must be following format string: 'yyyy-mm-dd'

    this.validatorFields() is my custom validator

  */
  myDatesForm:FormGroup=new FormGroup({
    "firstYearToCheckDateString": new FormControl("", Validators.compose([Validators.required]) ),
    "lastYearToCheckDateString": new FormControl("", Validators.required),
  },this.validatorFields());

  /*
    with Viewchild, we bind two properties on the child component

    firstDateToShowWhenFlipped

    lastDateToShowWhenFlipped

    This are changed on each onSubmit() method like specified below

    this.showDays.firstDateToShowWhenFlipped=this._dates.convertArrayOfNumbersIntoString(firstOrderedDate);

    this.showDays.lastDateToShowWhenFlipped=this._dates.convertArrayOfNumbersIntoString(lastOrderedDate);

    These way we ensure they will be properly changed and shown with correct values
    each time they are changed.
    
    Other way of sending data to child components is like we did on the HTML template
    this way, with valuetotalDays and isDivFlipped, which are properties on the
    child component which receive data from totalDays and isFlipped, which are
    properties on this current component.

          <app-show-days [valueTotalDays]=totalDays [isDivFlipped]="isFlipped" #showDaysComponentTemplateReference></app-show-days>

   
    In both ways, the child component properties must be using the @Input() decorator
    to "listen"
    
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

    //destructuring the object with dates values into const, more usable
    const {firstYearToCheckDateString, lastYearToCheckDateString}=this.myDatesForm.value;

      

      
      

      this._dates.calculateTotalDaysBetweenDates(firstYearToCheckDateString,lastYearToCheckDateString)

      
    /*
      
      after calling the method calculateTotalDaysBetweenDates, 
      one of the effects is we have an orderedDatesArray, so we use it.

      First, destructure it
    

    */

    const [firstOrderedDate, lastOrderedDate]=this._dates.orderedDatesArray;

    /*
      now convert each date to string on the child components properties
      which will be shown

    */

    this.showDays.firstDateToShowWhenFlipped=this._dates.convertArrayOfNumbersIntoString(firstOrderedDate);

    this.showDays.lastDateToShowWhenFlipped=this._dates.convertArrayOfNumbersIntoString(lastOrderedDate);



    this.getTotalDays();


    this.flip();
    
    
  }

  /*
    as _dates service is injected as private, we can't show it 
    on the template, so we created a property
    called "totaldays" here on this class to assign the value that _dates.totalDays 
    property on that service has

  */

  getTotalDays():number{

    this.totalDays=this._dates.totalDays;

    return this.totalDays;//for testing on spec

  }

  //will be triggered when push calculate along with ngsubmit
  flip(){
    this.isFlipped=!this.isFlipped;
  }

   /*
    TODO TEST esta funcion
    

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

          /*
             we set isFlipped to false to be sure that animation will be triggered again next time, when we press calculate
          */
          this.isFlipped=false;
          return {'areEqual':false}
  
        }else{
  
          return null;
          
          
  
        }
       
      }
      
  
    }
  

}
