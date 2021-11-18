import { Component, ElementRef, Input, OnInit } from '@angular/core';
import { DatesService } from '../../../services/dates-service/dates.service';
import { CallApiService } from '../../../services/call-api-service/call-api.service';

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


      //TODO IS DAY AND MONTH IS THE SAME BUT YEAR IS DIFFERENT, SHOW ON MODAL ONLY ONCE the name, i mean,
      //not "things happened on february 08 and february 08"


  constructor(private _dates:DatesService, private _callApi:CallApiService) { 


    this.date1ToShow="";

    this.date2ToShow="";

    this.arrayOfEventsToShow=[];

  }

  ngOnInit(): void {



  }

  

  

 
}


