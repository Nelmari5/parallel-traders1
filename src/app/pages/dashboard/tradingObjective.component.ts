import { Component, OnInit,Inject } from '@angular/core';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
import {Renderer2} from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormBuilder ,FormArray} from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { url } from 'src/commonurl/commonurl';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DatePipe } from '@angular/common';
import * as moment from 'moment';
@Component({
    selector: 'dialog-overview-example-dialog',
    templateUrl: 'tradingObjective.component.html',
    providers: [DatePipe]
  })
  export class TradingObjectiveDialog implements OnInit {
    tradingJournal: FormGroup;
    tools: FormArray;
    public showSpinner= false;
    public targetAmount;
    public targetDate;
    todayDate = moment(new Date()).format('YYYY-MM-DD')
    // public myDate;
  
    constructor(
      private datePipe: DatePipe,
      public dialogRef: MatDialogRef<TradingObjectiveDialog>,

      public http:HttpClient,
      public snackBar: MatSnackBar,
      @Inject(MAT_DIALOG_DATA) public data: any) {     
    }
    ngOnInit(){
        console.log(this.todayDate);
    }
    onNoClick(): void {
      this.dialogRef.close();
      console.log(this.data);
    } 
//   productForm: FormGroup;
   
  onSubmit() {
    // console.log(this.tradingJournal.value);
    this.showSpinner = true;
    console.log(this.targetAmount);
    console.log(this.targetDate)
    var token= window.localStorage.getItem('token');
    var obj={
      "TargetBalance":this.targetAmount,
      "timePeriod":this.targetDate
    }
    const headers = { 
      'Authorization': 'Bearer '+token, 
      'My-Custom-Header': 'foobar' 
    }
    this.http.post(url.baseurl+'/validate/add/tradingobjective',obj,{headers}).
    subscribe((data:any) =>{
      console.log(data);
      this.data= data;
      this.showSpinner = false;
      this.dialogRef.close();
    },err=>{
      console.log(err.error.message)
      this.showSpinner = false;
      this.openSnackBar(err.error.message);
      this.dialogRef.close();
    })
  }
  openSnackBar(message: string) {
    this.snackBar.open(message, 'close', {
      duration: 4000,
    });
  }
  
  }