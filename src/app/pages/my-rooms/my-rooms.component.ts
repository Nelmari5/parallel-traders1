import { Component, OnInit,ElementRef,ViewChild } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subscription } from 'rxjs';
import { ChatService } from './chat.service';
import { Chat } from './chat.model';
import { url } from 'src/commonurl/commonurl';
import { Socket } from 'ngx-socket-io';
import {Howl, Howler} from 'howler';
// import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-my-rooms',
  templateUrl: './my-rooms.component.html',
  styleUrls: ['./my-rooms.component.scss'],
  providers: [ChatService]
})
export class MyRoomsComponent implements OnInit {
  @ViewChild('target') private myScrollContainer: ElementRef;
  public myRooms=[];
  public joinRooms=[];
  selected= false;


  public sidenavOpen:boolean = true;
  public newMessage:string;
  public message;
  public messages=[];
  public users=[];
  public sender= window.localStorage.getItem('username');
  public firstName= window.localStorage.getItem('firstName');
  public userName = window.localStorage.getItem('appUserName');
  public userId= window.localStorage.getItem('userId');
  public sendTo;
  public showSpiner = false;
  public group;
  public groupUsers=[];
  closeResult: string;
  public imagePath;
  public imgURL;
  public audioURL;
  public videoURL;
  public documentURL;
  public sendFile=false;
  public file;
  public type='';
  public sound = new Howl({
    src: ['assets/notification/swiftly.mp3']
  });

  constructor(private socket: Socket,private http:HttpClient,private documentService: ChatService) { }

  ngOnInit(): void {
    this.sound.play();
    var token= window.localStorage.getItem('token');
    var httpOptions = {
       headers: new HttpHeaders({
         'Content-Type': 'application/json',
         'Authorization': 'Bearer '+token, 
       })
     }
     this.http.get(url.baseurl+'/validate/my/rooms',httpOptions).subscribe((data:any)=>{
      console.log(data);
      if(data['data']['myRooms'].length > 0){
        for(var i=0; i<data['data']['rooms'].length; i++){
          for(var j=0;j<data['data']['myRooms'].length;j++){
            if(data['data']['rooms'][i]['_id'] == data['data']['myRooms'][j] ){
              this.myRooms.push(data['data']['rooms'][i]);
            }else{
              this.joinRooms.push(data['data']['rooms'][i])
            }
          }
        }
      }else{
        this.joinRooms = data['data']['rooms'];
        this.myRooms=[];
      }
  
      console.log(this.joinRooms);
      console.log(this.myRooms);
      
    },(error)=>{
      console.log(error)
    })

    this.documentService.getMessages().subscribe((data: string) => {
      console.log(data);
      if(data['sender'] != this.userId && data['sendTo'].includes(this.userId)){
        this.messages.push({
          message:data['message'],
          m_type:'receive',
          send:data['send'],
          type:data['type']
        })
        this.sound.play();
        setTimeout(()=>{
          this.scrollToElement(this.myScrollContainer);
        },500) 
      }
    })

  }
  clickedGroup(id){
    // console.log('Clicked Group Id: ',id);
    // this.selected = true;
    this.messages=[];
    this.showSpiner = true;
    this.sendTo= id;
    this.selected = true;
    let token = window.localStorage.getItem('token')
    const headers = { 
      'Authorization': 'Bearer '+token, 
      'My-Custom-Header': 'foobar' 
    }
    let obj={
      id:id
    }
    this.http.post(url.baseurl+'/validate/get/room/chat',obj,{headers}).
    subscribe(data =>{
      this.showSpiner= false;
      console.log(data);
      this.group = data['data']['_id'];
      this.groupUsers= data['data']['users'];
      // this.messages = data['data']['chat'];
      for(var i =0; i< data['data']['chat'].length; i++){
        if(data['data']['chat'][i]['from']==this.userId){
          this.messages.push({
            message:data['data']['chat'][i]['message'],
            m_type:'send',
            send:data['data']['chat'][i]['send'],
            type:data['data']['chat'][i]['type']
          })
        } else{
          this.messages.push({
            message:data['data']['chat'][i]['message'],
            m_type:'receive',
            send:data['data']['chat'][i]['send'],
            type:data['data']['chat'][i]['type']
          })
        }
      }
      // this.scrollToElement(this.myScrollContainer); 
        
    },err=>{
      console.log(err)
    })
    setTimeout(()=>{
      this.scrollToElement(this.myScrollContainer);
    },2500)  
 
    // this.scrollToBottom(this.myScrollContainer);
  }
  typing(){
    // console.log(this.message);
    let date=new Date();
    console.log(date.toISOString());
    this.socket.emit("typing", { user: this.firstName, message: "is typing..." });
    console.log(this.message)
  }
  sendMessage(){

    let date=new Date();
    if(this.type == ''){
      this.type="text"
    }
    console.log('Type ---> ',this.type)
    console.log(this.message)
    if(!this.sendFile){
      this.socket.emit("chat in group",this.message, this.groupUsers,this.userId,this.group,date,this.type);
      this.messages.push({
        message:this.message,
        m_type:'send',
        send:date.toISOString(),
        type:this.type
      })
    }else{
      console.log('I M CALLING ');
      let value;
      if(this.type == 'video'){
        value = this.videoURL;
      }else if(this.type == 'image'){
        value = this.imgURL;
      }
      // console.log(this.file);
      this.socket.emit("file in group",this.file, this.groupUsers,this.userId,this.group,date,this.type);
      this.messages.push({
        message:value,
        m_type:'send',
        send:date.toISOString(),
        type:this.type
      })
      this.type = "";
      this.imgURL ='';
      this.videoURL = '';
      this.sendFile=false;

    }  

    
    
    console.log(this.messages);
    this.message='';
    setTimeout(()=>{
      this.scrollToElement(this.myScrollContainer);
    },500)  
  }
  scrollToElement(el): void {
    console.log('cliinnnnnnnnnnnnnnnnnnnn');
    this.myScrollContainer.nativeElement.scroll({
      top: this.myScrollContainer.nativeElement.scrollHeight,
      left: 0,
      behavior: 'smooth'
    });
  }
  
