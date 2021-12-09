import { Injectable } from '@angular/core';
import {  AbstractControl } from '@angular/forms';
import { month } from '@interfaces/month-interface';


@Injectable({
  providedIn: 'root'
})
export class DatesService  {

  /*
    check README Notes for developers 13
    
  */

  /*
    date1 and date2 will store dates as an array of numbers, corresponding
    [year,month,day]
  */
  public date1:number[];
  public date2:number[];

  /*
    totalDaysBetweenDates stores the final result, 
    that means, the number of total days between two given dates
  */
  public totalDaysBetweenDates:number;

  /*
    check README Notes for developers 14
  */
  public orderedDatesArray:number[][];
  
  /*
    arrayMonths
    
    this is an array of custom type "month" objects.

    We need it to store specially the number of days for each month 
    and calculate dates difference correctly -not every month has same days-

  */
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
      days:31
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

    this.totalDaysBetweenDates=0;

    this.orderedDatesArray=[];
   }

  /*
    splitStringDateIntoArrayOfNumbers

    splits string date and maps it to number array, will be used
    to store dates on date1 and date2 properties

    PARAMETERS: the string date to be splitted into array of numbers
    
    RETURNS: a local variable with splittedDate

  */
  splitStringDateIntoArrayOfNumbers(pDateToCheck:string):number[]{

    let newDateSplittedArray=pDateToCheck.split("-");

    let newDateNumber:number[]=newDateSplittedArray.map(function(element){
      return parseInt(element);
    });
    return newDateNumber;
  }

  /*
     
    check README Notes for developers 15

    
  */

  convertArrayOfNumbersIntoString(parrayToConvert:number[]):string{
    let stringToReturn:string="";

    //iterate over each element of the array, convert to string and concatenate 
    stringToReturn+=parrayToConvert.map(function(element){

      return element.toString();
    });

    return stringToReturn;

  }

  
  /*
    check README Notes for developers 16
  */

  isLeapYearCheck(pyearToCheck:number):boolean{
    
    if( (pyearToCheck%4===0) && (pyearToCheck%100!==0 || pyearToCheck%400 ===0) ){
      return true;
    }else{
      return false;
    }

  }

  /* 
    check README Notes for developers 17
  */

  calcFirstAndLastYearDays(pdate:number[]):number[]{

    //by default, year won't we leap
    let isYearLeap:boolean=false;

    //set to 365 but can be 366 if leap
    let totalDaysOfCurrentYear:number=365;

    //days from given date to 31-12
    let daysRemaining:number=0;

    //days from 01-01 to given date
    let daysPassed:number=0;
    
    /*
    destructure the whole date, better than having only parts 
    of the date like days and months (maybe the only ones we need here),
    makes it more flexible
    */
   const [year,month,day]=pdate;

   /*check if year is leap*/
   isYearLeap=this.isLeapYearCheck(year);

   /*
      
      check README Notes for developers 18
    
   */
     

    /*
      before operating, if year is leap, 
      we set february days on the arrayMonths object to 29, 
      otherwise back to 28.
      Also with the days of a year, 365 or 366
    */
    if(isYearLeap===true){
      this.arrayMonths[1].days = 29;
      totalDaysOfCurrentYear=366;

    }else{
      this.arrayMonths[1].days = 28;
      totalDaysOfCurrentYear=365;
    }

    /*
      On the iteration below,
      limit is (Month -1) because, for example, 
      if our month is june (6), the loop should go until may (5); 
      but as array starts on index 0, may is on 
      index 4

    */

    for(let i=0;i<(month-1);++i){
      daysPassed+=this.arrayMonths[i].days;
    }
      
    /*
      now we must add to DaysPassed the days of the current month;
      (for example, if our date is 04-07 we have days between 01-01 and 30-06, but we still need
      the days between 30-06 and 04-07).
      so we will use the "day" constant created when destructuring pdate PARAMETER

    */

    daysPassed=daysPassed+day;
  
   

    daysRemaining=totalDaysOfCurrentYear-daysPassed;

  

    return [daysPassed,daysRemaining];
     
  }


  /*
    check README Notes for developers 19
  */

  calcDaysBetweenYears(pyear1:number,pyear2:number):number{

   /*
      check README Notes for developers 20   
  */
    let localTotalDaysBetweenYears=0;

    let orderedYears:number[]=[pyear1,pyear2];
   

    orderedYears= this.orderNumbers(pyear1,pyear2);

    /*
        desestructure to make work easier. 
        e.g:minorYear would be 2004 and higest 2018
    */

    const [ minorYear, highestYear]=orderedYears;

    /* 
      check README Notes for developers 21  

    */

        

    for (let i=minorYear+1; i<highestYear;++i){

      //on each item, we determine if it is a leap year. in that case we add 366, otherwise 365
      let isLeap=this.isLeapYearCheck(i);
      

      if(isLeap===true){
        localTotalDaysBetweenYears  +=366;
      }else{
        localTotalDaysBetweenYears +=365;
      }
        

    }

    

    return localTotalDaysBetweenYears;

  }

  /*

    orderNumbers()

    PARAMETERS two given numbers

    RETURNS  an array with lower number (e.g. 2004) on first position 
             and higher (e.g.2006) on second
  */

 
  orderNumbers(pnumber1:number,pnumber2:number):number[]{
    let numbersArray:number[]=[pnumber1,pnumber2];

    if(pnumber1>pnumber2){
      numbersArray=[pnumber2,pnumber1];
    }
    return numbersArray;
  }

  /*
    check README Notes for developers 22  
  */

  calculateTotalDaysBetweenDates(pdate1:string,pdate2:string):void{

    /*
      days returned by calcFirstAndLastYearDays, 
      will be an array with days passed and left
      
    */

    let date1Result:number[]=[];

    let date2Result:number[]=[];

    /* 
      daysBetweenYears, stores the value returned by calling the calcDaysBetweenYears() method
    */
    let daysBetweenYears:number=0;

    
    
    //date1 receives the date correctly splitted into a number array with year, month, and day 

    
    this.date1=this.splitStringDateIntoArrayOfNumbers(pdate1);

    //destructuring the string array with date year, month and day
    const [date1Year, date1Month, date1Day]=this.date1;


    //we do same steps for date 2
    this.date2=this.splitStringDateIntoArrayOfNumbers(pdate2);

    const [date2Year, date2Month, date2Day]=this.date2;

    //TODO maybe the steps above can be refactored

    //now we set the ordered dates array, and change order if neccesary

    this.orderedDatesArray=[this.date1,this.date2];

    if(date1Year>date2Year){

      this.orderedDatesArray=[this.date2,this.date1];

      

    }else if(date1Year===date2Year){

      if(date1Month>date2Month){

        this.orderedDatesArray=[this.date2,this.date1];

      }else if(date1Month===date2Month){
        if(date1Day>date2Day){

          this.orderedDatesArray=[this.date2,this.date1];

        }else if(date1Day===date2Day){

          /*
            in this case, a a custom validator called validatorFields()
            will be used on the form to make it invalid. 
            That validator in defined on the home-component.ts
          */ 
          console.log ("same date");

        }
      }
    }


    /*
    
      now,  we will calculate days between years and days passed for the first and last year
      of our two given dates,
      and we will add result to totalDaysBetweenDates.
      
      REMEMBER DATES ARE ORDERED NOW
    */ 

    const [minorDate, highestDate]=this.orderedDatesArray;



    date1Result=this.calcFirstAndLastYearDays(minorDate);

    const [daysPassedDate1, daysLeftDate1]=date1Result;



    date2Result=this.calcFirstAndLastYearDays(highestDate);

    const [daysPassedDate2, daysLeftDate2]=date2Result;

      
    //TODO steps above maybe can be refactored
    daysBetweenYears=this.calcDaysBetweenYears(date1Year,date2Year);

    /*
      check README Notes for developers 23  

    
    

    */
    if(date1Year != date2Year){
     
      this.totalDaysBetweenDates=daysLeftDate1+daysBetweenYears+daysPassedDate2;

      
    }else{

      let isLeap:boolean=false;
      //will change if is leap to 366
      let daysOfYear:number=365;

      isLeap=this.isLeapYearCheck(date1Year);

      if(isLeap===true){

       daysOfYear=366;

      }

      this.totalDaysBetweenDates=daysOfYear-(daysPassedDate1+daysLeftDate2);
    }


  }

}
