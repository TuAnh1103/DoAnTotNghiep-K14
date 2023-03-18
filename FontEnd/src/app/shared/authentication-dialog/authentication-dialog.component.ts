import { Router } from '@angular/router';
import { CommonService } from 'src/app/shared/common.service';
import { HttpClient } from '@angular/common/http';
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
  constructor(private router:Router,private commonService:CommonService,private http:HttpClient,private fb:FormBuilder,private dialogRef:MatDialogRef<AuthenticationDialogComponent>,@Inject(MAT_DIALOG_DATA)data) {
    this.firstName=data.firstName;
    this.form=this.fb.group({
      firstName:[data.firstName],
      lastName:[data.lastName],
      dob:[data.dob],
      email:[data.email],
      gender:[data.gender],
      username:[data.username],
      password:[data.password],
      code:['',Validators.required]
    })
   }

  ngOnInit() {

  }
  onSubmit(){
    console.log(this.firstName);
    console.log(this.form.value);
    const url=`${this.commonService.webApiUrl}/auth/register`;
    return this.http.post(url,this.form.value)
    .pipe(first())
    .subscribe(
      data=>{
        this.dialogRef.close();
        this.router.navigateByUrl("login");
        console.log("ok");
      },
      error=>{
        console.log(error);
      }
    )
  }
  save() {
    this.dialogRef.close(this.form.value);
  }

  close() {
      this.dialogRef.close();
  }
}
