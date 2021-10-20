import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DatesService {

  public date1:number[];
  public date2:number[];

  constructor() {

    this.date1=[];
    this.date2=[];
   }

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

  /* 
    
  PARAMETERES will be 
  
  will return an array with thwo number:
    -days from 01/01 to given value
    -days from given value to 31/12
    -If year is leap, we will add one day to the result
    which frebruary is involved
  */
  calcCurrentYearDays(pdata:number[]){

  }
}
