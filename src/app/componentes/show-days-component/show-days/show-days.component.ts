import { Component, Input, OnInit, HostBinding } from '@angular/core';
import { DatesService } from '../../../services/dates-service/dates.service';
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


  /*
    We import dates service to be able to show two selected dates on modal
    remember as service is private we must create a getter to put date1 and date2 
    from service on public properties from this component.
    Remember they come being array of numbers
  */

    public firstDateToShowOnModal:string;
    public lastDateToShowOnModal:string;
  
  constructor(private _dates:DatesService) {

    this.valueTotalDays=0;
    this.isDivFlipped=false;
    this.isModalOpen=false;

    this.firstDateToShowOnModal="";

    this.lastDateToShowOnModal="";
   }

  ngOnInit(): void {
  }

  
  showModal(){
   
    this.isModalOpen=!this.isModalOpen;
   // alert(this.isModalOpen);

   this.getDates();
  }

  /*we get the dates and convert them to string*/

  /*
    to solve the problem that we could find second date 
    being older than first date, as we have to order before,
    on dateService method calculateTotalDaysBetweenDates(), we will do now another way
    with Date objects, following a bit the tricks of comparing dates as told here

    https://masteringjs.io/tutorials/fundamentals/compare-dates
  */
  getDates():void {
   
    this.firstDateToShowOnModal=this._dates.convertArrayOfNumbersIntoString(this._dates.date1);

    this.lastDateToShowOnModal=this._dates.convertArrayOfNumbersIntoString(this._dates.date2);


   console.log(this.firstDateToShowOnModal);

   /*
    as we cant do

       this.firstDateToShowOnModal=new Date(this.firstDateToShowOnModal);

    because we can´t assign as Date Type was specified as a tring variable, we would do
    with 2 local variables, and depending which date is higher, we will reassign
    which will be the firstDate and which will be second, in terms to be shown on modal


  */
   
    const d1=new Date(this.firstDateToShowOnModal);
    console.log("dates for modal date 1"+d1);

    const d2=new Date(this.lastDateToShowOnModal);

    console.log("dates for modal date 2"+d2);

    console.log ("is first date correct order:");

    /*
      if this is false, because second date is older, we reassing variables to be wshown on modals
      with different order, the second date will be the first date and viceversa
    */
    if(d1>d2){
      let aux=this.firstDateToShowOnModal;

      this.firstDateToShowOnModal=this.lastDateToShowOnModal;

      this.lastDateToShowOnModal=aux;
    }
  }

}
