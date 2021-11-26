import { Component, ElementRef, Input, OnInit } from '@angular/core';
import { DatesService } from '../../../services/dates-service/dates.service';
import { CallApiService } from '../../../services/call-api-service/call-api.service';
import { customError } from '@interfaces/modal-error-interface';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {


  /*
    date1ToShow and date2ToShow

    are used on the HTML to show the user the dates which events are referring to,

    with a date pipe to format them.

    They receive their values drom show days parent component,
    from properties called firstDateToShowOnModal and lastDateToShowOnModal respectively  
  */

  @Input() date1ToShow:string;

  @Input() date2ToShow:string;

  /*
    
  //TODO al blog, y apuntes de git, hay que sacar las carpetas del proyecto y actualizar el git con add y eso, antes de meterlas a gitignore y actualizar otra vez el git con add y todo eso
  arrayOfEventsToShow is used here on modal component HTML template
    to show the events on a certain date.

    I have declared it as 'any' because in order to use it on the template
    is easier to access properties. With a more strict type was giving problems.
    //TODO look for a better solution

    It receives its value from parent component show-days-component,
    through a property of parent component called arrayOfObjectsWithEvents

    Both are binded on show-days-component HTML template
    and also value is assigned inside that component´s .ts code
    on the _callApi service´s getEventsPromise() method
    
  */
  @Input() arrayOfEventsToShow:any;


  /*
    If day and month is the same but year, show on modal the date only once.
    i mean, e.g. "things happened on febreary 08" instead of 
    "things happened on february 08 and february 08".

    To do that we use isMonthAndDayTheSame property.

  */

  @Input() isMonthAndDayTheSame:boolean;

  //TODO mete el set en typescript aprende pa wque es https://medium.com/ramsatt/map-set-in-typescript-angular-643e506e6c3c
  
  /*
    TODO check on production what happens with errors through some requests, to see if it
    properly reinitializes error variables, like myErrorObjList and showError
    or modalError on call-api-service

  */
  /*
    must declare myErrorObjList as any if i want to be able to iterate over it on hteml template with ngfor
  */

public myErrorObjList:any=new Set();

  /*
    showError:

    a public property which will receive the customError created by getEventsPromise()
    an call-api-service in case of error.


  */

    public showError:customError;

  constructor() { 


    this.date1ToShow="";

    this.date2ToShow="";

    this.arrayOfEventsToShow=[];

    this.isMonthAndDayTheSame=false;

    this.showError={
      status:0,
      message:"Sorry, something went wrong, please try again",
      reason:""
    }

  }

  ngOnInit(): void {



  }

  

  

 
}


