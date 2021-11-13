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
    isModalOpenChild

    receives its value from parent component show-days-component

    through a propoerty called isModalOpen from parent component
  
  */

  @Input() isModalOpenChild:boolean;

  /*
    date1ToShow and date2ToShow

    are used on the HTML to show the user the dates which events are referring to,

    with a date pipe to format them
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


  /*
      arrayOfEventsToShow will be destructured into 
      events1Date and events2Date 
      properties. Maybe I found them no more necessary since I haven´t
      seen where else are they used, but at the moment won´t delete it, not before checking
      //TODO check where else are they used and if can be deleted

  */
  public events1Date:Object;
  
  public events2date:Object;

  /*
    eventObjectConvertedToArray
  
    To convert the objects inside array of objects into 
    arrays, maybe easier 
    to manipulate
  */
  public eventObjectConvertedToArray:any;

  public arrayOfEventsAsArrays:any;

  constructor(private _dates:DatesService, private _callApi:CallApiService) { 

    this.isModalOpenChild=false;

    this.date1ToShow="";

    this.date2ToShow="";

    this.arrayOfEventsToShow=[];

    this.eventObjectConvertedToArray=[];

    this.arrayOfEventsAsArrays=[];

    

    //destructure

     [this.events1Date,this.events2date]=this.arrayOfEventsToShow;

  }

  ngOnInit(): void {



  }

  

  

 
}


