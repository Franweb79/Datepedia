import { Injectable } from '@angular/core';

interface month{
  id:number,
  name:string,
  days:number
}


@Injectable({
  providedIn: 'root'
})
export class DatesService  {

  public date1:number[];
  public date2:number[];
  
  public arrayMonths:month[]=[
    {
      id:1,
      name:"january",
      days:31
    },
    {
      id:2,
      name:"february",
      days:28
    },
    {
      id:3,
      name:"march",
      days:31
    },
    {
      id:4,
      name:"april",
      days:30
    },
    {
      id:5,
      name:"may",
      days:31
    },
    {
      id:6,
      name:"june",
      days:30
    },
    {
      id:7,
      name:"july",
      days:30
    },
    {
      id:8,
      name:"august",
      days:31
    },
    {
      id:9,
      name:"september",
      days:30
    },
    {
      id:10,
      name:"october",
      days:31
    },
    {
      id:11,
      name:"november",
      days:30
    },
    {
      id:12,
      name:"december",
      days:31
    },

  ]

  

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
    
  PARAMETERES will be the full date given as array of numbers eith year, month and date
  
  will return an array with thwo number:
    -days from 01/01 to given value
    -days from given value to 31/12
    -If year is leap, we will add one day to the result
    which frebruary is involved
  */
  calcCurrentYearDays(pdate:number[]):number[]{

    //by default, year wont we leap
    let isYearLeap:boolean=false;

    //set to 365 but can be 366 if leap
    let totalYearDays:number=365;

    //days from given date to 31-12
    let daysToPass:number=0;
    //days from 01-01 to given date
    let daysPassed:number=0;
    
    /*
    destr again of thw whole date, better than haviong only parts 
    of the date like days and months (maybe the only ones we need here),
    maskes it more flexible
    */
   const [year,month, day]=pdate;

   /*check if year is leap*/
   isYearLeap=this.isLeapYearToCheck(year);

   /*
      we have to take the part of arrayMonthsfrom 01-01 until the month prioi to our date, multiply days of each month,
      and add the days to that result of multyplying. Those totalDaysPasses will ne rest to 365 or 366 if year is leap
      also the difference of days still to pass until 31-12 , so would be:

      365 or 366 -  daysPassed=daysToPass

      and we will return an array with both values: daysPassed and daysToPass

    
   */
     

    /*
        if year is leap, we set february days to 29, 
        otherwise back to 28.
        Also with the days of a year, 365 or 366
    */
    if(isYearLeap===true){
      this.arrayMonths[1].days = 29;
      totalYearDays=366;

    }else{
      this.arrayMonths[1].days = 28;
      totalYearDays=365;
    }
    console.log (month);

    /*
      Month -1 is because we want it to ierate, fopr example, 
      is month is june (6) the for should go until may (5), but as array starts on index 0, may is on 
      index 4, so the for will iterate while i < (month-1) which is 5, where june is due to index 0 array

    */

    for(let i=0;i<(month-1);++i){
      console.log ("mes"+this.arrayMonths[i].name);
      daysPassed+=this.arrayMonths[i].days;
    }
      
    /*
    TODO now we must add to DaysPassed the days of the current month;
    because until now, we had only the days passed 
    of entirely passed months, so we will use the "day" constant created when destructuring pdate parameter

    */

    daysPassed=daysPassed+day;
  
   

    daysToPass=totalYearDays-daysPassed;

    console.log ('año '+year);
    console.log("dias transcurridos "+daysPassed);
    console.log("dias año "+totalYearDays);

    console.log("dias que quedan "+daysToPass);
    


    return [daysPassed,daysToPass];
     
  }
  //calculate days between 2 given dates
  /*
    año 1 must be next one to older date, and año 2 the prior one to most recent date
    and taking into account if it is leap year or not
  */
  calcDaysBetweenYears(pyear1:number,pyear2:number){

  }
}
