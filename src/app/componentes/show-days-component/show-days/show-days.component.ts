import { Component, Input, OnInit, HostBinding, APP_ID, Output, EventEmitter, ViewChild, AfterViewInit } from '@angular/core';
import { DatesService } from '../../../services/dates-service/dates.service';
import { CallApiService } from '../../../services/call-api-service/call-api.service';
import { ModalComponent } from '../../modal-component/modal/modal.component';
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
  animations: [

    trigger('flipUnflip', [

      state('flipped', style({

        transform: "rotateY(360deg)"
      })),
      state('notFlipped', style({
        //backgroundColor:"aquamarine"
      })),
      transition('* => *', [
        animate('1s')
      ]),
    ]

    )
  ]
})
export class ShowDaysComponent implements OnInit,AfterViewInit {

  @Input() valueTotalDays: number;

  @Input() isDivFlipped: boolean;


  /*will pass to child component app-modal*/
  public isModalOpen: boolean;


  /*
    These 2 string properties will be used to show dates when the component is flipped
    for example: "total days between 2021-06-01 and 2021-07-02 are... "
    //TODO I am sure maybe is a way to refactor and use same properties to be passes
    and show on modals without creating the 2 other string properties I have declared here

    firstDateToShowOnModal

    lastDateToShowOnModal

    But for now I let this way


  */
  @Input() firstDateToShowWhenFlipped:string;
  @Input() lastDateToShowWhenFlipped:string;


  /*
    We import dates service to be able to show two selected dates on modal
    remember as service is private we must create a getter to put date1 and date2 
    from service on public properties from this component.
    Remember they come being array of numbers
  */

  public firstDateToShowOnModal: string;
  public lastDateToShowOnModal: string;

  /*
    this two properties will be sent to the api on the proper order,
    but we need it to be numbers so can´t use the properties used as string on modals,
    and also array of numbers cant be piped on the template
  */

  public arrayNumberWithFirstDateToBeSentToApi: number[];
  public arrayNumberWithLastDateToBeSentToApi: number[];


//TODO make this custom type, customEvent, so maybe export interface we already
//have defined on call-api-service 
  public arrayOfObjectsWithEvents:Object[];

  


  /*
  //TODO when this works, a apuntes rxjs o angular
  to capture when arrayOfObjectsWithEvents changes (it gets events from api),
  then child property will also change*/

  @ViewChild('myModalChild') modal!: ModalComponent;

  ngAfterViewInit () {
    // Now you can assign things on child components

    
  }

  constructor(private _dates: DatesService, private _callApi:CallApiService) {

    this.valueTotalDays = 0;
    this.isDivFlipped = false;
    this.isModalOpen = false;



    this.firstDateToShowWhenFlipped="";
    this.lastDateToShowWhenFlipped="";

    this.firstDateToShowOnModal = "";

    this.lastDateToShowOnModal = "";

    this.arrayNumberWithFirstDateToBeSentToApi = [];

    this.arrayNumberWithLastDateToBeSentToApi = [];

    this.arrayOfObjectsWithEvents=[];

  }

  ngOnInit(): void {
  }


  showModal() {

    this.isModalOpen = !this.isModalOpen;
    // alert(this.isModalOpen);

    this.convertDatesToModal();

    this.callAPI();
  }

  /*
    we will get the dates on an array of numbers format to send them to the wiki API
    and inside convert to convertDatesToModal() them to strings and manipuñate them easier once moda is shown
  
  */
  getDates(): number[][] {
    return [this._dates.date1, this._dates.date2];
  }

  /*we convert the dates to string and order them to be properly shown on the modal*/

