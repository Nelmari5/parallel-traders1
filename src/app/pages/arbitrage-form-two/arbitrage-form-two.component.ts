import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { url } from 'src/commonurl/commonurl';

@Component({
  selector: 'app-arbitrage-form-two',
  templateUrl: './arbitrage-form-two.component.html',
  styleUrls: ['./arbitrage-form-two.component.scss']
})

export class ArbitrageFormTwoComponent implements OnInit {
  public idNumber;
  address_proof_doc: File = null;
  source_funds_proof: File = null;
  scanned_proof_id: File = null;
  selfie_proof_id: File = null;
  id_doc_selfie_back: File = null;
  constructor ( private http:HttpClient, private route: ActivatedRoute,  public router:Router){}

  ngOnInit() {
    if(!window.localStorage.getItem('token')) this.router.navigateByUrl('/login');
    this.route.queryParams.subscribe(
      params=>{
        console.log(params);
        this.idNumber = params['id']
      }
    )
  }

  handlePoaFileInput(files: FileList) {
    this.address_proof_doc = files.item(0);
  }

  handleSourceFundFileInput(files: FileList) {
    this.source_funds_proof = files.item(0);
  }

  handleSelfieProofFileInput(files: FileList) {
    this.selfie_proof_id = files.item(0);
  }

  handleIDSelfieBackProofFileInput(files: FileList) {
    this.id_doc_selfie_back = files.item(0);
  }

  handleScannedProofFileInput(files: FileList) {
    this.scanned_proof_id = files.item(0);
  }

  onSubmit(data) {
    var formDataHeader = {
      headers: new HttpHeaders({
        'Accept': '*/*',
        'Access-Control-Allow-Origin': '*',
      })
    };
    const formData: FormData = new FormData();
    formData.append('id_number', data.id_number);
    formData.append('source_funds', data.source_funds);
    formData.append('address_proof_doc_type', data.address_proof_doc_type);
    formData.append('id_proof_doc_type', data.id_proof_doc_type);
    formData.append('address_proof_doc', this.address_proof_doc);
    formData.append('source_funds_proof', this.source_funds_proof);
    formData.append('selfie_proof_id', this.selfie_proof_id);
    formData.append('id_doc_selfie_back', this.id_doc_selfie_back);
    formData.append('scanned_proof_id', this.scanned_proof_id)
    formData.forEach((value,key) => {
      console.log(key+" "+value)
    });
    this.http.post(url.s3ManagerUrl+'/upload/documents',formData, formDataHeader)
    .subscribe((result) => {

      console.log("result",result)
      
      if(result['hasError'] == false) {
        let token = window.localStorage.getItem('token');
        let formHeader = {
          headers: new HttpHeaders({
            Accept: 'application/json',
            'Access-Control-Allow-Origin': '*',
            Authorization: 'Bearer ' + token
          })
        };
        let data = result['image_keys']
            data.idNumber = this.idNumber
        this.http.post(url.baseurl + '/validate/arb/update-user', data, formHeader).subscribe(
          (result) => {
            console.log("result", result);
            if (result['hasError'] == false) this.router.navigateByUrl('/loggedin/dashboard');
    
          })
      } 
    })
    console.warn(data)
  }
}