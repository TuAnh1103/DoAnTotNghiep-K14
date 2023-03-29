import { CommonService } from './../../shared/common.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private baseUrl: string;
  private headers:any;
  constructor(private http: HttpClient, private commonService: CommonService) {
    this.baseUrl = this.commonService.webApiUrl;
    this.headers = this.commonService.createHeadersOption(
      localStorage.getItem('token')
    );
  }
  getUserDetal(url:string,header:any) {
    return this.http.get(url,{headers:this.headers});
  }
}
