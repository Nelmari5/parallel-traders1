import { Component,ViewChild,ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { emailValidator, matchingPasswords } from '../../theme/utils/app-validators';
import { AppSettings } from '../../app.settings';
import { Settings } from '../../app.settings.model';
import { SignUpService } from '../../services/sign-up.service';
import { HttpClient } from '@angular/common/http';
import { url } from 'src/commonurl/commonurl';
// import { AuthService, FacebookLoginProvider, SocialUser } from 'angularx-social-login';


@Component({
  selector: 'app-register',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent {
  @ViewChild('head') id:ElementRef;
  public form:FormGroup;
  public settings: Settings;
  private url= url.baseurl;
  public nameTakenError = false;
  public emailTakenError = false;
  constructor(private http:HttpClient,public appSettings:AppSettings, public fb: FormBuilder, public router:Router, private ser:SignUpService){
    document.getElementById('head').hidden = true;
    this.settings = this.appSettings.settings; 
    this.form = this.fb.group({
      'name': [null, Validators.compose([Validators.required, Validators.minLength(3)])],
      'surName': [null, Validators.compose([Validators.required, Validators.minLength(3)])],
      'userName':[null, Validators.compose([Validators.required, Validators.minLength(3)])],
      'email': [null, Validators.compose([Validators.required, emailValidator])],
      'password': ['', Validators.required],
      'confirmPassword': ['', Validators.required],
      'file':[''],
      'role': 1
    },{validator: matchingPasswords('password', 'confirmPassword')});
  }

  public onSubmit(values:Object):void {
    if (this.form.valid) {
      this.ser.customerObj.firstName = this.form.value.name;
      this.ser.customerObj.lastName= this.form.value.surName;
      this.ser.customerObj.email = this.form.value.email;
      this.ser.customerObj.password = this.form.value.password;
      this.ser.customerObj.userName = this.form.value.userName;
      
      this.http.post(this.url+'/auth/signup',this.form.value).
      subscribe(data =>{
        console.log(data);
        if(data['hasError'] == false) this.decodeToken(data['token'])
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

  validateUserName(){
    this.http.post(this.url+'/auth/validate/user',{'userName':this.form.value.userName}).
    subscribe(res=>{
      console.log(res)
      this.nameTakenError = false;
    },err=>{
      // console.log(err)
      this.nameTakenError = true;
    })
  // console.log(this.form.value.userName)
  }

  validateEmail(){
    this.http.post(this.url+'/auth/validate/email',{'email':this.form.value.email}).
    subscribe(res=>{
      console.log(res)
      this.emailTakenError = false;
    },err=>{
      // console.log(err)
      this.emailTakenError = true;
    })
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
      this.router.navigate(['/loggedin/dashboard']);

    },err=>{
      console.log(err)
    })
  }
}