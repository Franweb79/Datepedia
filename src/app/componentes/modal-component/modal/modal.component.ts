import { Component, ElementRef, Input, OnInit } from '@angular/core';
import { DatesService } from '../../../services/dates-service/dates.service';
import { CallApiService } from '../../../services/call-api-service/call-api.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  /*receives from parent component show-days-component*/

  @Input() isModalOpenChild:boolean;

  @Input() date1ToShow:string;

  @Input() date2ToShow:string;

  @Input() arrayOfEventsToShow:Object[];

  public events1Date:Object;
  
  public events2date:Object;

  constructor(private _dates:DatesService, private _callApi:CallApiService) { 

    this.isModalOpenChild=false;

    this.date1ToShow="";

    this.date2ToShow="";

    this.arrayOfEventsToShow=[];

    //destructure

     [this.events1Date,this.events2date]=this.arrayOfEventsToShow;

  }

  ngOnInit(): void {

    console.log (this.arrayOfEventsToShow);


  }

  

  

 
}


