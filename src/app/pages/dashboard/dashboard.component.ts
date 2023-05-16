import { Component, OnInit ,Inject } from '@angular/core';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
import {Renderer2} from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
// DialogOverviewExampleDialog
import * as myjQuery from 'jquery';
import { DialogOverviewExampleDialog } from './dialog.component';
// TradingObjectiveDialog
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { url } from 'src/commonurl/commonurl';

import { MatSnackBar } from '@angular/material/snack-bar';
import { TradingObjectiveDialog } from './tradingObjective.component';
declare const TradingView: any;
declare const TradingView2:any;
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent implements OnInit {
  public userName;
  public url
  public secUrl;
  public investinCalendarUrl;
  stockChart: any;
  AssetScreener:any;
  public data=[];
  public showSpinner = false;
  public tradingObj =0;
  customOptions: OwlOptions = {
    // loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 700,
    navText: ["previous", 'next'],
    responsive: {
      0: {
        items: 1
      },
      2000: {
        items: 2
      },
     
    },
    nav: true
  }

  // public animal: string;
  // public name: string;

  public pieChartLabels = ['target achieve'];
  public pieChartData = [1];
  public pieChartType = 'pie';

  constructor(private sanitizer: DomSanitizer,public http:HttpClient,
    public snackBar: MatSnackBar,
    private renderer: Renderer2,public dialog: MatDialog, public router: Router) { }


  // renderExternalScript(src: string): HTMLScriptElement {
  //   const script = document.createElement('script');
  //   script.type = 'text/javascript';
  //   script.src = src;
  //   script.async = true;
  //   script.defer = true;
  //   this.renderer.appendChild(document.body, script);
  //   return script;
  // }


  ngOnInit() {
    if(window.localStorage.getItem('token')){
    this.userName = window.localStorage.getItem('username');
    if(this.userName) {
      console.log('This is the user name: '+this.userName)
      let url = "//www.fxblue.com/fxblueview.aspx?id="+this.userName;
      this.url =this.sanitizer.bypassSecurityTrustResourceUrl(url);
      let secUrl=`//www.fxblue.com/banner.aspx?id=${this.userName}&t=300`;
      this.secUrl =this.sanitizer.bypassSecurityTrustResourceUrl(secUrl);
    }
    
    let invUrl = 'https://sslecal2.forexprostools.com/?columns=exc_flags,exc_currency,exc_importance,exc_actual,exc_forecast,exc_previous&features=datepicker,timezone&countries=25,6,37,72,22,17,39,10,35,43,20,36,110,26,12,4,5&calType=week&timeZone=67&lang=71'
    this.investinCalendarUrl=this.sanitizer.bypassSecurityTrustResourceUrl(invUrl);
    // console.log(this.url);
    // Getting Trading Journals
    //get Request to trading journal
    
      this.getTradingJournals();
      this.getTradingObjectives();
    } else {
      this.router.navigateByUrl('/login');
    }
  }

  openDialog(): void {
    let dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      // data: { name: this.name, animal: this.animal }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.showSpinner = true;
      this.getTradingJournals();
      // this.getTradingObjectives();
      // console.log('The dialog was closed');
      // this.animal = result;
      // console.log('Res:'+result)
    });
  }

  getTradingJournals(){
    var token= window.localStorage.getItem('token');
    const headers = { 
      'Authorization': 'Bearer '+token, 
      'My-Custom-Header': 'foobar' 
    }
    this.http.get(url.baseurl+'/validate/get/tradingjournal',{headers}).
    subscribe((data:any) =>{
      console.log(data);
      this.data= data;
      console.log(this.data);
      this.showSpinner = false;
    },err=>{
      console.log(err)
      this.showSpinner = false;
      this.openSnackBar('Sory we are facing some issues ')
    })
  }

  getTradingObjectives(){
    console.log('calling---------')
    var token= window.localStorage.getItem('token');
    const headers = { 
      'Authorization': 'Bearer '+token, 
      'My-Custom-Header': 'foobar' 
    }
    this.http.get(url.baseurl+'/validate/tradingobjective',{headers}).
    subscribe((data:any) =>{
      console.log(data);
      // this.data= data;
      this.tradingObj = data.result;
      // console.log(this.data);
      this.showSpinner = false;
    },err=>{
      console.log(err)
      this.showSpinner = false;
      this.openSnackBar('Sory we are facing some issues ')
    })
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, 'close', {
      duration: 2000,
    });
  }

  openTradingObjective(): void {
    console.log('Calling')
    let dialogRef = this.dialog.open(TradingObjectiveDialog, {
      // data: { name: this.name, animal: this.animal }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.showSpinner = true;
      // this.getTradingJournals();
      this.getTradingObjectives();
      // console.log('The dialog was closed');
      // this.animal = result;
      // console.log('Res:'+result)
    });
  }

  handleResponse(data){
    sessionStorage.setItem('loggedUser', data.Username);
  }

}
