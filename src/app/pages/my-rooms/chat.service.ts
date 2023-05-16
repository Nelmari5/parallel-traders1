import { Injectable } from '@angular/core'
import { Chat } from './chat.model';
import { Socket } from 'ngx-socket-io';
import {Observable} from 'rxjs';
let date = new Date(),
    day = date.getDate(),
    month = date.getMonth(),
    year = date.getFullYear(),
    hour = date.getHours(),
    minute = date.getMinutes();

// let chats = [
//     new Chat(
//         'assets/img/profile/ashley.jpg',
//         'Ashley Ahlberg', 
//         'Online',
//         'Great, then I\'ll definitely buy this theme. Thanks!',
//         new Date(year, month, day-2, hour, minute),
//         false
//     ),
//     new Chat(
//         'assets/img/profile/bruno.jpg',
//         'Bruno Vespa',
//         'Do not disturb',
//         'Great, then I\'ll definitely buy this theme. Thanks!',
//         new Date(year, month, day-2, hour, minute),
//         false
//     ),
//     new Chat(
//         'assets/img/profile/julia.jpg',
//         'Julia Aniston',
//         'Away',
//         'Great, then I\'ll definitely buy this theme. Thanks!',
//         new Date(year, month, day-2, hour, minute),
//         false
//     ),
//     new Chat(
//         'assets/img/profile/adam.jpg',
//         'Adam Sandler',
//         'Online',
//         'Great, then I\'ll definitely buy this theme. Thanks!',
//         new Date(year, month, day-2, hour, minute),
//         false
//     ),
//     new Chat(
//         'assets/img/profile/tereza.jpg',
//         'Tereza Stiles',
//         'Offline',
//         'Great, then I\'ll definitely buy this theme. Thanks!',
//         new Date(year, month, day-2, hour, minute),
//         false
//     ),  
//     new Chat(
//         'assets/img/profile/michael.jpg',
//         'Michael Blair',
//         'Online',
//         'Great, then I\'ll definitely buy this theme. Thanks!',
//         new Date(year, month, day-2, hour, minute),
//         false
//     )
// ]

// let talks = [
//     new Chat(
//         'assets/img/profile/ashley.jpg',
//         'Ashley Ahlberg', 
//         'Online',
//         'Hi, I\'m looking for admin template with angular material 2 design.  What do you think about Annular Admin Template?',
//         new Date(year, month, day-2, hour, minute+3),
//         false
//     ),
//     new Chat(
//         'assets/img/users/user.jpg',
//         'Emilio Verdines', 
//         'Online',
//         'Hi, Annular is a fully compatible with angular material 2, responsive, organized folder structure, clean & customizable code, easy to use and much more...',
//         new Date(year, month, day-2, hour, minute+2),
//         true
//     )
// ]

@Injectable()
export class ChatService {

    // public getChats():Array<Chat> {
    //     return chats;
    // }

    // public getTalk():Array<Chat> {
    //     return talks;
    // }
    currentDocument = this.socket.fromEvent<Document>('document');
    documents = this.socket.fromEvent<string[]>('documents');
  
    constructor(private socket: Socket) { }
  
    getDocument(id: string) {
      this.socket.emit('getDoc', id);
    }
  
    newDocument() {
      this.socket.emit('addDoc', { id: this.docId(), doc: '' });
    }
  
    editDocument(document: Document) {
      this.socket.emit('editDoc', document);
    }
    public getMessages = () => {
      return Observable.create((observer) => {
        this.socket.on('received in group', (message) => {
          observer.next(message);
        });
      });
    }
  
    private docId() {
      let text = '';
      const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  
      for (let i = 0; i < 5; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
      }
  
      return text;
    }
  
}

