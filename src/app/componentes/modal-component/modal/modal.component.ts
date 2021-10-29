import { Component, ElementRef, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  /*receives from parent component show-days-component*/

  @Input() isModalOpenChild:boolean;

  constructor() { 

    this.isModalOpenChild=false;
  }

  ngOnInit(): void {

    // we added this so that when the backdrop is clicked the modal is closed.
   
  }

 
}


