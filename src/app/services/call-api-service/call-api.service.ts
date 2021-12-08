import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

/*
  custom type I created to store the events requested by API  

*/
import { customEvents } from '@interfaces/custom-event-interface';

/*
  another custom type to show errors in case something went wrong

*/

import { customError } from '@interfaces/modal-error-interface';

@Injectable({
  providedIn: 'root'
})



export class CallApiService {

  public apiBaseURL:string="https://byabbe.se/on-this-day";

  /*
    
    As said, we will store the  data to be shown on a dataToShow 
    property, which will be an object with a defined interface 
    at the beginning of code outside class,
    to make it easier to understand
    
  */

  public dataToShow:customEvents;

  public modalError:customError;


  constructor(private _http:HttpClient) { 

    this.dataToShow={
      date:"",
      events:[]
    };

    this.modalError={
      status:0,
      message:"Sorry, something went wrong, please try again",
      reason:""
    }

    
  }


  /*
    getEventsAsyncAwait() will be used on show-days-component.
    
    PARAMETERS:month and day of the date to search

    We use async/await, to be sure
    we have the data returned for the first date before requesting
    for second date, and properly order them.
    
    This method will be used on the callAPI() method of show-days-component
    , so the callAPI() method will be declared as async.
    That way, we can use the await to cut the execution of callAPI() until the
    promise returned inside getEventsAsyncAwait() gets executed
    Async await is a way to ensure we will have the desired results given by the promise
    on a more synchonous behavior approach.

  */
  

  getEventsAsyncAwait(pmonth:number,pday:number){

    let completeURL:string=`${this.apiBaseURL}/${pmonth}/${pday}/events.json`;


    return new Promise((resolve, reject)=>{

      this._http.get(completeURL).subscribe((data)=>{
       
        resolve(this.dataToShow=this.getFiveRandomElementsOfArray(data)) ;
        
  
  
      },(error)=>{
  
       this.modalError.status=error.status;
       this.modalError.reason=error.message;
       reject(this.modalError);
      });

    })

  }

  /*

    getFiveRandomElementsOfArray() will implement the logic to get 
    5 random events once all results of the API are requested 
    
    OTHER METHODS CALLED: 

      -isUsedIndex
    
    PARAMETERS: 
    
      -the data object returned by the api, it contains, among others,
      an events property which is an array with events

    RETURNS a randomEvents custom type

  */
  getFiveRandomElementsOfArray(pobjectWithEvents:any){

    //result variable, to store the index of random operation

    let result:number=0;
   
   
  
    let randomEvents:customEvents={
      date:"",
      events:[]
    };

    /*
      
      usedIndexes variable
    
      to control if one event's index has already been used,
      we will add here.

      This avoids showing one event more than one time
      
    */

    let usedIndexes:number[]=[];

    
    /*

      https://www.geeksforgeeks.org/how-to-select-a-random-element-from-array-in-javascript/

    */

    for (let i=0;i<5;++i){

      result=Math.floor(Math.random()*pobjectWithEvents.events.length);

      /*
        Now we search if result index is on already used indexes, if it is not there,
        we push to the usedIndexes array, also add the corresponding date and event 
        to randomEvents
  
      */

      if(this.isUsedIndex(result,usedIndexes)===false){

        usedIndexes.push(result);
        randomEvents.date=pobjectWithEvents.date;
        randomEvents.events.push(pobjectWithEvents.events[result]);

      }
     

    }

    return randomEvents;
  }



 /*
    isUsedIndex() will control if an index is used or not

    PARAMETERS:
      -pindexToCheck the index to be checked if it is already used or not
      -parrayWithUsedIndexes an array to store the already used indexes
      
    RETURNS  a boolean. If index is already used returns true

 */

  isUsedIndex(pindexToCheck:number, parrayWithUsedIndexes:number[]):boolean{
    
    /*
      We assume an index is not used.
    
      Name of variable will be isUsedIndexVariable 
      to avoid confussions with this function´s name isUsedIndex

    */

    let isUsedIndexVariable:boolean=false;
    
    for(let i=0;i<parrayWithUsedIndexes.length;++i){

      if(pindexToCheck === parrayWithUsedIndexes[i]){
        isUsedIndexVariable=true;
      }
    }

    return isUsedIndexVariable;
  }
}
