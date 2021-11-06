import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { take } from 'rxjs/operators';

import { customEvents } from '@interfaces/custom-event-interface';


@Injectable({
  providedIn: 'root'
})



export class CallApiService {

  public apiBaseURL:string="https://byabbe.se/on-this-day";

  /*
    we will store the random data to be shown on a property
    which will be an object with a defined interface at the beginning of code outside class,
    to make it easier to understand
    
  */

  public dataToShow:customEvents;


  constructor(private _http:HttpClient) { 

    this.dataToShow={
      date:"",
      events:[]
    };

    
  }


  /*
    this promise will be used on show-days-component.
    
    PARAMETERS:month and day of the date to search

    We need it to make a promise or async/await to be sure
    we have the data returned for the first date before requesting
    for second date, and properly order them 

    TODO handle reject
  */
  getEventsPromise(pmonth:number,pday:number){

    return new Promise((resolve, reject)=>{

      
      let completeURL:string=`${this.apiBaseURL}/${pmonth}/${pday}/events.json`;

      /*
        we can´t use an RXJS operator  to catch only 5 random results
        of retrieved data, take() operator here doesnt work 
        because values should be emitted by the api one by one, 
        and all events for a date are all emitted together.

        We will use dataToShow property, which is customEvents type, 
        to store filtered data, then pass it to show-days-component's property called arrayOfObjectsWithEvents,
        and though a viewchild, pass the value to modal child component and be able
        to show it
        
        TODO for sure it maybe can be refactored or better done
      
      */
      this._http.get(completeURL).subscribe((data)=>{
       
         resolve (this.dataToShow=this.getRandomElementsOfArray(data));
         
   
   
       });

    });
  }

  /*

    parameter: the data object returned by the api, it contains, among others,
    an events property which is an array with events

    return a randomEvents custom type

  */
  getRandomElementsOfArray(pobjectWithEvents:any){

    //result, to store the index of random operation

    let result:number=0;
   
  
    let randomEvents:customEvents={
      date:"",
      events:[]
    };

    /*
      to catch is that event index has already been used, we will add here
      
    */

    let usedIndexes:number[]=[];

    
    /*

      https://www.geeksforgeeks.org/how-to-select-a-random-element-from-array-in-javascript/

    */

    for (let i=0;i<5;++i){

      result=Math.floor(Math.random()*pobjectWithEvents.events.length);

      /*
        search if result index is on already used indexes, if it is not there,
        we push to the usedIndexes array, also add the corresponding date and event 
        to randomEvents
  
      */

      if(this.isUsedIndex(result,usedIndexes)===false){

        usedIndexes.push(result);
        randomEvents.date=pobjectWithEvents.date;
        randomEvents.events.push(pobjectWithEvents.events[result]);

      }
     

    }

    console.log(usedIndexes);


    return randomEvents;
  }

  isUsedIndex(pindexToCheck:number, parrayWithUsedResults:number[]):boolean{
    
    /*
      We assume is not used.
    
      Name of variable will be isUsedIndexVariable 
      to avoid confussions with this function name isUsedIndex

    */

    let isUsedIndexVariable:boolean=false;
    
    for(let i=0;i<parrayWithUsedResults.length;++i){

      if(pindexToCheck === parrayWithUsedResults[i]){
        isUsedIndexVariable=true;
      }
    }

    return isUsedIndexVariable;
  }
}
