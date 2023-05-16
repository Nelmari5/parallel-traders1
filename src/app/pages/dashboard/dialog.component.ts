import { Component, OnInit,Inject } from '@angular/core';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
import {Renderer2} from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormBuilder ,FormArray} from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { url } from 'src/commonurl/commonurl';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
    selector: 'dialog-overview-example-dialog',
    templateUrl: 'dialog-overview-example-dialog.html',
  })
  export class DialogOverviewExampleDialog implements OnInit {
    tradingJournal: FormGroup;
    tools: FormArray;
    public showSpinner= false;
  
    constructor(
      public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
      private fb: FormBuilder,
      private formBuilder: FormBuilder,
      public http:HttpClient,
      public snackBar: MatSnackBar,
      @Inject(MAT_DIALOG_DATA) public data: any) {     
        this.tradingJournal = this.fb.group({
        currencyPair: '',
        price:'',
        length:'',
        weekly:'',
        d1:'',
        h4:'',
        trendLines:'',
        lotSize:'',
        noOfTrades:'',
        reason:'',
        comment:'',
        quantities: this.fb.array([]) ,
        });
    }
    ngOnInit(){}
    onNoClick(): void {
      this.dialogRef.close();
      console.log(this.data);
    } 
//   productForm: FormGroup;
   
  
  tool() : FormArray {
    return this.tradingJournal.get("quantities") as FormArray
  }
   
  newTool(): FormGroup {
    return this.fb.group({
      toolName: '',
      value: '',
    })
  }
   
  addTool() {
    this.tool().push(this.newTool());
    console.log(this.tool().controls)
  }
   
  removeTool(i:number) {
    this.tool().removeAt(i);
  }
   
  onSubmit() {
    // console.log(this.tradingJournal.value);
    this.showSpinner = true;
    var token= window.localStorage.getItem('token');
    const headers = { 
      'Authorization': 'Bearer '+token, 
      'My-Custom-Header': 'foobar' 
    }
    this.http.post(url.baseurl+'/validate/add/tradingjournal',this.tradingJournal.value,{headers}).
    subscribe((data:any) =>{
      console.log(data);
      this.data= data;
      this.showSpinner = false;
      this.dialogRef.close();
    },err=>{
      console.log(err)
      this.showSpinner = false;
      this.openSnackBar('Sorry we are facing some issues Please try again.')
    })
  }
  openSnackBar(message: string) {
    this.snackBar.open(message, 'close', {
      duration: 2000,
    });
  }
  
  }