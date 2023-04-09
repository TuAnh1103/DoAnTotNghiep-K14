import { Post } from './../../../core/models/post.model.ts';
import { FileResponse } from './../../../core/models/file-response.model';
import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/shared/common.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { first, Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-center-meta',
  templateUrl: './center-meta.component.html',
  styleUrls: ['./center-meta.component.css'],
})
export class CenterMetaComponent implements OnInit {
  form: FormGroup;
  content: string;
  selectedFiles: FileList;
  message = '';
  baseUrl = '';
  images: FileResponse[];
  imagesid: any = [];
  body: any;
  privacy:number;
  constructor(
    private fb: FormBuilder,
    private commonService: CommonService,
    private http: HttpClient,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.form = this.fb.group({
      content: ['', Validators.required],
      privacy: ['', Validators.required],
    });
    this.baseUrl = this.commonService.webApiUrl;
  }

  ngOnInit(): void {}

  onSubmit() {
    this.message = '';
    if(this.selectedFiles)
    {
      this.showSnackbarSucsess("Tải ảnh lên thành công!","",1000);
      this.upload(this.selectedFiles)
      .pipe(first())
      .subscribe(
        (response) => {
          this.images = response as FileResponse[];
          for (let i = 0; i < this.images.length; i++) {
            this.imagesid.push(this.images[i].id);
          }
          this.body = {
            content: this.content,
            privacy: this.form.get('privacy').value,
            images: this.imagesid,
          };
          this.sendPost(this.body);
        },
        (error) => {
          console.log(error);
          this.showSnackbarError("Có lỗi trong quá trình tải ảnh!","",1000);
        }
      );
    }
    else{
      this.body = {
        content: this.content,
        privacy: this.form.get('privacy').value,
        images:[]
      };
      this.sendPost(this.body);
    }
  }
  sendPost(body:any)
  {
    this.showSnackbarSucsess("Đăng tải!","",1000);
    this.http
    .post(`${this.baseUrl}/post`,body, {
      headers: this.commonService.createHeadersOption(
        localStorage.getItem('token')
      ),
    })
    .pipe(first())
    .subscribe(
      (response) => {
        this.showSnackbarSucsess("Đăng bài viết mới thành công!","",1000);
        this.clear();
      },
      (error) => {
        this.showSnackbarError("Đăng bài viết mới thất bại!","",1000);
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
  clear()
  {
    this.form.get("content").reset();
    this.form.get("privacy").reset();
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
