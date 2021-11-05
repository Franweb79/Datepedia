import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { take } from 'rxjs/operators';

interface customEvents{
  date:string,
  events:any[]
}

@Injectable({
  providedIn: 'root'
})



export class CallApiService {

  public apiBaseURL:string="https://byabbe.se/on-this-day";

  public dataToShow:customEvents;


  /*
    we willñ store the random data to be shown on a property
    which will be an object with a defined interface at the beginning of code outside class,
    to make it easier to understand
    
  */

    public customEvents:customEvents;

    

  

  constructor(private _http:HttpClient) { 

    this.dataToShow={
      date:"",
      events:[]
    };;

    this.customEvents={
      date:"",
      events:[]
    };
  }

  
 /* async getEvents(pmonth:number,pday:number){

    let completeURL:string=`${this.apiBaseURL}/${pmonth}/${pday}/events.json`;

    let data= await this._http.get(completeURL).toPromise();

    console.log (data);

    this.dataToShow=data;

    console.log (this.dataToShow);
   
    /*this._http.get(completeURL).subscribe(data=>{
     // console.log (data);
      this.dataToShow=data;
      //return data;

      console.log(this.dataToShow);

    });

  }*/

  getEventsPromise(pmonth:number,pday:number){

    return new Promise((resolve, reject)=>{

      
      let completeURL:string=`${this.apiBaseURL}/${pmonth}/${pday}/events.json`;

      /*
        TODO use an RXJS operator or something to catch only 5 random results

        now we get the first 5 results

        take() operator here doesnt work because values should be emitted
        
        by the api one by one, and they are all emitted together

        with declaring data as any i can access to data.events, otherwise not

        like happened on the modla template to show results
      
      */
      this._http.get(completeURL).subscribe((data:any)=>{
       // console.log ("dentro del get");

        //console.log (data.events.length);

        //this.getRandomElementsOfArray(data);
         resolve (this.dataToShow=this.getRandomElementsOfArray(data));
         //return data;
   
         console.log ("data to show desde dentro get");
        console.log(this.dataToShow);
   
       });

     

    //console.log (this.dataToShow);
    });
  }

  /*

    parameter: the data object returned by the api, it contains, among others,
    an events property which is an array with events

  */
  getRandomElementsOfArray(pobjectWithEvents:any){

    //to store the index of random operation

    let result:number=0;
   
   // let randomEvents:any={};

    /*to catch is that event index has already been used, we will add here*/

    let usedIndexes:number[]=[];

    this.customEvents={
      date:"",
      events:[]
    };
    
    //console.log ("dentro del getrandom");

    //console.log (parray.events.length);

    /*

      https://www.geeksforgeeks.org/how-to-select-a-random-element-from-array-in-javascript/

    */

    for (let i=0;i<5;++i){

      result=Math.floor(Math.random()*pobjectWithEvents.events.length);

      /*
        search result index on already used indexes, if it is not there,
        we push to the usedIndexes array, also add event to randomEvents
        array
      */

      if(this.isUsedIndex(result,usedIndexes)===false){
        usedIndexes.push(result);

        /*console.log ("evento a añadir");
        console.log (pobjectWithEvents);*/
       // console.log (pobjectWithEvents.events[i]);
       this.customEvents.date=pobjectWithEvents.date;
        this.customEvents.events.push(pobjectWithEvents.events[result]);

      }
     /* console.log (this.isUsedIndex(result,usedIndexes));

      console.log (result);*/

    


    }

   console.log(usedIndexes);

  /* console.log ("events to be shown");

   console.log (randomEvents);*/

    return this.customEvents;
  }

  isUsedIndex(pindexToCheck:number, parrayWithUsedResults:number[]):boolean{
    
    /*we assume is not used.
    
    name of variable to avoid confussions with this function name
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
