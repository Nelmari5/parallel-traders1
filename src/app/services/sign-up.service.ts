import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SignUpService {

  constructor() { }
  public customerObj = {
    "firstName":"",
    "lastName":"",
    "email": "",
    "userName": "",
    "password":"",
    "fxUserName":""

  }
}
