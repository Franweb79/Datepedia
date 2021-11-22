import { Injectable } from '@angular/core';
import {  AbstractControl } from '@angular/forms';
import { month } from '@interfaces/month-interface';


@Injectable({
  providedIn: 'root'
})
export class DatesService  {

  /*

    OVERVIEW EXPLANATION:

    On two given dates, for example, 2004-04-06 and 2018-05-09

    we will calculate the days for first and last year with a method called calcFirstAndLastYearDays()

    The days between 2005 and 2017 will be calculated on calcDaysBetweenYears()

    The total days will be put together on calculateTotalDaysBetweenDates()



  */

  /*
    date1 and date2 will store dates as an array of numbers, corresponding
    [year.month,day]
  */
  public date1:number[];
  public date2:number[];

  /*
    totalDaysBetweenDates stores the final result, the number of total days between two given dates

  */
  public totalDaysBetweenDates:number;

  /*
    to order them. It could happen user sets the second date is lower
    (e.g. first date 2018 and second date 2004).
    Ordering them would be easier to calculate before forcing user 
    to set dates in a "correct" order (e.g "2nd date must be higher than 1st" I dont like that)

    As date1 and date2 will be an array of numbers with year, month and day separated, 
    we will store both arrays on orderedDatesArray, and as it is an array of arrays,
    we declare it is number[][]
  */
  public orderedDatesArray:number[][];
  
  /*
    arrayMonths
    
    this is an array of custom type "month" objects.

    We need it to store specially the number of days for each month and calculate dates difference
    in a real way -not every month has same days-

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
      
    convertArrayOfNumbersIntoString()
  
    Tthis method does the reverse operation of splitStringDateIntoArrayOfNumbers.
      To show on modal and properly play with datepipes we need the dates as string,
      so we reverse the dates as array of numbers we have operated with, and revert back
      to strings.
    
      I realised perhaps it would have been a better idea to have the string
      dates we get from the form at home-component, 
      
      firstYearToCheckDateString

      and 

      lastYearToCheckDateString
      
      as properties of this service and not as home-component-properties. 
      Now perhaps this method would not have been neccessary,
      and would be a better designed app. But I am here to learn :)
      Also maybe we would save some inherit of properties from parent to child components

      PARAMETERS: The array of numbers to convert to String
      RETURNS: the Date as string


  */

  convertArrayOfNumbersIntoString(parrayToConvert:number[]):string{
    let stringToReturn:string="";

    //iterate ober each element of the array, convert to string and concatenate 
    stringToReturn+=parrayToConvert.map(function(element){

      return element.toString();
    });

    return stringToReturn;

  }

  //TODO TEST, how to test a service
  
  /*

    isLeapYearCheck()

    We need to know if year is Leap or not, to add one more day in that case

    PARAMETERS: The year (only the year), to be checked

    RETURNS: true if is Leap, otherwise false

  */

  isLeapYearCheck(pyearToCheck:number):boolean{
    
    if( (pyearToCheck%4===0) && (pyearToCheck%100!==0 || pyearToCheck%400 ===0) ){
      return true;
    }else{
      return false;
    }

  }

  /* 
    
  calcFirstAndLastYearDays()

  PARAMETERS will be the full date given as array of numbers with year, month and date
  
  RETURNS: an array of numbers, with two number elements:
    -days from 01/01 to given value (for example, days between 01/01 from 04/07/2015)
    -days from given value to 31/12 for example, days from 04/07/2015 to 31/12 same year).
    -If year is leap, we will add one day to one of the two above results,
     where february is involved and then must be counted
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
    First, we calculate daysPassed from 01-01 until selected Date, that will be daysPassed

    Then, to get daysRemaining, we substract daysPassed to 365 or 366, 
    depending if year is leap or not

    365 or 366 - daysPassed = daysRemaining

    We will return an array with both values: daysPassed and daysRemaining

    
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
      limit is (Month -1) is because, for example, 
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
    
    calcDaysBetweenYears()
  
    calculate days between the years of 2 given years (only years),
    taking into account if it is leap year or not.
    Example: 2006-04-06 and 2018-05-09 this method
    will calculate the days between 2005 and 2017.

    2004 and 2018 days would be calculated by calcFirstAndLastYearDays()  


    PARAMETERS:
      the two years (as said, not dates, just the years).

    RETURNS localTotalDaysBetweenYears, a number with the total days between the two given years
  */

  calcDaysBetweenYears(pyear1:number,pyear2:number):number{

   /*
      
      localTotalDaysBetweenYears variable

      To the name localTotalDaysBetweenYears, I added "local" to clarify between that variable
      and other variables or properties used on this service, 
      for example the totalDaysBetweenDates property, 
      or the daysBetweenYears variable which is used on calculateTotalDaysBetweenDates(),
      to avoid name confussions because they are similar.
      
      localTotalDaysBetweenYears stores only the total days between two given years. 
      For example between 2004 and 2018,
      it will store total days between 2005 and 2017, 
      and its value will be returned to a variable with similar name 
      called daysBetweenYears inside the method calculateTotalDaysBetweenDates()  

      totalDaysBetweenDates is a service property, and stores the TOTAL days between 
      the two given dates, the final result.
   
      this local variable will only change if PARAMETERS (years) are different

      Also I considered better to use a local variable and not a property which could not exist on another project, 
      this way is more reusable 

      

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
      now we get the days betweeen minor year +1 and highest given year,
      that is so because each of the given years` total days will be calculated on
      calcFirstAndLastYearDays()  
      
      e.g: between 2004(minorYear) and 2018 (highestYear) on this method we would iterate
      between 2005 and 2017.
      2004 and 2018 days would be calculated by calcFirstAndLastYearDays()  

    */

        

    for (let i=minorYear+1; i<highestYear;++i){

      //on each item, we determine if it is a leap year. in that case we add 366, otherwise 365
      let isLeap=this.isLeapYearCheck(i);
      console.log(i);
      console.log(isLeap);

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

    //TODO TEST
  orderNumbers(pnumber1:number,pnumber2:number):number[]{
    let numbersArray:number[]=[pnumber1,pnumber2];

    if(pnumber1>pnumber2){
      numbersArray=[pnumber2,pnumber1];
    }
    return numbersArray;
  }

  /*

      calculateTotalDaysBetweenDates()

      This is the method where final result will be produced and stored on the 
      totalDaysBetweenDates property

      PARAMETERS the two dates


      RETURNS nothing, since the total result will be stored on a service property called 
      totalDaysBetweenDates
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

    //detructuring the string array with date year, month and day
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
      if one year is different from the other, we add the results. 
      For example, between 2004-04-06 and 2018-05-09:
        - Days from 2004-04-06 to 2004-31-12 (daysLeftDate1)
        - days between 2007 and 20197 (daysBetweenYears) 
        - Days from 2018-01-01 to 2018-05-09 (daysPassedDate2)

        Obviously always have checked if years are leap or not

      If the year is the same.
      For example, 2004-04-06 and 2004-08-09

      We will check if that year is leap, and set the amount of total days accordingly to 365 or 366.
      Then to obntain the difference (days passed between one date and another) we substract 
      to 365 or 366 the results of days passed from 01-01 until first given date, 
      +days remaning until 31-12 from second given date

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

  

  /*
    
    custom validator to add to Validators on the FormGroup on home-component.ts
    if date fields are the same (date is exactly the same), we set form to invalid then the submit button
    is disabled

  */
  validatorTest1(control1: AbstractControl):{[key: string]: boolean} | null{

    console.log(control1.value);
    return {'result':false};

  }

 


}
