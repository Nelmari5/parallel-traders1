import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { url } from 'src/commonurl/commonurl';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})

export class ProfileComponent implements OnInit {
  public user_email = window.localStorage.getItem('userEmail');

  constructor ( private http:HttpClient, private route: ActivatedRoute,  public router:Router){}

  ngOnInit() {
    this.route.queryParams.subscribe(
      params=>{
        console.log(params);
        this.user_email = params['userEmail']
      }
    )
  }

  onSubmit(data) {
    var formDataHeader = {
      headers: new HttpHeaders({
        'Accept': '*/*',
        'Access-Control-Allow-Origin': '*',
      })
    };
    const formData: FormData = new FormData();
    formData.append('user_email', data.user_email);

    // this.http.post(url+'/update-user',formData, formDataHeader)
    // .subscribe((result) => {

    //   console.log("result",result)
    //   if(result['hasError'] == false) this.router.navigateByUrl('/loggedin/dashboard');
    // })
    // console.warn(data)
  }

}
