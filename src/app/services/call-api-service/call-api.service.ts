import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CallApiService {

  public apiBaseURL:string="https://byabbe.se/on-this-day";

  public dataToShow:Object;



  constructor(private _http:HttpClient) { 

    this.dataToShow={};


  }

  
  async getEvents(pmonth:number,pday:number){

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

    });*/

  }

  getEventsPromise(pmonth:number,pday:number){

    return new Promise((resolve, reject)=>{

      
      let completeURL:string=`${this.apiBaseURL}/${pmonth}/${pday}/events.json`;

      this._http.get(completeURL).subscribe(data=>{
        // console.log (data);
         resolve (this.dataToShow=data);
         //return data;
   
        // console.log(this.dataToShow);
   
       });

     

    //console.log (this.dataToShow);
    });
  }
}
