import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';



@Component({
  selector: 'app-componente-home',
  templateUrl: './componente-home.component.html',
  styleUrls: ['./componente-home.component.css']
})
export class HomeComponent implements OnInit {

  title:string = 'Days between dates calculator';

  public year1:string[];
  public year2:string[];

  myDatesForm:FormGroup=new FormGroup({
    "firstyearname": new FormControl("dd/mm/yyyy", Validators.required),
    "lastyearname": new FormControl("dd/mm/yyyy", Validators.required),
  });

  constructor() {
    this.year1=[];
    this.year2=[];
   }

  ngOnInit(): void {
  }

  onSubmit(){
    console.log(this.myDatesForm);
    const {firstyearname, lastyearname}=this.myDatesForm.value;

    console.log(firstyearname,lastyearname);

    this.year1=this.splitYearString(firstyearname);
    this.year2=this.splitYearString(lastyearname);
    console.log (this.year1, this.year2);
    
  }

  //methods
  splitYearString(pyear:string):string[]{

    let newYearSplittedArray=pyear.split("-");
    return newYearSplittedArray;
  }

  

}
