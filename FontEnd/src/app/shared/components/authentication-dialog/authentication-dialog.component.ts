import { MessageResponse } from 'src/app/core/models/message-response.ts';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/shared/common.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { first } from 'rxjs';

@Component({
  selector: 'app-authentication-dialog',
  templateUrl: './authentication-dialog.component.html',
  styleUrls: ['./authentication-dialog.component.css']
})
export class AuthenticationDialogComponent implements OnInit {
  form:FormGroup;
  firstName:string;
  messageResponse:MessageResponse;
  constructor(private snackBar: MatSnackBar,private router:Router,private commonService:CommonService,private http:HttpClient,private fb:FormBuilder,private dialogRef:MatDialogRef<AuthenticationDialogComponent>,@Inject(MAT_DIALOG_DATA)data) {
    this.firstName=data.firstName;
    this.form=this.fb.group({
      firstName:[data.firstName],
      lastName:[data.lastName],
      dob:[data.dob],
      email:[data.email],
      gender:[data.gender],
      username:[data.username],
      password:[data.password],
      favoriteIds:[data.favoriteIds],
      code:['',Validators.required]
    })
   }

  ngOnInit() {

  }
  onSubmit(){
    console.log(this.form);
    const url=`${this.commonService.webApiUrl}/auth/register`;
    return this.http.post(url,this.form.value)
    .pipe(first())
    .subscribe(
      data=>{
        this.dialogRef.close();
        this.router.navigateByUrl("login");
        this.showSnackbarSucsess('Đăng ký tài khoản thành công!','Đóng','1000');
      },
      (error:HttpErrorResponse)=>{
        this.messageResponse=error.error;
        this.showSnackbarError(this.messageResponse.code,'','2000');
      }
    )
  }
  save() {
    this.dialogRef.close(this.form.value);
  }

  close() {
      this.dialogRef.close();
  }
  showSnackbarSucsess(content, action, duration) {
    this.snackBar.open(content, action, {
      duration: 5000,
      verticalPosition: "top", // Allowed values are  'top' | 'bottom'
      horizontalPosition: "right",// Allowed values are 'start' | 'center' | 'end' | 'left' | 'right'
      panelClass: ["custom-style"]
  })}
  showSnackbarError(content, action, duration) {
    this.snackBar.open(content, action, {
      duration: 5000,
      verticalPosition: "top", // Allowed values are  'top' | 'bottom'
      horizontalPosition: "right",// Allowed values are 'start' | 'center' | 'end' | 'left' | 'right'
      panelClass: ["error-custom-style"]
  })}
}
