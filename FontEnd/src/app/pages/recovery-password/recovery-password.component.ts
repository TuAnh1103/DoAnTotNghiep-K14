import { ApiService } from 'src/app/core/service/api/api.service';
import { Component, OnInit } from '@angular/core';
import { HelperService } from 'src/app/core/service/helper/helper.service';
import { AuthFirebaseService } from 'src/app/core/service/auth-firebase/auth-firebase.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoginModel, Token } from 'src/app/core/models/login.model';

import { UserDetail } from 'src/app/core/models/user-detail';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/core/auth/auth.service';
import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { CommonService } from 'src/app/shared/common.service';
import { first } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { AuthenRecoveryComponent } from 'src/app/shared/components/authen-recovery/authen-recovery.component';
import { MessageResponse } from 'src/app/core/models/message-response.ts';


@Component({
  selector: 'app-recovery-password',
  templateUrl: './recovery-password.component.html',
  styleUrls: ['./recovery-password.component.css']
})
export class RecoveryPasswordComponent implements OnInit {
  private baseUrl:string;
  private headers:any;
  form:FormGroup;
  loginModel:LoginModel;
  accesstoken:Token;
  error:any;
  user:UserDetail;
  password:string;
  username:string;
  messageResponse:MessageResponse;
  code:string;
  constructor(
    private dialog:MatDialog,
    private api:ApiService,private helper:HelperService,private auth:AuthFirebaseService,
    private snackBar: MatSnackBar, private fb:FormBuilder,
    private authService:AuthService,private router:Router,
    private http:HttpClient,private commonService:CommonService) {
    this.form=this.fb.group({
      username:['',Validators.required],
      password:['',Validators.required],
    });
 this.baseUrl=this.commonService.webApiUrl;

  }
  onSubmit()
  {
    if(!this.username||!this.password)
    {
      this.error="Tên người dùng và mật khẩu không được để trống!"
    }
    else{
      const body={
        username:this.username,
        password:this.password
      }
      this.http.post(`${this.baseUrl}/auth/recovery`,body,{})
      .pipe(first())
      .subscribe(
        (datas:any)=>{
          this.showSnackbarSuccess(datas.message,'Close','3000');
          console.log(datas.message);
          this.openDialog();
        },
        (error: HttpErrorResponse)=>{
          this.error=error.error;
          console.log(error);
          this.messageResponse=error.error;

          this.showSnackbarFail(this.messageResponse.message,"",1000);
        }
      )
    }
  }
  openDialog(){
    const dialogRef=this.dialog.open(AuthenRecoveryComponent,{
      hasBackdrop:false
    });
    dialogRef.afterClosed().subscribe((data)=>
    {
      const body={
        username:this.username,
        password:this.password,
        code:data
      }
      if(!data)
      {
        this.showSnackbarFail("Mã xác thực khoogn được bỏ trống!","",1000);
      }
      else{
        this.http.post(`${this.baseUrl}/auth/recovery`,body,{})
        .pipe(first())
        .subscribe(
          (datas)=>{
            this.showSnackbarSuccess('Đặt lại mật khẩu thành công!','','3000');
            console.log(datas);
            this.router.navigateByUrl("/login");
          },
          (error: HttpErrorResponse)=>{
            this.error=error.error;
            console.log(error);
            this.messageResponse=error.error;

            this.showSnackbarFail(this.messageResponse.message,"",1000);
          }
        )
      }
    }
    );
  }
  ngOnInit(): void {
    setTimeout(()=>{
      localStorage.clear();
    },1000)
    const ipnElement = document.querySelector('#ipnPassword')
    const btnElement = document.querySelector('#btnPassword')

    // step 2
    btnElement.addEventListener('click', function() {
      // step 3
      const currentType = ipnElement.getAttribute('type')
      // step 4
      ipnElement.setAttribute(
        'type',
        currentType === 'password' ? 'text' : 'password'
      )
    })
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
