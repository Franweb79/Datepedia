import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DatesService {

  constructor() { }

  //methods
  splitYearString(pyear:string):string[]{

    let newYearSplittedArray=pyear.split("-");
    return newYearSplittedArray;
  }
}
