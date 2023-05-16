import { Component, OnInit,ViewChild,ElementRef } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { url } from 'src/commonurl/commonurl';

@Component({
  selector: 'app-arbitrage',
  templateUrl: './arbitrage.component.html',
  styleUrls: ['./arbitrage.component.scss']
})
export class ArbitrageComponent implements OnInit {
  public loading = true

  constructor(public router:Router,private http:HttpClient) {}
  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true
  };

  public barChartType = 'bar';
  public barChartLegend = true;
  public barChartData = [];

  public user = false;
  public isProcessed = false;
  public authKey = false;
  public userData =[]
  public userDataRaw = []

  ngOnInit() {
    if(!window.localStorage.getItem('token')) this.router.navigateByUrl('/login');
    let email = window.localStorage.getItem('userEmail');
    let user_role = window.localStorage.getItem('userRole');

    if(email && user_role == '1') {
        this.getUser(email);      
    }
  }

  public getUser(email) {

    let token = window.localStorage.getItem('token');
    let data = {email: email}

    let formDataHeader = {
      headers: new HttpHeaders({
        Accept: 'application/json',
        'Access-Control-Allow-Origin': '*',
        Authorization: 'Bearer ' + token
      })
    };
    
    this.http.post(url.baseurl+'/validate/arb/get-user-id',data, formDataHeader).subscribe(
      (result) => {
        console.log(result)
        if(result['hasError'] == false) {
          if(result['hasUser'] == false) {
            this.user = null
            this.loading = false
          } else {
            if(result['isProcessed'] == false) {
              this.isProcessed = false
              this.user = true
              this.loading = false
            }
            if(result['isProcessed'] == true) {
              this.isProcessed = true
              this.user = true
              this.userData = result['user']

              for( var i= 0; i < this.userData.length; i++ ) {
                let el = this.userData[i]

                if(el.currency == 'btc') {
                  let obj = {data: [el.balance], label: el.currency }
                  let dispObj = {currency: el.currency, balance: el.balance}
                  this.barChartData.push(obj)
                  this.userDataRaw.push(dispObj)
                }

                if(el.currency == 'usdt') {
                  let obj = {data: [el.balance], label: el.currency }
                  let dispObj = {currency: el.currency, balance: el.balance}
                  this.barChartData.push(obj)
                  this.userDataRaw.push(dispObj)
                }

                if(el.currency == 'zar') {
                  let obj = {data: [el.balance], label: el.currency }
                  let dispObj = {currency: el.currency, balance: el.balance}
                  this.barChartData.push(obj)
                  this.userDataRaw.push(dispObj)
                }
    
              }
              this.loading = false
            }
          }
        }
      })
  }
}