  fileChange(files) {
    // console.log('Calling')
    console.log(files.target.files[0].type);
    console.log(files.target.files[0])
    const types = ['image/png', 'image/jpeg', 'image/jpg'];
    // const audios=['audio/mpeg', 'audio/ogg', 'audio/vnd.wav','audio/wav'];
    const videos=['video/mp4','video/webm'];
    const documents=['application/pdf']
    if (files.target.files.length > 0) {
      this.sendFile = true;
      this.file = files.target.files[0];
      var reader = new FileReader();
      this.imagePath = files;
      if(types.includes(files.target.files[0].type) ){
        this.type='image'
        reader.readAsDataURL(files.target.files[0]); 
        reader.onload = (_event) => { 
          this.imgURL = reader.result;
        }
      }else if(videos.includes(files.target.files[0].type)){
        reader.readAsDataURL(files.target.files[0]); 
        reader.onload = (_event) => { 
          this.videoURL = reader.result;
          this.type='video'
        } 
      }else if(documents.includes(files.target.files[0].type)){
        reader.readAsDataURL(files.target.files[0]); 
        reader.onload = (_event) => { 
          this.documentURL = reader.result;
        } 
      } else{
        console.log('Sory this file is not supported')
      }
    }
  }

  remove(value){
    this.imagePath='';
    if(value == "video"){
      this.videoURL = '';
    }else if(value== "img"){
      this.imgURL='';
    } else if(value =='audio'){
      this.audioURL='';
    }
  }

  // open(content) {
  //   this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
  //     this.closeResult = `Closed with: ${result}`;
  //   }, (reason) => {
  //     this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
  //   });
  // }
  // private getDismissReason(reason: any): string {
  //   if (reason === ModalDismissReasons.ESC) {
  //     return 'by pressing ESC';
  //   } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
  //     return 'by clicking on a backdrop';
  //   } else {
  //     return  `with: ${reason}`;
  //   }
  // }

}
