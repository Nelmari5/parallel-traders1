import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormBuilder, FormGroup } from  '@angular/forms';
// Router
import { url } from 'src/commonurl/commonurl';
import { Router } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
@Component({
  selector: 'app-join-room',
  templateUrl: './join-room.component.html',
  styleUrls: ['./join-room.component.scss']
})
export class JoinRoomComponent implements OnInit {

  constructor(private router:Router,private formBuilder: FormBuilder,private http: HttpClient) { }
  usersHasRooms=[];
  public showDetails= false;
  public rooms=[];
  public createrName;
  public createrId;
  public join=[];
  public showSpinner = true;
  public myId= window.localStorage.getItem('userId');
  customOptions: OwlOptions = {
    // loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 700,
    navText: ["previous", 'next'],
    responsive: {
      0: {
        items: 1
      },
      2000: {
        items: 2
      },
     
    },
    nav: true
  }
  ngOnInit(): void {
    var token= window.localStorage.getItem('token');
    var httpOptions = {
       headers: new HttpHeaders({
         'Content-Type': 'application/x-www-form-urlencoded',
         'Authorization': 'Bearer '+token, 
       })
     }
     this.http.get(url.baseurl+'/validate/get/rooms',httpOptions).subscribe((data:any)=>{
       console.log(data);
      //  this.usersHasRooms=data['data']
       for(var i =0; i< data['data'].length; i++){
          if(data['data'][i]['myRooms'].length >0){
            this.usersHasRooms.push(data['data'][i])
          }
       }
       this.showSpinner = false;
     },(error)=>{
       console.log(error)
     })
  }
  roomDetails(roomId){
    console.log(roomId);
    var token= window.localStorage.getItem('token');
    var httpOptions = {
       headers: new HttpHeaders({
         'Content-Type': 'application/json',
         'Authorization': 'Bearer '+token, 
       })
     }
     let obj={
       _id:roomId
     }
     this.http.post(url.baseurl+'/validate/get/room',obj,httpOptions).subscribe((data:any)=>{
       console.log(data);
       this.rooms= data['data'];
       this.createrName = data['createrName'];
       this.createrId= data['createrId'];
      //  let userArray[]=data['data']['users']
      for(var i =0; i<data['data'].length; i++){
        this.join.push(data['data'][i]['users'].includes(window.localStorage.getItem('userId')))
      }
      console.log(this.join)
      // this.join.push(data['data'])
       this.showDetails = true;
     },(error)=>{
       console.log(error)
     })

  }
  chatWithOwner(){
    console.log(this.createrId);
  }
  joinRoom(id){
    console.log('room Id :',id)
    var token= window.localStorage.getItem('token');
    var httpOptions = {
       headers: new HttpHeaders({
         'Content-Type': 'application/json',
         'Authorization': 'Bearer '+token, 
       })
     }
     let obj={
      roomId:id
    }
    this.http.post(url.baseurl+'/validate/join/room',obj,httpOptions).subscribe((data:any)=>{
      console.log(data)
     },(error)=>{
       console.log(error)
     })
    // console.log('Join Room',id)
  }
  requestToJoinRoom(id){
    console.log('Request to join room',id)
  }
}
