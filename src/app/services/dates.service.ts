import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DatesService {

  constructor() { }

  //splits date and maps it to number array
  splitYearToCheckString(ppyearToCheck:string):number[]{

    let newDateSplittedArray=ppyearToCheck.split("-");

    let newDateNumber:number[]=newDateSplittedArray.map(function(element){
      return parseInt(element);
    });
    return newDateNumber;
  }

  //returns true or false
  isLeapYearToCheck(pyearToCheck:number):boolean{
    
    if( (pyearToCheck%4===0) && (pyearToCheck%100!==0 || pyearToCheck%400 ===0) ){
      return true;
    }else{
      return false;
    }

  }
}
