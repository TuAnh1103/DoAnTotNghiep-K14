import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { first } from 'rxjs';
import { User } from 'src/app/core/models/user.model';
import { CustomvalidationService } from 'src/app/services/customvalidation.service';
import { AuthenticationDialogComponent } from 'src/app/shared/components/authentication-dialog/authentication-dialog.component';
import { CommonService } from 'src/app/shared/common.service';
import { MessageResponse } from 'src/app/core/models/message-response.ts';
import { Favorite } from 'src/app/core/models/favorite.model';
import { MatCheckboxChange } from '@angular/material/checkbox';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  private baseUrl:string;
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
  favoriteList: Favorite[];
  constructor(private snackBar: MatSnackBar,private dialog: MatDialog,private fb:FormBuilder,private http:HttpClient,private commonService:CommonService,private router:Router, private customValidator: CustomvalidationService) {
    this.baseUrl=this.commonService.webApiUrl;
    this.form=this.fb.group({
      firstName:['',Validators.required],
      lastName:['',Validators.required],
      dob:[null,Validators.required],
      email:['',Validators.required],
      gender:[],
      username:['',Validators.required,this.customValidator.userNameValidator.bind(this.customValidator)],
      password:['',Validators.compose([Validators.required, this.customValidator.patternValidator()])],
      password_confirmation:['',Validators.required],
      favorites: this.fb.array([], Validators.required)
    },
    {
      validator: this.customValidator.MatchPassword('password', 'password_confirmation'),
    });
   }
  ngOnInit(): void {
    this.getAllFavorites();
  }
  onSubmit(){
    this.message="";
    const url=`${this.commonService.webApiUrl}/auth/register`;
    this.showSnackbarSucsess('Mã xác thực đang được gửi đến email của bạn sau 10 giây....','Close','3000');
    return this.http.post(url,this.form.value)
    .pipe(first())
    .subscribe(
      data=>{
        this.user = this.form.value;
        this.openDialog();
      },
      (error: HttpErrorResponse)=>{
        console.log(error);
        this.messageResponse=error.error;
        this.showSnackbarError(this.messageResponse.message,'','2000');
      }
    )
  }
  onChange(selectedOption: MatCheckboxChange) {
    const favorites = (<FormArray>(
      this.form.get("favorites")
    )) as FormArray;

    if (selectedOption.checked) {
      favorites.push(new FormControl(selectedOption.source.value));
    } else {
      const i = favorites.controls.findIndex(
        x => x.value === selectedOption.source.value
      );
      favorites.removeAt(i);
    }
  }
  getAllFavorites(){
    this.http.get(`${this.baseUrl}/auth/favorite`)
    .pipe(first())
    .subscribe(
      (datas)=>{
        console.log(datas);
        this.favoriteList=datas as Favorite[];
      },
      (error)=>console.log(error)
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
        password:this.password,
        favoriteIds:this.form.get("favorites").value
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
