import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { url } from 'src/commonurl/commonurl';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  constructor(private http: HttpClient, public router: Router) {}
  public users;
  ngOnInit() {
    if(!window.localStorage.getItem('token')) this.router.navigateByUrl('/login');
    let user_role = window.localStorage.getItem('userRole');
    if(user_role == '0') {
      this.getUsers();
    }

  }

  public getUsers() {
    let token = window.localStorage.getItem('token');
    let formDataHeader = {
      headers: new HttpHeaders({
        Accept: 'application/json',
        'Access-Control-Allow-Origin': '*',
        Authorization: 'Bearer ' + token
      })
    };
    
    this.http.post(url.baseurl + '/validate/arb/get-users', null, formDataHeader).subscribe(
      (result) => {
        console.log("result", result);
        if(result['hasError'] == false) {
          this.users = result['users'];
        }
      })
  }
}