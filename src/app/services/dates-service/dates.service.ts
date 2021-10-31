import { SafeMethodCall } from '@angular/compiler';
import { ComponentFactoryResolver, Injectable } from '@angular/core';
import { ValidatorFn, AbstractControl } from '@angular/forms';
import { FormGroup } from '@angular/forms';

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

  public totalDays:number;

  /*
    to order them. It could happen user sets the second date is lower
    (e.g. first date 2018 and second date 2004).
    Ordering them would be easier to calculate before forcing user 
    to set dates in a "correct" order (e.g "2nd date must be higher than 1st" I dont like that)

    As dates will be an wrray of numbers with year, month and day separated, we must declare this way
  */
  public datesArray:number[][];
  
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

    this.totalDays=0;

    this.datesArray=[];
   }

  //splits date and maps it to number array
  splitYearToCheckString(ppyearToCheck:string):number[]{

    let newDateSplittedArray=ppyearToCheck.split("-");

    let newDateNumber:number[]=newDateSplittedArray.map(function(element){
      return parseInt(element);
    });
    return newDateNumber;
  }

  /*
      this method does reverse operation of splitYearToCheckString.
      To show on modal and properly play with datepipes we need the dates as string,
      so we reverse the dates as array of numbers we have operated with, and revert back
      to strings.

    
    
      I realised it would have been a better idea to have the string
      dates we get from the form at home-component, as service properties
      and not as home-component-properties. Now this would not have been maybe neccessary,
      and would be a better designed app. But I am here to learn :)
      Also maybe we would save some inherit of properties from parent to child components


  */
  convertArrayOfNumbersIntoString(parrayToConvert:number[]):string{
    let stringToReturn:string="";

    stringToReturn+=parrayToConvert.map(function(element){

      return element.toString();
    });

    return stringToReturn;

  }

  //TODO TEST, how to test a service
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
   // console.log (month);

    /*
      Month -1 is because we want it to ierate, fopr example, 
      is month is june (6) the for should go until may (5), but as array starts on index 0, may is on 
      index 4, so the for will iterate while i < (month-1) which is 5, where june is due to index 0 array

    */

    for(let i=0;i<(month-1);++i){
      //console.log ("mes"+this.arrayMonths[i].name);
      daysPassed+=this.arrayMonths[i].days;
    }
      
    /*
      now we must add to DaysPassed the days of the current month;
      because until now, we had only the days passed 
      of entirely passed months, so we will use the "day" constant created when destructuring pdate parameter

    */

    daysPassed=daysPassed+day;
  
   

    daysToPass=totalYearDays-daysPassed;

   /* console.log ('año '+year);
    console.log("dias transcurridos "+daysPassed);
    console.log("dias año "+totalYearDays);

    console.log("dias que quedan "+daysToPass);
    
*/

    return [daysPassed,daysToPass];
     
  }
  // calculate days between the years of 2 given dates
  /*
    taking into account if it is leap year or not
  */
  calcDaysBetweenYears(pyear1:number,pyear2:number):number{

   /*
      this variable will only change if parameteres (years) are different
      the name localTotalDays is to clarify between that and the totalDays property,
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
      calcCurrentYearDays() and added to the result "totalDays" from this funtcion 
      
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

    
    this.date1=this.splitYearToCheckString(pdate1);
    //detructuring the string array with date year, month and day
    const [date1Year, date1Month, date1Day]=this.date1;


    //we do same steps for date 2
    this.date2=this.splitYearToCheckString(pdate2);

    const [date2Year, date2Month, date2Day]=this.date2;

    //now we set the dates array, and change order if neccesary
//TODO this ordering could be dome in a function and probably better
    this.datesArray=[this.date1,this.date2];

    if(date1Year>date2Year){
      this.datesArray=[this.date2,this.date1];

    }else if(date1Year===date2Year){

      if(date1Month>date2Month){
        this.datesArray=[this.date2,this.date1]
      }else if(date1Month===date2Month){
        if(date1Day>date2Day){
          this.datesArray=[this.date2,this.date1];

        }else if(date1Day===date2Day){
          console.log ("same date");
        }
      }
    }

    //console.log(this.datesArray);

    /*now,  we will calculate days between years and days passes on 2 fiven dates
      and we will add to totaldays:
        -calculated days between years (0 if same year)
        -the days left until end of the year (31-12) since date1 (second result of the array returned by calcCurrentYearDays)
        -the days passed since beginning of year (0101) on date 2 (first result of the array returned by calcCurrentYearDays)

       REMEMBER DATES ARE ORDERED
    */ 

       const [minorDate, highestDate]=this.datesArray;



       resultDate1=this.calcCurrentYearDays(minorDate);

       const [daysPassedDate1, daysLeftDate1]=resultDate1;

       //console.log ("res date1 "+resultDate1);




       resultDate2=this.calcCurrentYearDays(highestDate);

       const [daysPassedDate2, daysLeftDate2]=resultDate2;

       //console.log ("res date2 "+resultDate2);

      //console.log (date1Year);
       daysBetweenYears=this.calcDaysBetweenYears(date1Year,date2Year);


       //console.log ("total"+this.totalDays);


    if(date1Year != date2Year){
     
      this.totalDays=daysLeftDate1+daysBetweenYears+daysPassedDate2;

      
     // this.totalDays=this.calcDaysBetweenYears(date1Year,date2Year);
    }else{

      let isLeap:boolean=false;
      //will change if is leap to 366
      let daysOfYear:number=365;

      isLeap=this.isLeapYearToCheck(date1Year);

      if(isLeap===true){
       daysOfYear=366;

      }

      this.totalDays=daysOfYear-(daysPassedDate1+daysLeftDate2);
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
