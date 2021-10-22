import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-show-days',
  templateUrl: './show-days.component.html',
  styleUrls: ['./show-days.component.css']
})
export class ShowDaysComponent implements OnInit {

  @Input() valueTotalDays: number;
  constructor() {

    this.valueTotalDays=0;
   }

  ngOnInit(): void {
  }

}
