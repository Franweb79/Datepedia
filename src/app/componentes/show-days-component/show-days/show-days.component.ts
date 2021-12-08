import { Component, Input, OnInit, ViewChild, AfterViewInit } from '@angular/core';
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
    home-component.
 */

    //TODO apuntes de test servicio como lo hemos hecho
 
  @Input() valueTotalDays: number;

  @Input() isDivFlipped: boolean;


  /*isModalOpen will pass its value to child component app-modal*/

  public isModalOpen: boolean;


  /*
    firstDateToShowWhenFlipped

    and

    lastDateToShowWhenFlipped
  
    These 2 string properties will be used to show dates when this component is flipped.

    for example: "total days between 2021-06-01 and 2021-07-02 are... "

    As the order to show dates can be different on this component than on modal,
    because year is not present, I also will declare 2 new properties:

    firstDateToShowOnModal

    lastDateToShowOnModal

  */

  @Input() firstDateToShowWhenFlipped:string;
  @Input() lastDateToShowWhenFlipped:string;


  /*
    firstDateToShowOnModal

    and 

    lastDateToShowOnModal

    are used to pass its values to child component app-modal, then
    values can be shown on the modal.

    These two properties receive their values from date1 and date2 properties from the _dates service.

    We use them because service is private, so can´t use it on the template (outside the class), 
    so we need properties with public visibility
    in order to be used on component´s HTML template

    As date and date 2 have a number[] type, we will convert them to string with a custom method 
    created on the service
  */

  public firstDateToShowOnModal: string;
  public lastDateToShowOnModal: string;

  /*
    
    arrayNumberWithFirstDateToBeSentToApi

    and

    arrayNumberWithLastDateToBeSentToApi
  
    This two properties will be sent to the API on the proper order.

    We need them because the API requires them to be numbers,
    so we can´t simply send the same string properties we declared above, to send dates to modals.

    Also array of numbers can't be directly piped on the template as we can do with strings, 
    so for the moment I find easier to do this way: 
      -string properties with dates to be shown on modals, 
      -array of numbers with dates to be sent to API
  */

  public arrayNumberWithFirstDateToBeSentToApi: number[];
  public arrayNumberWithLastDateToBeSentToApi: number[];


  /*
   
   Maybe this arrayOfObjectsWithEvents could have been declared as customEvent type, 
   with our own interface we have created, but I need to use the push() method on it
   so I find it better to be declared as array of Objects for now.

   The value from this property will be sent to app-modal child component, 
   to the property called arrayOfEventsToShow
  

  */
  public arrayOfObjectsWithEvents:Object[];


  /*
  
   to listen when arrayOfObjectsWithEvents changes (it gets events from API),
   so child component´s property arrayOfEventsToShow can also change,
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
  
    to order, we will do now with Date objects, 
    following a bit the tricks of comparing dates as told here

    https://masteringjs.io/tutorials/fundamentals/compare-dates

  */
  convertDatesToModal(): void {

    /* 
      First, array destructuration to make work easier
    */

    const [date1, date2] = this.getDates();

    console.log (date1);

    /*

      This condition is used because if month and day is the same on both dates,
      we will set a property on the child modal component.

      If that property is true, we will only show date one time
      e.h. "events happened on Nomvember 03". 

      If we don´t create this logic, "events happened on november 03 and november 03" 
      would be shown. It has no sense and is a worse user experience.

    */
    if((date1[1]===date2[1]) && (date1[2]===date2[2])){
      this.modal.isMonthAndDayTheSame=true;
    }else
    {
      this.modal.isMonthAndDayTheSame=false;

    }

    /*
    

      To show dates on modal, we need a different logic than the one we use to order 
      the complete dates.

      Why? On modal we show no year. We will only show month and day, so a valid order for:

      2021-06-04 (second date to be shown)

      and

      2020-08-02 (first date to be shown)

      would not be a valid order for

      06-04 (first date to be shown)

      and

      08-02 (second date to be shown)


      We can see order is different because we don´t take the year into account and that changes everything


      So we can´t simply do

      this.firstDateToShowOnModal = this._dates.convertArrayOfNumbersIntoString(date1);

      this.lastDateToShowOnModal = this._dates.convertArrayOfNumbersIntoString(date2);

      Also note that we can´t either show on modal the complete dates 
      because we are not showing events from
      e.g. 2021-06-04, but events from what happened on any 06-04 from any year

      We must take month and day from each date and then order then 
      having only those values of month and day in mind
      
    */

    /*  

     We will first convert to Date type

     We need dates to be string before converting to Date types

    */

      this.firstDateToShowOnModal = this._dates.convertArrayOfNumbersIntoString(date1);

      this.lastDateToShowOnModal = this._dates.convertArrayOfNumbersIntoString(date2);


      /*
        For the order operations, we will use 2 local variables, d1 and d2, 
        and depending which date is higher, we will reassign values to d1 and d2
      */

      const d1 = new Date(this.firstDateToShowOnModal);


      const d2 = new Date(this.lastDateToShowOnModal);


    if(d1.getMonth()>d2.getMonth()){

      //e.g. 09-04 and 08-04, order will be changed

      let aux = this.firstDateToShowOnModal;

      this.firstDateToShowOnModal = this.lastDateToShowOnModal;

      this.lastDateToShowOnModal = aux;

      /*
        we don´t need to compare if d1.getMonth() < d2.getMonth(), 
        then nothing changes or is re-assigned
      */

    }else if(d1.getMonth()===d2.getMonth()){
      /*
        if month is the same, we will compare with days
        e.g. 06-12 and 06-08 order will be changed. 
        NOTE, to get day of the month is getDate(),not getDay()
      */
      
      
        if(d1.getDate()>d2.getDate()){

          let aux = this.firstDateToShowOnModal;

          this.firstDateToShowOnModal = this.lastDateToShowOnModal;
    
          this.lastDateToShowOnModal = aux;

        }

        /*
          if dates have same month and day, in order to be shown on the modal, that is handled
          on getEventsPromise() from the call-api-service, because we don´t need to request 
          2 results in that case. This way we will save resources.

        */

    }

  }

  /* we will declare as async to be able to use the await keyword; that means, be able to cut
  execution of callAPI() until promise resolves. Then we can safely use the values 
  returned by the promise.

  If we don´t manage with promises or async await, the sync code would execute before async code
  and could lead to unexpected behavior, e.g. if we need the results of the async code first
  to be used on the sync code

  */

  async callAPI() {


    /*
    
      Here we also need to order dates, as on convertDatesToModal().

      But here I decided to create two new local string variables to store the string dates
      to send dates to the API,
      despite using the same string class properties we created to send dates to modal.

      These local variables are 

      stringWithFirstDateToBeSentToApi

      and 

      stringWithLastDateToBeSentToApi

      Reason is, logic here is similar but different than on convertDatesToModal().

      Here we don't need to show them on a template, just be used
      to be converted to Date objects and then be ordered, like also did on convertDatesToModal().

      The array numbers we get from the _dates service
      can`t be converted to the Date objects we need to order dates,
      but that can be done with string properties.

      But using the same string properties we have to show dates on modal,
      could cause flow not working fine. So that is why I decided to create 
      different local string properties


      As said, we need Date objects to order dates,
      but we also need dates as number type (dates come as an array of numbers from the service 
      so that work is done) to be sent to the API because this API requires 
      them to be number type.

      I am aware that the code used to order dates on this method 
      and on convertDatesToModal() is almost the same, so it can be refactored,
      but for now I let this way 
      
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

    if(d1.getMonth()>d2.getMonth()){

      //e.g. 09-04 and 08-04, order will be changed

      let aux = this.arrayNumberWithFirstDateToBeSentToApi;;

      this.arrayNumberWithFirstDateToBeSentToApi = this.arrayNumberWithLastDateToBeSentToApi;

      this.arrayNumberWithLastDateToBeSentToApi = aux;


    }else if(d1.getMonth()===d2.getMonth()){

      if(d1.getDate()>d2.getDate()){

        let aux = this.arrayNumberWithFirstDateToBeSentToApi;;

        this.arrayNumberWithFirstDateToBeSentToApi = this.arrayNumberWithLastDateToBeSentToApi;

        this.arrayNumberWithLastDateToBeSentToApi = aux;

      }


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
       with await, until this promise is not resolved, 
       the code after promise (which is sync code) won´t take place.

       With no await or proper control, that sync code would be executed before the async code

    */ 
    
    await this._callApi.getEventsAsyncAwait(monthToSend1, dayToSend1).then(()=>{

      /*
        clear array first because maybe we have stored results 
        for a previous 2 dates request before
      */

        this.arrayOfObjectsWithEvents=[];
      

        console.log("events from date 1 with async await");

        console.log (this._callApi.dataToShow);

        

    }).catch(()=>{

       /*
        we set showError first to default values because maybe we have stored results 
        for a previous  request before
      */

        this.modal.showError={
          status:0,
          message:"Sorry, something went wrong, please try again",
          reason:""
        }
        
      
        this.modal.showError=this._callApi.modalError;

        this.modal.myErrorObjList.add(this.modal.showError);

        console.log(this.modal.myErrorObjList);

    });
//       

    this.arrayOfObjectsWithEvents.push(this._callApi.dataToShow);

    console.log ("array events1");
    console.log (this.arrayOfObjectsWithEvents);

    await this._callApi.getEventsAsyncAwait(monthToSend2, dayToSend2).then(()=>{

      console.log("events from date 2 with async await");
      console.log (this._callApi.dataToShow);



    }).catch(()=>{

      /*
       we set showError first to default values because maybe we have stored results 
       for a previous  request before
     */

       this.modal.showError={
         status:0,
         message:"Sorry, something went wrong, please try again",
         reason:""
       }
       
     
       this.modal.showError=this._callApi.modalError;

       this.modal.myErrorObjList.add(this.modal.showError);

       console.log(this.modal.myErrorObjList);
    });

    this.arrayOfObjectsWithEvents.push(this._callApi.dataToShow);
    console.log ("array events2");
    console.log (this.arrayOfObjectsWithEvents);
  

  }//callAPI

}//end of class
