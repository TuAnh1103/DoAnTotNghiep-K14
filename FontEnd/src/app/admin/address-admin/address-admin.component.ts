import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs';
import { Address } from 'src/app/core/models/address.model';
import { CommonService } from 'src/app/shared/common.service';

@Component({
  selector: 'app-address-admin',
  templateUrl: './address-admin.component.html',
  styleUrls: ['./address-admin.component.css']
})
export class AddressAdminComponent implements OnInit {
  private baseUrl:string;
  private headers:any;
  addressList:Address[];
  data:any;
  constructor(private http:HttpClient,private commonService:CommonService) {
    this.baseUrl=this.commonService.webApiUrl;
    this.headers=this.commonService.createHeadersOption(localStorage.getItem('token'));
    this.getAllAddress();
  }

  ngOnInit(): void {
  }
  getAllAddress(){
    this.http.get(`${this.baseUrl}/admin/address/getall`,{headers:this.headers})
    .pipe(first())
    .subscribe(
      (datas)=>{
        this.addressList=datas as Address[];
      }
    )
  }
}
