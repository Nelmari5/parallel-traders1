import { Component, ViewEncapsulation, OnInit, HostListener } from '@angular/core';
import { NguCarousel } from '@ngu/carousel';
import { AppSettings } from '../../app.settings';
import { Settings } from '../../app.settings.model';
import { LandingService } from './landing.service';
import { MatChipInputEvent } from '@angular/material/chips';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { emailValidator } from '../../theme/utils/app-validators';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
  encapsulation: ViewEncapsulation.None 
})
export class LandingComponent implements OnInit {
  public menuItems = ['Our Services','Phased Launch', 'About Us', 'Contact Us']  
  public settings: Settings;  
  public contactForm: FormGroup;

  constructor(public appSettings:AppSettings, private landingService:LandingService, public formBuilder: FormBuilder) {
    this.settings = this.appSettings.settings; 
  }
  // constructor(public formBuilder: FormBuilder) { }

  ngOnInit(){
    this.contactForm = this.formBuilder.group({
      email: ['', Validators.compose([Validators.required, emailValidator])],
    });
  }

  @HostListener('window:scroll', ['$event'])

  onWindowScroll(e) {
    let element = document.querySelector('.navbar');
    if (window.pageYOffset > element.clientHeight) {
      element.classList.add('navbar-inverse');
    } else {
      element.classList.remove('navbar-inverse');
    }
  }

  public onContactFormSubmit(values:Object):void {
    if (this.contactForm.valid) {
      console.log(values);
    }
  }

  ngAfterViewInit(){
    setTimeout(() => {
      this.settings.loadingSpinner = false; 
    }); 
  }
}
