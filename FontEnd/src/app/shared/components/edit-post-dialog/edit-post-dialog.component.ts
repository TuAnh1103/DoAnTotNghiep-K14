import { Component, Inject, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CommonService } from '../../common.service';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ShareDialogComponent } from '../share-dialog/share-dialog.component';
import { first } from 'rxjs';
import { Post, PostResponse } from 'src/app/core/models/post.model.ts';
import { SlideInterface } from 'src/app/core/types/slide.interface';
import { UserDetail } from 'src/app/core/models/user-detail';
import { FileResponse } from 'src/app/core/models/file-response.model';
import { PrivacyDialogComponent } from '../privacy-dialog/privacy-dialog.component';

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
  imagesList:any[];
  imagesid:any = [];
  constructor(
    private dialog: MatDialog,
    private snackBar: MatSnackBar,private router:Router,
    private commonService:CommonService,private http:HttpClient,
   private dialogRef:MatDialogRef<EditPostDialogComponent>,@Inject(MAT_DIALOG_DATA)data) {
      this.baseUrl=this.commonService.webApiUrl;
      this.headers=this.commonService.createHeadersOption(localStorage.getItem('token'));
      this.post=data.post;
      this.user = data.userCurrent;
      this.slides = this.post.images;
      this.postId = this.post.id;
      this.content=this.post.content;
      this.privacy=this.post.privacy;
      console.log(this.privacy);
     }

  ngOnInit(): void {
    this.slides = this.post.images;
  }
  onConfirmClick(){
    this.post.content=this.content;
    this.post.privacy=this.privacy;
    if(this.selectedFiles)
    {
      this.showSnackbarSucsess("Đang cập nhật lại bài viết","",1000);
      for (let i = 0; i < this.images.length; i++) {
            this.imagesid.push(this.images[i].id);
        }
        this.post.images=this.imagesid;
        this.sendPost(this.post);
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
clearImage(){
  this.images=[];
  this.slides=[];
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
    this.upload(this.selectedFiles)
    .pipe(first())
    .subscribe(
      (response) => {
        this.showSnackbarSucsess("Upload ảnh lên thành công!","",1000);
        this.images = response as FileResponse[];
        this.imagesList = response as [];
        this.slides=this.imagesList;
      },
      (error) => {
        this.showSnackbarError("Upload ảnh lên thất bại!","",1000);
        console.log(error);
      }
    )

  }
  upload(fileList: FileList) {
    let formData = new FormData();
    for (let i = 0; i < fileList.length; i++) {
      formData.append('files', fileList[i]);
    }
    return this.http.post(`${this.baseUrl}/upload`, formData);
  }
  openPrivacy() {
    const dialogRef = this.dialog.open(PrivacyDialogComponent, {
      autoFocus: false,
      hasBackdrop: false,
      width: '500px',
      data: {},
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.privacy = result;
      console.log(this.privacy);
    });
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
