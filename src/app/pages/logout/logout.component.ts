import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html'
})
export class LogoutComponent implements OnInit {

  constructor(public router:Router){}


  ngOnInit() {

    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('appUserName');
    localStorage.removeItem('firstName');
    localStorage.removeItem('lastName');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userRole');
    localStorage.removeItem('userId');
  
    this.router.navigate(['/']);

  }

}
