import { Injectable } from '@angular/core';
import {  AbstractControl } from '@angular/forms';
import { month } from '@interfaces/month-interface';


@Injectable({
  providedIn: 'root'
})
export class DatesService  {

  /*
    date1 and date2 will store dates as an array of numbers, corresponding
    [year.month,day]
  */
  public date1:number[];
  public date2:number[];

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

    isLeapYearToCheck()

    We need to know if year is Leap or not, to add one more day in that case

    PARAMETERS: The year (only the year), to be checked

    RETURNS: true if is Leap, otherwise false

  */
  isLeapYearToCheck(pyearToCheck:number):boolean{
    
    if( (pyearToCheck%4===0) && (pyearToCheck%100!==0 || pyearToCheck%400 ===0) ){
      return true;
    }else{
      return false;
    }

  }

  /* 
    
  calcCurrentYearDays()

  PARAMETERS will be the full date given as array of numbers with year, month and date
  
  RETURNS: an array of numbers, with two number elements:
    -days from 01/01 to given value (for example, days between 01/01 from 04/07/2015)
    -days from given value to 31/12 for example, days from 04/07/2015 to 31/12 same year).
    -If year is leap, we will add one day to one of the two above results,
     where february is involved and then must be counted
  */
  calcCurrentYearDays(pdate:number[]):number[]{

    //by default, year won't we leap
    let isYearLeap:boolean=false;

    //set to 365 but can be 366 if leap
    let totalDaysOfYear:number=365;

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
   isYearLeap=this.isLeapYearToCheck(year);

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
      totalDaysOfYear=366;

    }else{
      this.arrayMonths[1].days = 28;
      totalDaysOfYear=365;
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
  
   

    daysRemaining=totalDaysOfYear-daysPassed;

   /* console.log ('año '+year);
    console.log("dias transcurridos "+daysPassed);
    console.log("dias año "+totalDaysOfYear);

    console.log("dias que quedan "+daysRemaining);
    
*/

    return [daysPassed,daysRemaining];
     
  }
  // calculate days between the years of 2 given dates
  /*
    taking into account if it is leap year or not
  */
  calcDaysBetweenYears(pyear1:number,pyear2:number):number{

   /*
      this variable will only change if PARAMETERes (years) are different
      the name localTotalDays is to clarify between that and the totalDaysBetweenDates property,
      naming the same could give problems and is better not making the method rely on a property
      which could not exist on another project, this way is more reusable 

  */
    let localTotalDays=0;

    let orderedYears:number[]=[pyear1,pyear2];
   

    orderedYears= this.orderNumbers(pyear1,pyear2);

    /*desestr to make work easier. 
        e.g:minorYear would be 2004 and higest 2018
    */

       // console.log (orderedYears);

    const [ minorYear, highestYear]=orderedYears;

    /*
      now we get the days betweeen minor year +1 and highest given year,
      that is so because each of the given years` total days will be calculated on
      calcCurrentYearDays() and added to the result "totalDaysBetweenDates" from this funtcion 
      
       e.g: between 2004(minorYear) and 2018 (highestYear) would iterate between 2005 and 2017
    */

        

    for (let i=minorYear+1; i<highestYear;++i){

      //on each item, we calculate if it is a leap year. in that case we add 366, otherwise 365
      let isLeap=this.isLeapYearToCheck(i);
      console.log(i);
      console.log(isLeap);

      if(isLeap===true){
        localTotalDays  +=366;
      }else{
        localTotalDays +=365;
      }
        

    }

    

    return localTotalDays;

  }

  /*
    return an array with lower number (e.g. 2004) on first position and higher (e.g.2006) on second
  */

    //TODO TEST
  orderNumbers(pnumber1:number,pnumber2:number):number[]{
    let numbersArray:number[]=[pnumber1,pnumber2];

    if(pnumber1>pnumber2){
      numbersArray=[pnumber2,pnumber1];
    }
    return numbersArray;
  }

  calculateTotalDaysBetweenDates(pdate1:string,pdate2:string):void{

    /*
      days returned by calcCurrentYearDays, 
      will be an array with days passed and left
      
    */

    let resultDate1:number[]=[];

    let resultDate2:number[]=[];

    let daysBetweenYears:number=0;

    
    
    //date1 receives the date correctly splitted into a number array with year, month, and day 

    
    this.date1=this.splitStringDateIntoArrayOfNumbers(pdate1);
    //detructuring the string array with date year, month and day
    const [date1Year, date1Month, date1Day]=this.date1;


    //we do same steps for date 2
    this.date2=this.splitStringDateIntoArrayOfNumbers(pdate2);

    const [date2Year, date2Month, date2Day]=this.date2;

    //now we set the dates array, and change order if neccesary
//TODO this ordering could be dome in a function and probably better
    this.orderedDatesArray=[this.date1,this.date2];

    if(date1Year>date2Year){
      this.orderedDatesArray=[this.date2,this.date1];

    }else if(date1Year===date2Year){

      if(date1Month>date2Month){
        this.orderedDatesArray=[this.date2,this.date1]
      }else if(date1Month===date2Month){
        if(date1Day>date2Day){
          this.orderedDatesArray=[this.date2,this.date1];

        }else if(date1Day===date2Day){
          console.log ("same date");
        }
      }
    }

    //console.log(this.orderedDatesArray);

    /*now,  we will calculate days between years and days passes on 2 fiven dates
      and we will add to totalDaysBetweenDates:
        -calculated days between years (0 if same year)
        -the days left until end of the year (31-12) since date1 (second result of the array returned by calcCurrentYearDays)
        -the days passed since beginning of year (0101) on date 2 (first result of the array returned by calcCurrentYearDays)

       REMEMBER DATES ARE ORDERED NOW
    */ 

       const [minorDate, highestDate]=this.orderedDatesArray;



       resultDate1=this.calcCurrentYearDays(minorDate);

       const [daysPassedDate1, daysLeftDate1]=resultDate1;

       //console.log ("res date1 "+resultDate1);




       resultDate2=this.calcCurrentYearDays(highestDate);

       const [daysPassedDate2, daysLeftDate2]=resultDate2;

       //console.log ("res date2 "+resultDate2);

      //console.log (date1Year);
       daysBetweenYears=this.calcDaysBetweenYears(date1Year,date2Year);


       //console.log ("total"+this.totalDaysBetweenDates);

    if(date1Year != date2Year){
     
      this.totalDaysBetweenDates=daysLeftDate1+daysBetweenYears+daysPassedDate2;

      
     // this.totalDaysBetweenDates=this.calcDaysBetweenYears(date1Year,date2Year);
    }else{

      let isLeap:boolean=false;
      //will change if is leap to 366
      let daysOfYear:number=365;

      isLeap=this.isLeapYearToCheck(date1Year);

      if(isLeap===true){
       daysOfYear=366;

      }

      this.totalDaysBetweenDates=daysOfYear-(daysPassedDate1+daysLeftDate2);
    }


  }

  

  /*
    custom validator to add to Validators on the FormGroup oncomponente-home.ts
    if date fields are the same, we set form to invalid then the submit button
    is disabled

   
  */
  validatorTest1(control1: AbstractControl):{[key: string]: boolean} | null{

    console.log(control1.value);
    return {'result':false};

  }

 


}
