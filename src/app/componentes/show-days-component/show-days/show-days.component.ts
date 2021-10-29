import { Component, Input, OnInit, HostBinding } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition,
  // ...
} from '@angular/animations';

@Component({
  selector: 'app-show-days',
  templateUrl: './show-days.component.html',
  styleUrls: ['./show-days.component.css'],
  animations:[

    trigger('flipUnflip',[

        state('flipped',style({
          
          transform: "rotateY(360deg)"
        })),
        state('notFlipped',style({
          //backgroundColor:"aquamarine"
        })),
        transition('* => *', [
          animate('1s')
        ]),
      ]

    )
  ] 
})
export class ShowDaysComponent implements OnInit {

  @Input() valueTotalDays: number;

  @Input() isDivFlipped:boolean;

  /*will pass to child component app-modal*/
  public isModalOpen:boolean;
  
  constructor() {

    this.valueTotalDays=0;
    this.isDivFlipped=false;
    this.isModalOpen=false;
   }

  ngOnInit(): void {
  }

  showModal(){
   /* let modal_t = document.getElementById("modal-1")
    modal_t.classList.remove('modal-hidden')
    modal_t.classList.add('modal-show');*/
    this.isModalOpen=!this.isModalOpen;
   // alert(this.isModalOpen);
  }

}
