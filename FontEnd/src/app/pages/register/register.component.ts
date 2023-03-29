import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { first } from 'rxjs';
import { User } from 'src/app/core/models/user.model';
import { CustomvalidationService } from 'src/app/services/customvalidation.service';
import { AuthenticationDialogComponent } from 'src/app/shared/components/authentication-dialog/authentication-dialog.component';
import { CommonService } from 'src/app/shared/common.service';
import { MessageResponse } from 'src/app/core/models/message-response.ts';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  form:FormGroup;
  user:User;
  firstName:string;
  lastName:string;
  dob:Date;
  email:string;
  username:string;
  password:string;
  gender:string;
  password_confirmation:string;
  message?:string;
  messageResponse:MessageResponse;
  constructor(private snackBar: MatSnackBar,private dialog: MatDialog,private fb:FormBuilder,private http:HttpClient,private commonService:CommonService,private router:Router, private customValidator: CustomvalidationService) {
    this.form=this.fb.group({
      firstName:['',Validators.required],
      lastName:['',Validators.required],
      dob:[null,Validators.required],
      email:['',Validators.required],
      gender:[],
      username:['',Validators.required,this.customValidator.userNameValidator.bind(this.customValidator)],
      password:['',Validators.compose([Validators.required, this.customValidator.patternValidator()])],
      password_confirmation:['',Validators.required],
    },
    {
      validator: this.customValidator.MatchPassword('password', 'password_confirmation'),
    });
   }
  ngOnInit(): void {
  }
  onSubmit(){
    this.message="";
    const url=`${this.commonService.webApiUrl}/auth/register`;
    this.showSnackbarSucsess('Wait for the code to be sent to your email in 30 seconds....','Close','3000');
    return this.http.post(url,this.form.value)
    .pipe(first())
    .subscribe(
      data=>{
        this.user = this.form.value;
        this.openDialog();
      },
      (error: HttpErrorResponse)=>{
        this.messageResponse=error.error;
        this.showSnackbarError(this.messageResponse.message,'','2000');
      }
    )
  }
  openDialog(){
    const dialogRef=this.dialog.open(AuthenticationDialogComponent,{
      hasBackdrop:false,
      data:{
        firstName:this.firstName,
        lastName:this.lastName,
        dob:this.dob,
        gender:this.gender,
        email:this.email,
        username:this.username,
        password:this.password
      }
    });
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
