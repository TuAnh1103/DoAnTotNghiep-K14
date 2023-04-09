import { UserDetail } from '../../../core/models/user-detail';
import { User } from '../../../core/models/user.model';
import { PostResponse } from '../../../core/models/post.model.ts';
import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CommonService } from '../../common.service';
import { SlideInterface } from 'src/app/core/types/slide.interface';
import { first } from 'rxjs';
import { MessageResponse } from 'src/app/core/models/message-response.ts';

@Component({
  selector: 'app-share-dialog',
  templateUrl: './share-dialog.component.html',
  styleUrls: ['./share-dialog.component.css']
})
export class ShareDialogComponent implements OnInit {
  private baseUrl:string;
  private headers:any;
  form:FormGroup;
  post:PostResponse;
  user:UserDetail;
  liked:boolean;
  slides: SlideInterface[];
  content:string;
  messageResponse:MessageResponse;
  constructor(
    private snackBar: MatSnackBar,private router:Router,
    private commonService:CommonService,private http:HttpClient,
    private fb:FormBuilder,private dialogRef:MatDialogRef<ShareDialogComponent>,@Inject(MAT_DIALOG_DATA)data) {
      this.post = data.post;
      this.user = data.userCurrent;
      this.slides = this.post.images;
      this.liked=this.post.liked;
      this.baseUrl=this.commonService.webApiUrl;
      this.headers=this.commonService.createHeadersOption(localStorage.getItem('token'));
      this.form = this.fb.group({
        content: ['', Validators.required]
      });
      this.baseUrl = this.commonService.webApiUrl;
     }

  ngOnInit() {
    this.slides = this.post.images;
    this.liked=this.post.liked;
  }
  sharePost(){
    this.http.post(`${this.baseUrl}/share/${this.post.id}`,this.form.value,{headers:this.headers})
    .pipe(first())
    .subscribe(
      (datas)=>{
        this.showSnackbarSucsess("Chia sẻ thành công!",'',1000);
        this.dialogRef.close();
      },
      (error)=>{
        this.messageResponse=error.error;
        this.showSnackbarSucsess(this.messageResponse.message,'',1000);
      }
    )
  }
  close(){
    this.dialogRef.close();
  }
  showSnackbarSucsess(content, action, duration) {
    this.snackBar.open(content, action, {
      duration: 1000,
      verticalPosition: "top", // Allowed values are  'top' | 'bottom'
      horizontalPosition: "center",// Allowed values are 'start' | 'center' | 'end' | 'left' | 'right'
      panelClass: ["custom-style"]
  })}
  showSnackbarError(content, action, duration) {
    this.snackBar.open(content, action, {
      duration: 5000,
      verticalPosition: "top", // Allowed values are  'top' | 'bottom'
      horizontalPosition: "center",// Allowed values are 'start' | 'center' | 'end' | 'left' | 'right'
      panelClass: ["error-custom-style"]
  })}
}
