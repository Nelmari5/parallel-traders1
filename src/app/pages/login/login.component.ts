import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { emailValidator } from '../../theme/utils/app-validators';
import { AppSettings } from '../../app.settings';
import { Settings } from '../../app.settings.model';
import { HttpClient } from '@angular/common/http';
import { url } from 'src/commonurl/commonurl';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent {
  public url = url.baseurl;
  public form:FormGroup;
  public settings: Settings;
  constructor(public appSettings:AppSettings, public fb: FormBuilder, public router:Router,private http: HttpClient){
    this.settings = this.appSettings.settings; 
    this.form = this.fb.group({
      'email': [null, Validators.compose([Validators.required, emailValidator])],
      'password': [null, Validators.compose([Validators.required, Validators.minLength(6)])],
    });
  }

  public onSubmit(values:Object):void {
    if (this.form.valid) {
      // this.router.navigate(['/']);
      // console.log(this.form.value)
      this.http.post(this.url+'/auth',this.form.value).
      subscribe(data =>{
        console.log(data);
        this.decodeToken(data['token'])
      },err=>{
        console.log(err)
      })
    }
  }

  ngAfterViewInit(){
    setTimeout(() => {
      this.settings.loadingSpinner = false; 
    }); 
  }

  decodeToken(token){
    const headers = { 
      'Authorization': 'Bearer '+token, 
      'My-Custom-Header': 'foobar' 
    }
    this.http.get(this.url+'/validate/token',{headers}).
    subscribe(data =>{
      console.log(data);
      window.localStorage.setItem('token',token);
      window.localStorage.setItem('username',data['token']['fxUserName']);
      window.localStorage.setItem('appUserName',data['token']['userName']);
      window.localStorage.setItem('firstName',data['token']['firstName']);
      window.localStorage.setItem('lastName',data['token']['lastName']);
      window.localStorage.setItem('userEmail',data['token']['email']);
      window.localStorage.setItem('userRole',data['token']['role']);
      window.localStorage.setItem('userId',data['token']['_id']);

      console.log(data['token']['role']);
      if(data['token']['role'] == 0) this.router.navigate(['/admin/arb-users']);
      if(data['token']['role'] == 1) this.router.navigate(['/loggedin/dashboard']);
      

    },err=>{
      console.log(err)
    })
  }
}