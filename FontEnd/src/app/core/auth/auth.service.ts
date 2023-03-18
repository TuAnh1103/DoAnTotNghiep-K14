import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginModel} from '../models/login.model';
import { CommonService } from '../../shared/common.service';
import { JwtHelperService } from '@auth0/angular-jwt';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  jwtHelper:any;
  constructor(private http:HttpClient,private commonService:CommonService) {
    this.jwtHelper = new JwtHelperService();
  }
  public isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    // Check whether the token is expired and return
    // true or false
    return !this.jwtHelper.isTokenExpired(token);
  }
  login(loginModel:LoginModel)
  {
    const url=`${this.commonService.webApiUrl}/auth/login`;
    return this.http.post(url,loginModel);
  }
}
