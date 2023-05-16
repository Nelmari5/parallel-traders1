import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormBuilder, FormGroup } from  '@angular/forms';
// Router
import { url } from 'src/commonurl/commonurl';
import { Router } from '@angular/router';
// HttpHeaders
@Component({
  selector: 'app-create-room',
  templateUrl: './create-room.component.html',
  styleUrls: ['./create-room.component.scss']
})
export class CreateRoomComponent implements OnInit {
  usersHasRooms=[];
  fileToUpload: File = null;
  public description;
  public tradingStrategy;
  public riskReward;
  public sucessRate;
  public roomName;
  public roomType;
  public showSpinner= true;
  //form
  form: FormGroup;
  constructor(private router:Router,private formBuilder: FormBuilder,private http: HttpClient) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      avatar: ['']
    });

    var token= window.localStorage.getItem('token');
   var httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+token, 
      })
    }
    this.http.get(url.baseurl+'/validate/get/rooms',httpOptions).subscribe((data:any)=>{
      for(var i =0; i< data['data'].length; i++){
        if(data['data'][i]['rooms'].length > 0){
          this.usersHasRooms.push(data['data'][i]);
        }
      }
      console.log(this.usersHasRooms);
      this.showSpinner = false;
    },(error)=>{
      console.log(error)
      this.showSpinner = false;
    })
  }

  fileChange(event) {
    console.log('Calling')
    // this.fileToUpload = element.target.files;
    // console.log(this.fileToUpload);
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.form.get('avatar').setValue(file);
    }
    console.log(this.form.get('avatar').value)
  }
  createRoom(){
    var formData = new FormData();
    formData.append('description',this.description);
    formData.append('tradingStrategy',this.tradingStrategy);
    formData.append('riskReward',this.riskReward);
    formData.append('sucessRate',this.sucessRate);
    formData.append('roomType',this.roomType);
    formData.append('roomName',this.roomName);
    formData.append('tradingHistory', this.form.get('avatar').value);
    formData.forEach((value,key) => {
      console.log(key+" "+value)
    });
  
  var token= window.localStorage.getItem('token');
   var formDataHeader = {
      headers: new HttpHeaders({
        Accept: 'application/json',
        'Access-Control-Allow-Origin': '*',
        Authorization: 'Bearer ' + token
      })
    };
    this.http.post(url.baseurl+'/validate/addtradingroom',formData,formDataHeader).subscribe(
      (result)=>{
        //[routerLink]='(["/loggedin/add-members"])'
        console.log(result);
        this.router.navigateByUrl('/loggedin/add-members?room='+result['id'])
        
      },(error)=>{
        console.log(error);
      }
    )
  }

}
