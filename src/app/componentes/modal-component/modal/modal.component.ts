import { Component, ElementRef, Input, OnInit } from '@angular/core';
import { DatesService } from '../../../services/dates-service/dates.service';

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

  constructor(private _dates:DatesService) { 

    this.isModalOpenChild=false;

    this.date1ToShow="";

    this.date2ToShow="";
  }

  ngOnInit(): void {

    
  }

  

 
}


