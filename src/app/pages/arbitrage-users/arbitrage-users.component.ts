import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { url } from 'src/commonurl/commonurl';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-arbitrage-users',
  templateUrl: './arbitrage-users.component.html',
  styleUrls: ['./arbitrage-users.component.scss']
})
export class ArbitrageUsersComponent implements OnInit {
  constructor ( private http:HttpClient, private route: ActivatedRoute, public router:Router, private sanitizer:DomSanitizer){}
  public idNumber = null;
  public user = null;
  public poa_image = null;
  public funds_image = null;
  public id_scan_image = null;
  public id_selfie_image = null;
  public id_back_image = null;
  

  ngOnInit() {
    if(!window.localStorage.getItem('token')) this.router.navigateByUrl('/login');
    let user_role = window.localStorage.getItem('userRole');
    this.route.queryParams.subscribe(
      params=>{
        console.log(params);
        this.idNumber = params['user_id']
        console.log(params);
      }
    );
    if(this.idNumber && user_role == '0') {
        this.getUser();      
    }
  }

  public getUser() {

    let token = window.localStorage.getItem('token');
  
    let data = {id_number: this.idNumber}

    let formDataHeader = {
      headers: new HttpHeaders({
        Accept: 'application/json',
        'Access-Control-Allow-Origin': '*',
        Authorization: 'Bearer ' + token
      })
    };
    
    this.http.post(url.baseurl+'/validate/arb/get-user',data, formDataHeader).subscribe(
      (result) => {
        
        if(result['hasError'] == false) {
          this.user = result['user'];
          if(this.user['poaFile'])  this.getPoaFiles(this.user['poaFile']);
          if(this.user['fundsFile']) this.getFundsFiles(this.user['fundsFile']);
          if(this.user['idScannFile']) this.getScanFiles(this.user['idScannFile']);
          if(this.user['idSelfieFile']) this.getSelfieFiles(this.user['idSelfieFile']);
          if(this.user['idCardBackFile']) this.getIdCardFiles(this.user['idCardBackFile']);
        }
      })
  }

  public getPoaFiles(file_name) {
    let data = {img_key: file_name}
    this.http.post(url.s3ManagerUrl+'/upload/get-documents',data).subscribe(
      (result) => {
        console.log("result", result);
        if(result['hasError'] == false) {
          let TYPED_ARRAY = new Uint8Array(result['image']['Body']['data']);
          const STRING_CHAR = TYPED_ARRAY.reduce((data, byte)=> { return data + String.fromCharCode(byte);},'');
          let base64String = btoa(STRING_CHAR);
          this.poa_image = this.sanitizer.bypassSecurityTrustUrl(`data:image/jpg;base64, ` + base64String);
        }
      })
  }

  public getFundsFiles(file_name) {
    let data = {img_key: file_name}
    this.http.post(url.s3ManagerUrl+'/upload/get-documents',data).subscribe(
      (result) => {
        console.log("result", result);
        if(result['hasError'] == false) {
          let TYPED_ARRAY = new Uint8Array(result['image']['Body']['data']);
          const STRING_CHAR = TYPED_ARRAY.reduce((data, byte)=> { return data + String.fromCharCode(byte);},'');
          let base64String = btoa(STRING_CHAR);
          this.funds_image = this.sanitizer.bypassSecurityTrustUrl(`data:image/jpg;base64, ` + base64String);
        }
      })
  }

  public getScanFiles(file_name) {
    let data = {img_key: file_name}
    this.http.post(url.s3ManagerUrl+'/upload/get-documents',data).subscribe(
      (result) => {
        console.log("result", result);
        if(result['hasError'] == false) {
          let TYPED_ARRAY = new Uint8Array(result['image']['Body']['data']);
          const STRING_CHAR = TYPED_ARRAY.reduce((data, byte)=> { return data + String.fromCharCode(byte);},'');
          let base64String = btoa(STRING_CHAR);
          this.id_scan_image = this.sanitizer.bypassSecurityTrustUrl(`data:image/jpg;base64, ` + base64String);
        }
      })
  }

  public getSelfieFiles(file_name) {
    let data = {img_key: file_name}
    this.http.post(url.s3ManagerUrl+'/upload/get-documents',data).subscribe(
      (result) => {
        console.log("result", result);
        if(result['hasError'] == false) {
          let TYPED_ARRAY = new Uint8Array(result['image']['Body']['data']);
          const STRING_CHAR = TYPED_ARRAY.reduce((data, byte)=> { return data + String.fromCharCode(byte);},'');
          let base64String = btoa(STRING_CHAR);
          this.id_selfie_image = this.sanitizer.bypassSecurityTrustUrl(`data:image/jpg;base64, ` + base64String);
        }
      })
  }
  
  public getIdCardFiles(file_name) {
    let data = {img_key: file_name}
    this.http.post(url.s3ManagerUrl+'/upload/get-documents',data).subscribe(
      (result) => {
        console.log("result", result);
        if(result['hasError'] == false) {
          let TYPED_ARRAY = new Uint8Array(result['image']['Body']['data']);
          const STRING_CHAR = TYPED_ARRAY.reduce((data, byte)=> { return data + String.fromCharCode(byte);},'');
          let base64String = btoa(STRING_CHAR);
          this.id_back_image = this.sanitizer.bypassSecurityTrustUrl(`data:image/jpg;base64, ` + base64String);
        }
      })
  }

  onSubmit(data) {
    let token = window.localStorage.getItem('token');
    let formDataHeader = {
      headers: new HttpHeaders({
        Accept: 'application/json',
        'Access-Control-Allow-Origin': '*',
        Authorization: 'Bearer ' + token
      })
    };
    
    
    
    this.http.post(url.baseurl + '/validate/arb/process-user', data, formDataHeader).subscribe(
      (result) => {
        console.log("result", result);
        if (result['hasError'] == false) this.router.navigate(['/admin/arb-users']);
      })
    console.warn(data);
  }
}