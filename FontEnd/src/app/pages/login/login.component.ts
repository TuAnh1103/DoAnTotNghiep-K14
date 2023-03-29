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
  constructor(private snackBar: MatSnackBar, private fb:FormBuilder,private authService:AuthService,private router:Router,private http:HttpClient,private commonService:CommonService) {
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
                    this.showSnackbarSuccess('Login successful!','','1000');
                    this.router.navigateByUrl("/home");
                },
                (error) =>{
                  this.showSnackbarFail('Login failed!','','1000');
                }
                )
          },
          error=>{
            this.showSnackbarFail("Username or password doesn't exist.Please check again!",'','1000');
          }
        );
      }
      else{
        this.showSnackbarFail("Username and password doesn't blank!",'','1000');
        }
  }
  ngOnInit(): void {

  }
  getUserByUsername(username:string,token:any)
  {
    return this.http.get(`${this.commonService.webApiUrl}/user/username/${username}`,{headers:this.commonService.createHeadersOption(token)});
  }
  showSnackbarSuccess(content, action, duration) {
    this.snackBar.open(content, action, {
      duration: 5000,
      verticalPosition: "top", // Allowed values are  'top' | 'bottom'
      horizontalPosition: "right",// Allowed values are 'start' | 'center' | 'end' | 'left' | 'right'
      panelClass: ["custom-style"]
    })}
    showSnackbarFail(content, action, duration) {
      this.snackBar.open(content, action, {
        duration: 5000,
        verticalPosition: "top", // Allowed values are  'top' | 'bottom'
        horizontalPosition: "right",// Allowed values are 'start' | 'center' | 'end' | 'left' | 'right'
        panelClass: ["custom-style2"]
      })}
}
