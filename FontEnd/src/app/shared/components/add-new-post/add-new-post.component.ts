import { Component, Inject, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { FileResponse } from 'src/app/core/models/file-response.model';
import { Post, PostResponse } from 'src/app/core/models/post.model.ts';
import { UserDetail } from 'src/app/core/models/user-detail';
import { SlideInterface } from 'src/app/core/types/slide.interface';
import { CommonService } from '../../common.service';
import { HttpClient } from '@angular/common/http';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { EditPostDialogComponent } from '../edit-post-dialog/edit-post-dialog.component';
import { first } from 'rxjs';
import { PrivacyDialogComponent } from '../privacy-dialog/privacy-dialog.component';

@Component({
  selector: 'app-add-new-post',
  templateUrl: './add-new-post.component.html',
  styleUrls: ['./add-new-post.component.css'],
})
export class AddNewPostComponent implements OnInit {
  private baseUrl: string;
  private headers: any;
  post: PostResponse;
  content: string;
  selectedFiles: FileList;
  slides: SlideInterface[] = [];
  postId: any;
  user: UserDetail;
  privacy: number;
  postUpdate: Post;
  images: FileResponse[];
  imagesList: any[];
  imagesid: any = [];
  body: any;
  uploadCheck: boolean = false;
  constructor(
    private snackBar: MatSnackBar,
    private router: Router,
    private commonService: CommonService,
    private http: HttpClient,
    private dialogRef: MatDialogRef<AddNewPostComponent>,
    @Inject(MAT_DIALOG_DATA) data,
    private dialog: MatDialog
  ) {
    this.baseUrl = this.commonService.webApiUrl;
    this.headers = this.commonService.createHeadersOption(
      localStorage.getItem('token')
    );
  }

  ngOnInit(): void {
    this.getUserInfo();
  }
  getUserInfo() {
    return this.http
      .get(`${this.baseUrl}/user/id/${localStorage.getItem('userId')}`, {
        headers: this.headers,
      })
      .pipe(first())
      .subscribe(
        (data) => {
          this.user = data as UserDetail;
        },
        (error) => {
          console.log(error);
        }
      );
  }
  onConfirmClick() {
    if (!this.privacy) {
      this.showSnackbarError('Bạn chưa chọn quyền cho bài viết', '', 1000);
    } else {
      if (this.selectedFiles) {
        this.showSnackbarSucsess('Đang cập nhật lại bài viết', '', 1000);
        for (let i = 0; i < this.images.length; i++) {
          this.imagesid.push(this.images[i].id);
        }
        this.body = {
          content: this.content,
          privacy: this.privacy,
          images: this.imagesid,
        };
        this.sendPost(this.body);
      } else {
        var body = {
          content: this.content,
          privacy: this.privacy,
          images: [],
        };
        this.sendPost(body);
      }
    }
  }
  clearImage(){
    this.images=[];
    this.slides=[];
    this.uploadCheck = false;
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
  sendPost(body: any) {
    this.http
      .post(`${this.baseUrl}/post`, body, {
        headers: this.commonService.createHeadersOption(
          localStorage.getItem('token')
        ),
      })
      .pipe(first())
      .subscribe(
        (response) => {
          this.showSnackbarSucsess('Thêm bài viết mới thành công!', '', 1000);
          this.dialogRef.close();
        },
        (error) => {
          this.showSnackbarError('Thêm bài viết mới thất bại!', '', 1000);
        }
      );
  }
  selectFiles(event) {
    this.selectedFiles = event.target.files;
    this.upload(this.selectedFiles)
      .pipe(first())
      .subscribe(
        (response) => {
          this.uploadCheck = true;
          this.showSnackbarSucsess('Upload ảnh lên thành công!', '', 1000);
          this.images = response as FileResponse[];
          this.imagesList = response as [];
          this.slides = this.imagesList;
        },
        (error) => {
          this.showSnackbarError('Upload ảnh lên thất bại!', '', 1000);
          console.log(error);
        }
      );
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
      verticalPosition: 'top', // Allowed values are  'top' | 'bottom'
      horizontalPosition: 'center', // Allowed values are 'start' | 'center' | 'end' | 'left' | 'right'
      panelClass: ['custom-style'],
    });
  }
  showSnackbarError(content, action, duration) {
    this.snackBar.open(content, action, {
      duration: 5000,
      verticalPosition: 'top', // Allowed values are  'top' | 'bottom'
      horizontalPosition: 'center', // Allowed values are 'start' | 'center' | 'end' | 'left' | 'right'
      panelClass: ['error-custom-style'],
    });
  }
}
