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
    check README Notes for developers 10

  */
  getEventsPromise(pmonth:number,pday:number){

    return new Promise((resolve, reject)=>{

      
      let completeURL:string=`${this.apiBaseURL}/${pmonth}/${pday}/events.json`;

      /*
        check README Notes for developers 11  
      
      */
      this._http.get(completeURL).subscribe((data)=>{
       
         resolve (this.dataToShow=this.getFiveRandomElementsOfArray(data));
         
   
   
       },(error)=>{

        this.modalError.status=error.status;
        this.modalError.reason=error.message;
        reject(this.modalError);
       });

    });
  }

  /*

    check README Notes for developers 12  

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
