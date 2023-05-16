import { Component, OnInit, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DOCUMENT } from '@angular/common';

import { ZoomMtg } from '@zoomus/websdk';

import { IPayPalConfig, ICreateOrderRequest } from 'ngx-paypal';
ZoomMtg.preLoadWasm();
ZoomMtg.prepareJssdk();
@Component({
  selector: 'app-share-screen',
  templateUrl: './share-screen.component.html',
  styleUrls: ['./share-screen.component.scss']
})
export class ShareScreenComponent implements OnInit {

  public payPalConfig?: IPayPalConfig;

  signatureEndpoint = 'https://17b51ef1ad30.ngrok.io/validate/get/signature'
  apiKey = 'NnKFp2nNRYmjlijBe6DeEw'
  meetingNumber = 9155833540;
  role = 0
  leaveUrl = 'http://localhost:4200'
  userName = 'Angular'
  userEmail = 'shahzad.sa68@gmail.com'
  passWord = '4aRagG'
  constructor(public httpClient: HttpClient, @Inject(DOCUMENT) document) { }

  ngOnInit(): void {
  }
  getSignature() {
    this.httpClient.post(this.signatureEndpoint, {
	    meetingNumber: this.meetingNumber,
	    role: this.role
    }).toPromise().then((data: any) => {
      if(data.signature) {
        console.log(data.signature);
        this.startMeeting(data.signature)
      } else {
        console.log(data)
      }
    }).catch((error) => {
      console.log(error)
    })
  }

  startMeeting(signature) {
    console.log('I M GETTING SIGNATURE ',signature)
    document.getElementById('zmmtg-root').style.display = 'block'

    ZoomMtg.init({
      leaveUrl: this.leaveUrl,
      isSupportAV: true,
      success: (success) => {
        console.log(success)

        ZoomMtg.join({
          signature: signature,
          meetingNumber: this.meetingNumber,
          userName: this.userName,
          apiKey: this.apiKey,
          userEmail: this.userEmail,
          passWord: this.passWord,
          success: (success) => {
            console.log(success)
          },
          error: (error) => {
            console.log(error)
          }
        })

      },
      error: (error) => {
        console.log(error)
      }
    })
  }



}
