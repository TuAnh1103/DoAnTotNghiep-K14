import { Component, Inject, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { PostResponse } from 'src/app/core/models/post.model.ts';
import { UserDetail } from 'src/app/core/models/user-detail';
import { SlideInterface } from 'src/app/core/types/slide.interface';
import { CommonService } from '../../common.service';
import { HttpClient } from '@angular/common/http';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { first } from 'rxjs';
import { MessageResponse } from 'src/app/core/models/message-response.ts';

@Component({
  selector: 'app-edit-post-share',
  templateUrl: './edit-post-share.component.html',
  styleUrls: ['./edit-post-share.component.css']
})
export class EditPostShareComponent implements OnInit {
  private baseUrl:string;
  private headers:any;
  post:PostResponse;
  content:string;
  slides:SlideInterface[];
  postId:any;
  user:UserDetail;
  id:number;
  messageResponse:MessageResponse;
  constructor(private snackBar: MatSnackBar,private router:Router,
    private commonService:CommonService,private http:HttpClient,
   private dialogRef:MatDialogRef<EditPostShareComponent>,@Inject(MAT_DIALOG_DATA)data) {
      this.baseUrl=this.commonService.webApiUrl;
      this.headers=this.commonService.createHeadersOption(localStorage.getItem('token'));
      this.post=data.post;
      this.user = data.userCurrent;
      this.slides = this.post.images;
      this.postId = this.post.id;
      this.id=data.id;
      this.content=data.content;
      console.log(this.content);
     }

  ngOnInit(): void {
    this.slides = this.post.images;
  }
  onConfirmClick(){
    var body={
      content:this.content
    }
    this.http.post(`${this.baseUrl}/share/update/${this.id}`,body,{headers:this.headers})
    .pipe(first())
    .subscribe(
      (datas)=>{
        this.showSnackbarSucsess("Cập nhật bài viết đã chia sẻ thành công!",'',1000);
        this.dialogRef.close();
      },
      (error)=>{
        this.messageResponse=error.error;
        this.showSnackbarError(this.messageResponse.message,'',1000);
      }
    )
}

  showSnackbarSucsess(content, action, duration) {
    this.snackBar.open(content, action, {
      duration: 5000,
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
