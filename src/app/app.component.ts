import { Component, ViewChild} from '@angular/core';
import { Router } from '@angular/router';
import { AppSettings } from './app.settings';
import { Settings } from './app.settings.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public settings: Settings;
  
  constructor(public router: Router, public appSettings:AppSettings){
      this.settings = this.appSettings.settings;
  } 

  ngOnInit() {
    let token = window.localStorage.getItem('token');
    if(!token) this.router.navigateByUrl('/');
    
  }
}