  /*
    to order, we will do now with Date objects, following a bit the tricks of comparing dates as told here

    https://masteringjs.io/tutorials/fundamentals/compare-dates
  */
  convertDatesToModal(): void {

    /* 
      array destructuration to make work easier
    */

    const [date1, date2] = this.getDates();


    this.firstDateToShowOnModal = this._dates.convertArrayOfNumbersIntoString(date1);

    this.lastDateToShowOnModal = this._dates.convertArrayOfNumbersIntoString(date2);




    /*
      as we cant do

        this.firstDateToShowOnModal=new Date(this.firstDateToShowOnModal);

      because we can´t assign as Date Type was specified as a tring variable, we would do
      with 2 local variables, and depending which date is higher, we will reassign
      which will be the firstDate and which will be second, in terms to be shown on modal


    */

    const d1 = new Date(this.firstDateToShowOnModal);


    const d2 = new Date(this.lastDateToShowOnModal);



    /*
      if this is false, because second date is older, we reassign variables to be wshown on modals
      with different order, the second date will be the first date and viceversa

      //TODO As this piece of code will be also used on callApi() to order the dates,
      but in that case would be array of numbers -we need number on the api, not strings-,
       I could create a method for both cases but for now I let it so,
       maybe a method which onyl uses local variables and then returning date strings properly ordered
       and store them on properties if needed (in the case os having to show them on template)

       
    */
    if (d1 > d2) {
      let aux = this.firstDateToShowOnModal;

      this.firstDateToShowOnModal = this.lastDateToShowOnModal;

      this.lastDateToShowOnModal = aux;
    }
  }

  callAPI() {


    /*
    
      here i decide to create local string variables to store the string dates,
      and not use string class properties like the ones created to show dates 
      on modal, because logic here
      is different than on convertDatesToModal().

      Here we dont need to show them on a template, just be used
      to be converted to Dates objects and then be ordered
      -original array numbers can`t be converted to Date objects,
      and we need them to be numbers to be sent to the api-.

      Also using the same string class properties we have to control other things,
      could cause flow not working fine. I am sure it can be more properly refactored, so //TODO
      but now will let this way
      
    */

    let stringWithFirstDateToBeSentToApi: string = "";
    let stringWithLastDateToBeSentToApi: string = "";




    const [date1, date2] = this.getDates();

    stringWithFirstDateToBeSentToApi = this._dates.convertArrayOfNumbersIntoString(date1);

    stringWithLastDateToBeSentToApi = this._dates.convertArrayOfNumbersIntoString(date2);

    this.arrayNumberWithFirstDateToBeSentToApi = date1;
    this.arrayNumberWithLastDateToBeSentToApi = date2;


    const d1 = new Date(stringWithFirstDateToBeSentToApi);


    const d2 = new Date(stringWithLastDateToBeSentToApi);


    /*console.log(d1);

    console.log(d2);*/

    if (d1 > d2) {

    //  console.log("es mayor la primera");
      let aux = this.arrayNumberWithFirstDateToBeSentToApi;

      this.arrayNumberWithFirstDateToBeSentToApi = this.arrayNumberWithLastDateToBeSentToApi;

      this.arrayNumberWithLastDateToBeSentToApi = aux;
    }


   /* console.log("to send to api: ");

    console.log(this.arrayNumberWithFirstDateToBeSentToApi);

    console.log(this.arrayNumberWithLastDateToBeSentToApi);*/

    /*
    
      before sending to the api, 
      we will destructure to get month and day easier

      first position will be empty because we need 2nd and 3rd values
       of the array number

    */

    const [, monthToSend1,dayToSend1]=this.arrayNumberWithFirstDateToBeSentToApi;

    const [, monthToSend2,dayToSend2]=this.arrayNumberWithLastDateToBeSentToApi;

    /*
      we use a promise to ensure we control the async request on
       _http:get() inside service.

       So, once we have 1st result and added as first element of an array, we make the 2nd request
    */

    this._callApi.getEventsPromise(monthToSend1, dayToSend1).then(()=>{
      
      //clear array first because maybe we have stored results for 2 dates before

      this.arrayOfObjectsWithEvents=[];
      
      this.arrayOfObjectsWithEvents.push(this._callApi.dataToShow);

      

      //once we have the first date events, we make the same for the second

      this._callApi.getEventsPromise(monthToSend2,dayToSend2).then(
        ()=>{
          this.arrayOfObjectsWithEvents.push(this._callApi.dataToShow);

          console.log ("array");

          console.log (this.arrayOfObjectsWithEvents);

          /*
            now that we have the 2 values, we assign to a modal property which will be shown
            on that modal
            
          */

            this.modal.arrayOfEventsToShow=this.arrayOfObjectsWithEvents;

          
            
            console.log ("modal shit");
            console.log (this.modal.arrayOfEventsToShow);


        }
      );



      
      //console.log (this._callApi.dataToShow);

    });
    
       
    

    //make the same with second date
    //console.log (this._callApi.dataToShow);

    /*const [, monthToSend2,dayToSend2]=this.arrayNumberWithLastDateToBeSentToApi;

    this._callApi.getEvents(monthToSend2, dayToSend2);*/


  }

}
