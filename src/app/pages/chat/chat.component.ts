import { Component, OnInit, HostListener, ViewChild } from '@angular/core';
import { AppSettings } from '../../app.settings';
import { Settings } from '../../app.settings.model';
import { Chat } from './chat.model';
import { ChatService } from './chat.service';
import { Observable, Subscription } from 'rxjs';
import { Socket } from 'ngx-socket-io';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { url } from 'src/commonurl/commonurl';
// HttpClient

// import { DocumentService } from 'src/app/services/document.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
  providers: [ ChatService ]
})
export class ChatComponent implements OnInit {
  // @ViewChild('sidenav') sidenav: any;
  public settings: Settings;
  public userImage = 'assets/img/users/user.jpg';
  public chats: Array<Chat>;
  public talks: Array<Chat>;

  public sidenavOpen:boolean = true;
  public currentChat:Chat;
  public newMessage:string;
  public message;
  public messages=[];
  public users=[];
  public sender= window.localStorage.getItem('username');
  public firstName= window.localStorage.getItem('firstName');
  public userName = window.localStorage.getItem('appUserName');
  public userId= window.localStorage.getItem('userId');
  public selected= false;
  public sendTo;
  public showSpiner = false;
  @HostListener('window:resize')
  public onWindowResize():void {
    (window.innerWidth <= 768) ? this.sidenavOpen = false : this.sidenavOpen = true;
  }

  public getChat(obj){
    // if(this.talks){
    //    this.talks.length = 2;
    // }   
    // this.talks = this.chatService.getTalk();
    // this.talks.push(obj);
    // this.currentChat = obj;      
    // this.talks.forEach(talk => {
    //   if(!talk.my){
    //     talk.image = obj.image;
    //   }
    // });
    // if(window.innerWidth <= 768){
    //   this.sidenav.close();
    // }     
  }
  documents: Observable<string[]>;
  currentDoc: string;
  private _docSub: Subscription;

  constructor(private http:HttpClient ,private socket: Socket,public appSettings:AppSettings,private documentService: ChatService) { 
    this.settings = this.appSettings.settings; 
  }

  ngOnInit() {
    this.documents = this.documentService.documents;
    if(window.innerWidth <= 768){
      this.sidenavOpen = false;
    }
    let token = window.localStorage.getItem('token')
    const headers = { 
      'Authorization': 'Bearer '+token, 
      'My-Custom-Header': 'foobar' 
    }
    this.http.get(url.baseurl+'/validate/getusers',{headers}).
    subscribe(data =>{
      console.log(data);
      this.users=data['searchResult'];
      console.log(this.users)

    },err=>{
      console.log(err)
    })
    
    this.documentService.getMessages().subscribe((data: string) => {
      console.log(data);
      if(data['sender'] != this.userId && data['sendTo']== this.userId){
        this.messages.push({
          message:data['message'],
          type:'receive'
        })
      }
      // console.log(data['message']);
      // console.log(data['sendTo']);
    });
    this.socket.on('sent', () => {
      console.log('SENT')
    });
  }

  ngOnDestroy() {
    this._docSub.unsubscribe();
  }

  loadDoc(id: string) {
    this.documentService.getDocument(id);
  }

  newDoc() {
    this.documentService.newDocument();
  }
  typing(){
    this.socket.emit("typing", { user: this.firstName, message: "is typing..." });
  }
  sendMessage(){
    this.socket.emit("chat message",this.message, this.sendTo,this.userId);
    this.messages.push({
      message:this.message,
      type:'send'
    })
  }
  clickedUser(user){
    this.messages=[];
    this.showSpiner = true;
    console.log(user);
    this.sendTo= user;
    this.selected = true;
    let token = window.localStorage.getItem('token')
    const headers = { 
      'Authorization': 'Bearer '+token, 
      'My-Custom-Header': 'foobar' 
    }
    let obj={
      to:user
    }
    this.http.post(url.baseurl+'/validate/get/chat',obj,{headers}).
    subscribe(data =>{
      
      this.showSpiner= false;
      console.log(data);
      for(var i =0; i< data['searchResult'].length; i++){
        if(data['searchResult'][i]['from']==this.userId){
          this.messages.push({
            message:data['searchResult'][i]['message'],
            type:'send',
            send:data['searchResult'][i]['send']
          })
        } else{
          this.messages.push({
            message:data['searchResult'][i]['message'],
            type:'receive',
            send:data['searchResult'][i]['send']
          })
        }
      }
      console.log(this.messages)
      
      // this.users=data['searchResult'];
      // console.log(this.users)

    },err=>{
      console.log(err)
    })
  }

}