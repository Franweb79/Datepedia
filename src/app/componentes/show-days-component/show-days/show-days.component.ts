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
        
      })),
      transition('* => *', [
        animate('1s')
      ]),
    ]

    )
  ]
})
export class ShowDaysComponent implements OnInit,AfterViewInit {

 /*
    valueTotalDays and isDivFlipped receive their values from parent component
    home.
 */
 
  @Input() valueTotalDays: number;

  @Input() isDivFlipped: boolean;


  /*is ModalOpen will its value pass to child component app-modal*/
  public isModalOpen: boolean;


  /*
    firstDateToShowWhenFlipped

    and

    lastDateToShowWhenFlipped
  
    These 2 string properties will be used to show dates when this component is flipped.

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
    firstDateToShowOnModal

    and 

    lastDateToShowOnModal

    are used to passe its values to child component app-modal, then
    values can be shown on the modal.

    These two properties receive their values from date1 and date2 properties from the _dates service.

    We use them because service is private, so can´t use it on the template (outside the class), 
    so we need properties with public visibility
    in order to be used on component´s template

    As date and date 2 have a number[] type, we will convert them to string with a method created on the service
  */

  public firstDateToShowOnModal: string;
  public lastDateToShowOnModal: string;

  /*
    this two properties will be sent to the API on the proper order.

    We need them because the API requires them to be numbers,
    so we can´t simply send the same string properties we declared above, to send dates to modals.

    Also array of numbers can't be directly piped on the template as we can do with strings, so for the moment I find easier
    to do this way: string properties with dates to be shown on modals, array of numbers with dates to be sent to API
  */

  public arrayNumberWithFirstDateToBeSentToApi: number[];
  public arrayNumberWithLastDateToBeSentToApi: number[];


  /*
   
   Maybe this arrayOfObjectsWithEvents could have been declared as customEvent type, 
   with our own interface we have created, but I need to use the push() method on it
   so I find it better to be declared ar array of Object for now.

   The value from this property will be sent to app-modal child component, 
   to the property called arrayOfEventsToShow
  

  */
  public arrayOfObjectsWithEvents:Object[];

  /*
  
   to listen when arrayOfObjectsWithEvents changes (it gets events from API),
   si child component´s property arrayOfEventsToShow can also change,
   we use the viewChild decorator
  
  */

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
    

    this.convertDatesToModal();

    this.callAPI();
  }

  /*
    we will get the dates provided by service properties date1 and date2 
    as a a number[] format to send them to the API.
    
    Inside convertDatesToModal() we convert them to strings 
    so they can be better manipulated on the modal template
  
  */
  getDates(): number[][] {
    return [this._dates.date1, this._dates.date2];
  }


  /*
    Inside convertDatesToModal() we will not only convert dates to strings,
    but order them to be chronologically shown on the modal
  
    to order, we will do now with Date objects, following a bit the tricks of comparing dates as told here

    https://masteringjs.io/tutorials/fundamentals/compare-dates

  */
  convertDatesToModal(): void {

    /* 
      First, array destructuration to make work easier
    */

    const [date1, date2] = this.getDates();


    /*
    
      assign to string properties that will be passed to app-modal child component

    */

    this.firstDateToShowOnModal = this._dates.convertArrayOfNumbersIntoString(date1);

    this.lastDateToShowOnModal = this._dates.convertArrayOfNumbersIntoString(date2);


    /*
      
      For the order operations, we will use  2 local variables, d1 and d2, 
      and depending which date is higher, we will reassign values to d1 and d2
      


    */

    const d1 = new Date(this.firstDateToShowOnModal);


    const d2 = new Date(this.lastDateToShowOnModal);



    /*
      
      if d1 > d2 (example : 2021-04-06 > 2009-07-08), because user has introduced them that way,
      we reassign variables to be shown on modal
      with correct order. The second date will be the first date and vice versa
       
    */

    if (d1 > d2) {

      let aux = this.firstDateToShowOnModal;

      this.firstDateToShowOnModal = this.lastDateToShowOnModal;

      this.lastDateToShowOnModal = aux;
    }
  }

  callAPI() {


    /*
    
      Here we also need to order dates, as on convertDatesToModal().

      But here I decided to create local string variables to store the string dates,
      despite using the same string class properties we created to send dates to modal.

      These local variables are 

      stringWithFirstDateToBeSentToAp

      and 

      stringWithLastDateToBeSentToApi

      Reason is, logic here is similar but different than on convertDatesToModal().

      Here we don't need to show them on a template, just be used
      to be converted to Date objects and then be ordered, like also did on convertDatesToModal().

      The array numbers we get from the service
      can`t be converted to the Date objects we need to order dates,
      but that can be done with string properties.

      But using the same string properties we have to send Dates on modal,
      could cause flow not working fine. So that is why I decided to create different local string properties


      As said, we need Date objects to order dates,
      but we also need dates with number type (dates come as an array of numbers from the service 
      so that work is done) to be sent to the API because this API requires them to be that number type.

      I am aware that the code used to order dates on this method 
      and on convertDatesToModal() is almost the same, so it can be refactored
      , but for now I let this way and with a //TODO to create a function that can be used
      on both methods.
      
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

    if (d1 > d2) {

      let aux = this.arrayNumberWithFirstDateToBeSentToApi;

      this.arrayNumberWithFirstDateToBeSentToApi = this.arrayNumberWithLastDateToBeSentToApi;

      this.arrayNumberWithLastDateToBeSentToApi = aux;
    }


    /*
    
      before sending to the API, 
      we will destructure to get month and day easier

      first position will be empty because we only need 2nd and 3rd values
      of the array number (first position would be the year and we don´t need it)

    */

    const [, monthToSend1,dayToSend1]=this.arrayNumberWithFirstDateToBeSentToApi;

    const [, monthToSend2,dayToSend2]=this.arrayNumberWithLastDateToBeSentToApi;

    /*
      we use a promise to ensure we control the async request done by
       _http:get() method which is used inside _dates service.

       So, once we have 1st result with events corresponding to the 1st date,
       and added them as first element of an array, we make the 2nd request
    */

    this._callApi.getEventsPromise(monthToSend1, dayToSend1).then(()=>{
      
      /*
        clear array first because maybe we have stored results 
        for a previous 2 dates request before
      */

      this.arrayOfObjectsWithEvents=[];
      
      this.arrayOfObjectsWithEvents.push(this._callApi.dataToShow);

      

      //As said, once we have the first date events, we make the same for the second

      this._callApi.getEventsPromise(monthToSend2,dayToSend2).then(
        ()=>{

          this.arrayOfObjectsWithEvents.push(this._callApi.dataToShow);

        
          /*
            now that we have the 2 events results from the 2 dates, we assign them 
            to a modal property which will be shown on that modal
            
          */

            this.modal.arrayOfEventsToShow=this.arrayOfObjectsWithEvents;



        }
      );

    });      

  }

}
