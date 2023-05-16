import { Component,ViewChild,ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { emailValidator, matchingPasswords } from '../../theme/utils/app-validators';
import { AppSettings } from '../../app.settings';
import { Settings } from '../../app.settings.model';
import{SignUpService} from '../../services/sign-up.service';
import { HttpClient } from '@angular/common/http';
import { url } from 'src/commonurl/commonurl';
// import { AuthService, FacebookLoginProvider, SocialUser } from 'angularx-social-login';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  @ViewChild('head') id:ElementRef;
  public form:FormGroup;
  public settings: Settings;
  protected aFormGroup: FormGroup;
  private url= url.baseurl;
  public nameTakenError = false;
  public emailTakenError = false;
  constructor(private http:HttpClient,public appSettings:AppSettings, public fb: FormBuilder, public router:Router, private ser:SignUpService, private formBuilder: FormBuilder ){
    document.getElementById('head').hidden = true;
    this.settings = this.appSettings.settings; 
    this.form = this.fb.group({
      'name': [null, Validators.compose([Validators.required, Validators.minLength(3)])],
      'surName': [null, Validators.compose([Validators.required, Validators.minLength(3)])],
      'userName':[null, Validators.compose([Validators.required, Validators.minLength(3)])],
      'email': [null, Validators.compose([Validators.required, emailValidator])],
      'password': ['', Validators.required],
      'confirmPassword': ['', Validators.required],
      'file':['']
    },{validator: matchingPasswords('password', 'confirmPassword')});
  }
 
 
  ngOnInit() {
    this.aFormGroup = this.formBuilder.group({
      recaptcha: ['', Validators.required]
    });
  }

  public onSubmit(values:Object):void {
    if (this.form.valid) {
      this.ser.customerObj.firstName = this.form.value.name;
      this.ser.customerObj.lastName= this.form.value.surName;
      this.ser.customerObj.email = this.form.value.email;
      this.ser.customerObj.password = this.form.value.password;
      this.ser.customerObj.userName = this.form.value.userName;
      this.router.navigate(['/fx-blue']);
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
}