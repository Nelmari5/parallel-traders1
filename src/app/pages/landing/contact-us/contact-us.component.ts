import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { url } from 'src/commonurl/commonurl';
import { emailValidator } from '../../../theme/utils/app-validators';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss']
})
export class ContactUsComponent implements OnInit {
  public lat: number = 40.678178;
  public lng: number = -73.944158;
  public zoom: number = 12;
  public contactForm: FormGroup;

  constructor(public formBuilder: FormBuilder, private http: HttpClient,) { }

  ngOnInit() {
    this.contactForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.compose([Validators.required, emailValidator])],
      phone: ['', Validators.required],
      message: ['', Validators.required]
    });
  }

  public onContactFormSubmit(values:Object):void {
    if (this.contactForm.valid) {
      console.log(values)
      this.http.post(url.baseurl + '/auth/contact', values).subscribe(
        (result) => {
          console.log("result", result);
          
          if (result['hasError'] == false) {

          }
          
        })
    }
  }

}
