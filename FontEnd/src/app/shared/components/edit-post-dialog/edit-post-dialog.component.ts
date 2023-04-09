import { Component, Inject, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CommonService } from '../../common.service';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ShareDialogComponent } from '../share-dialog/share-dialog.component';
import { first } from 'rxjs';
import { Post, PostResponse } from 'src/app/core/models/post.model.ts';
import { SlideInterface } from 'src/app/core/types/slide.interface';
import { UserDetail } from 'src/app/core/models/user-detail';
import { FileResponse } from 'src/app/core/models/file-response.model';

@Component({
  selector: 'app-edit-post-dialog',
  templateUrl: './edit-post-dialog.component.html',
  styleUrls: ['./edit-post-dialog.component.css']
})
export class EditPostDialogComponent implements OnInit {
  private baseUrl:string;
  private headers:any;
  post:PostResponse;
  content:string;
  selectedFiles:FileList;
  slides:SlideInterface[];
  postId:any;
  user:UserDetail;
  privacy:number;
  postUpdate:Post;
  images:FileResponse[];
  imagesid:any = [];
  constructor(private snackBar: MatSnackBar,private router:Router,
    private commonService:CommonService,private http:HttpClient,
   private dialogRef:MatDialogRef<EditPostDialogComponent>,@Inject(MAT_DIALOG_DATA)data) {
      this.baseUrl=this.commonService.webApiUrl;
      this.headers=this.commonService.createHeadersOption(localStorage.getItem('token'));
      this.post=data.post;
      this.user = data.userCurrent;
      this.slides = this.post.images;
      this.postId = this.post.id;
      this.content=this.post.content;
     }

  ngOnInit(): void {
    this.slides = this.post.images;
  }
  onConfirmClick(){
    this.post.content=this.content;
    this.post.privacy=this.privacy;
    if(this.selectedFiles)
    {
      this.showSnackbarSucsess("Upload ảnh lên thành công!","",1000);
      this.upload(this.selectedFiles)
      .pipe(first())
      .subscribe(
        (response) => {
          this.showSnackbarSucsess("Đang cập nhật lại bài viết!","",1000);
          this.images = response as FileResponse[];
          for (let i = 0; i < this.images.length; i++) {
            this.imagesid.push(this.images[i].id);
          }
         this.post.images=this.imagesid;
          this.sendPost(this.post);
        },
        (error) => {
          console.log(error);
          this.showSnackbarError("Có lỗi trong quá trình upload ảnh!","",1000);
        }
      )
  }
  else{
    this.post.images.forEach(image=>{
      this.imagesid.push(image.id);
    })
    var body = {
      content: this.content,
      privacy:this.privacy,
      images:this.imagesid,
    };
    this.sendPost(body);
  }
}
  sendPost(body:any)
  {
    this.http
    .post(`${this.baseUrl}/post/update/${this.post.id}`,body, {
      headers: this.commonService.createHeadersOption(
        localStorage.getItem('token')
      ),
    })
    .pipe(first())
    .subscribe(
      (response) => {
        this.showSnackbarSucsess("Cập nhật bài viết mới thành công!","",1000);
        this.dialogRef.close();
      },
      (error) => {
        this.showSnackbarError("Cập nhật bài viết mới thất bại!","",1000);
      }
    );
  }
  selectFiles(event) {
    this.selectedFiles = event.target.files;
  }
  upload(fileList: FileList) {
    let formData = new FormData();
    for (let i = 0; i < fileList.length; i++) {
      formData.append('files', fileList[i]);
    }
    return this.http.post(`${this.baseUrl}/upload`, formData);
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
