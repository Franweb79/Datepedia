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
          backgroundColor:"red"
        })),
        state('notFlipped',style({
          backgroundColor:"aquamarine"
        }))
      ]

    )
  ] 
})
export class ShowDaysComponent implements OnInit {

  @Input() valueTotalDays: number;

  @Input() isDivFlipped:boolean;
  
  constructor() {

    this.valueTotalDays=0;
    this.isDivFlipped=false;
   }

  ngOnInit(): void {
  }

}
