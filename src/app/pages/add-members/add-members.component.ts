import { Component, OnInit } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { url } from 'src/commonurl/commonurl';
import { Router, ActivatedRoute } from '@angular/router';
// ActivatedRoute
// HttpClient
@Component({
  selector: 'app-add-members',
  templateUrl: './add-members.component.html',
  styleUrls: ['./add-members.component.scss']
})
export class AddMembersComponent implements OnInit {
  public users =[];
  public room;
  constructor(private router: Router, private http:HttpClient,private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(
      params=>{
        // console.log(params);
        this.room = params['room']
      }
    )
    console.log(this.room)
    // /getusers
    var token= window.localStorage.getItem('token');
    // this.http.get('') 
    var httpOptions = {   
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+token, 
      })
    }
    this.http.get(url.baseurl+'/validate/getusers',httpOptions).subscribe((data:any)=>{
      console.log(data)
      this.users=data['searchResult'];
      console.log(this.users)
      // for(var i =0; i< data['data'].length; i++){
      //   if(data['data'][i]['rooms'].length > 0){
      //     this.usersHasRooms.push(data['data'][i]);
      //   }
      // }
      // console.log(this.usersHasRooms);
    },(error)=>{
      console.log(error)
    })
  }
  addUser(userId){
    console.log(userId);
  }
  nextButtonPress(){
    this.router.navigateByUrl('/loggedin/trading-room')
  }
}
