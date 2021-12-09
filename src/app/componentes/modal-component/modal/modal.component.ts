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
    check README Notes for developers 2

    
    
  */
  @Input() arrayOfEventsToShow:any;


  /*
    If day and month is the same but year, show on modal the date only once.
    i mean, e.g. "things happened on febreary 08" instead of 
    "things happened on february 08 and february 08".

    To do that we use isMonthAndDayTheSame property.

  */

  @Input() isMonthAndDayTheSame:boolean;

  

  /*
    must declare myErrorObjList as any if i want to be able to iterate over it on hteml template with ngfor

    We declare as a Set because an object is not iterable, but the Set is iterable,
    so we can add the object with the add() method, and then iterate over it if needed
    (for example, on a template, actually we will iterate over myErrorObjList on the modal template)
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


