import { UserDetail } from './../../core/models/user-detail';
import { CommonService } from 'src/app/shared/common.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { first } from 'rxjs';
import { AuthService } from 'src/app/core/auth/auth.service';
import { LoginModel, Token } from 'src/app/core/models/login.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApiService } from 'src/app/core/service/api/api.service';
import { HelperService } from 'src/app/core/service/helper/helper.service';
import { AuthFirebaseService } from 'src/app/core/service/auth-firebase/auth-firebase.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form:FormGroup;
  loginModel:LoginModel;
  accesstoken:Token;
  error:any;
  user:UserDetail;
  constructor(
    private api:ApiService,private helper:HelperService,private auth:AuthFirebaseService,
    private snackBar: MatSnackBar, private fb:FormBuilder,
    private authService:AuthService,private router:Router,
    private http:HttpClient,private commonService:CommonService) {
    this.form=this.fb.group({
      username:['',Validators.required],
      password:['',Validators.required]
    });
    if(localStorage.getItem('token')&&localStorage.getItem('userId'))
    {
      this.router.navigateByUrl("/home");
    }
    else{
      this.router.navigateByUrl("/login");
    }
  }
  onSubmit()
  {
      localStorage.clear();
      this.loginModel=this.form.value;
      if(this.loginModel.username && this.loginModel.password){
        this.authService.login(this.loginModel)
        .pipe(first())
        .subscribe(
          async data=>{
            this.accesstoken=data as Token;
            localStorage.setItem("token",this.accesstoken.jwtToken);
              await this.getUserByUsername(this.loginModel.username,localStorage.getItem("token"))
              .pipe(first())
              .subscribe(
                (data)=>{
                    this.user=data as UserDetail;
                    localStorage.setItem("userId",this.user.id.toString());
                    this.router.navigateByUrl("/home");
                    this.router.navigateByUrl("/home");
                   this.auth.login(this.user.email,'Ta110301').then(datas=>{
                      console.log('data', datas);
                      console.log(datas.user.uid);
                      this.router.navigateByUrl("/home");
                      // user login
                         this.api.setCurrentUser(datas.user.uid);
                         console.log(this.api.currentUser);
                         this.showSnackbarSuccess('Đăng nhập thành công!','','1000');
                    },error=> {
                      console.log(error);
                    })
                },
                (error) =>{
                  this.showSnackbarFail('Đăng nhập thất bại!','','1000');
                }
                )
          },
          error=>{
            this.showSnackbarFail("Tên đăng nhập hoặc mật khẩu sai!",'','1000');
          }
        );
      }
      else{
        this.showSnackbarFail("Tên đăng nhập hoặc mật khẩu không được trống!",'','1000');
        }
  }
  ngOnInit(): void {
    setTimeout(()=>{
      localStorage.clear();
    },1000)

  }
  getUserByUsername(username:string,token:any)
  {
    return this.http.get(`${this.commonService.webApiUrl}/user/username/${username}`,{headers:this.commonService.createHeadersOption(token)});
  }
  showSnackbarSuccess(content, action, duration) {
    this.snackBar.open(content, action, {
      duration: 1000,
      verticalPosition: "top", // Allowed values are  'top' | 'bottom'
      horizontalPosition: "right",// Allowed values are 'start' | 'center' | 'end' | 'left' | 'right'
      panelClass: ["custom-style"]
    })}
    showSnackbarFail(content, action, duration) {
      this.snackBar.open(content, action, {
        duration: 1000,
        verticalPosition: "top", // Allowed values are  'top' | 'bottom'
        horizontalPosition: "right",// Allowed values are 'start' | 'center' | 'end' | 'left' | 'right'
        panelClass: ["custom-style2"]
      })}
}
