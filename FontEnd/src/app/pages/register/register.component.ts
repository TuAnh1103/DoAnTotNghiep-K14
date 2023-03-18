import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { first } from 'rxjs';
import { User } from 'src/app/core/models/user.model';
import { CustomvalidationService } from 'src/app/services/customvalidation.service';
import { AuthenticationDialogComponent } from 'src/app/shared/authentication-dialog/authentication-dialog.component';
import { CommonService } from 'src/app/shared/common.service';

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
  message:string;
  constructor(private dialog: MatDialog,private fb:FormBuilder,private http:HttpClient,private commonService:CommonService,private router:Router, private customValidator: CustomvalidationService) {
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
    const url=`${this.commonService.webApiUrl}/auth/register`;
    return this.http.post(url,this.form.value)
    .pipe(first())
    .subscribe(
      data=>{
        this.user=this.form.value;
        // console.log("register success");
        this.openDialog();
      },
      error=>{
        console.log(error);
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
}
