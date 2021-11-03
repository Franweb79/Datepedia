import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CallApiService {

  public apiBaseURL:string="https://byabbe.se/on-this-day";

  constructor(private _http:HttpClient) { }

  getEvents(pmonth:number,pday:number):void{

    let completeURL:string=`${this.apiBaseURL}/${pmonth}/${pday}/events.json`;

   
    this._http.get(completeURL).subscribe(data=>{
      console.log (data);
    })
  }
}
