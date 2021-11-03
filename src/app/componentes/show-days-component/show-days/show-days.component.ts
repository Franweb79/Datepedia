import { Component, Input, OnInit, HostBinding, APP_ID } from '@angular/core';
import { DatesService } from '../../../services/dates-service/dates.service';
import { CallApiService } from '../../../services/call-api-service/call-api.service';
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
export class ShowDaysComponent implements OnInit {

  @Input() valueTotalDays: number;

  @Input() isDivFlipped: boolean;


  /*will pass to child component app-modal*/
  public isModalOpen: boolean;


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


  constructor(private _dates: DatesService, private _callApi:CallApiService) {

    this.valueTotalDays = 0;
    this.isDivFlipped = false;
    this.isModalOpen = false;

    this.firstDateToShowOnModal = "";

    this.lastDateToShowOnModal = "";

    this.arrayNumberWithFirstDateToBeSentToApi = [];

    this.arrayNumberWithLastDateToBeSentToApi = [];
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
      if this is false, because second date is older, we reassing variables to be wshown on modals
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
    
      here i decide to create local variables to store the string dates,
      and not use string class properties like the ones created to show dates on modal 
      because logic 
      is different than on convertDatesToModal(),
      since now we dont need to show them on a template, just be used
      to be converted to Dates and then be ordered
      -original array numbers cant be converted to Date,
      and we need them to be sent to the api to interact with it easier
      than with strings-.
      Also using the same string class properties we have to control this logic,
      could cause things not working fine. I am sure it can be more properly refactored, so //TODO
      but now will let so 
      
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


    console.log(d1);

    console.log(d2);

    if (d1 > d2) {

      console.log("es mayor la primera");
      let aux = this.arrayNumberWithFirstDateToBeSentToApi;

      this.arrayNumberWithFirstDateToBeSentToApi = this.arrayNumberWithLastDateToBeSentToApi;

      this.arrayNumberWithLastDateToBeSentToApi = aux;
    }


    console.log("to send to api: ");

    console.log(this.arrayNumberWithFirstDateToBeSentToApi);

    console.log(this.arrayNumberWithLastDateToBeSentToApi);

    //before sending to the api, we will destructure to get month and day easier

    //first position will be empty because we need 2nd and 3rd values of the array number
    const [, monthToSend1,dayToSend1]=this.arrayNumberWithFirstDateToBeSentToApi;

    //now we call the callAPIService

    this._callApi.getEvents(monthToSend1, dayToSend1);

  }

}
