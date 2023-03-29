import { CustomvalidationService } from './../../services/customvalidation.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/shared/common.service';
import { first } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { AlertDialogComponent } from 'src/app/shared/components/alert-dialog/alert-dialog.component';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  form:FormGroup;
  oldPassword:string;
  newPassword:string;
  newPasswordConfirmation:string;
  message:{};
  constructor(private dialog: MatDialog,private commonService:CommonService,private customValidator: CustomvalidationService,private fb:FormBuilder,private http:HttpClient,private router:Router) {
    this.form=this.fb.group({
      oldPassword:['',Validators.required],
      newPassword:['',Validators.compose([Validators.required, this.customValidator.patternValidator()])],
      newPasswordConfirmation:['',Validators.required],
    },
    {
      validator: this.customValidator.MatchPassword('newPassword', 'newPasswordConfirmation'),
    });
   }

  ngOnInit(): void {
  }
  onSubmit()
  {
    const url=`${this.commonService.webApiUrl}/setting/changepassword`;
    this.commonService.createHeadersOption(localStorage.getItem("token"))
    return this.http.post(url,this.form.value,
      {headers:this.commonService.createHeadersOption(localStorage.getItem("token"))})
    .pipe(first())
    .subscribe(
      response=>{
        this.message=response;
        console.log(this.message);
        this.openDialog();
      },
      error=>{
        console.log(error);
      })
  }
  openDialog(){
    const dialogRef=this.dialog.open(AlertDialogComponent,{
      hasBackdrop:false,
      data:{
        content:this.message
      }
    });
  }
  cancel(){
    this.router.navigateByUrl("home");
  }
}
