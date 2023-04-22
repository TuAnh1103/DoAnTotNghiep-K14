import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { first } from 'rxjs';
import { PostResponse, sharePost } from 'src/app/core/models/post.model.ts';
import { CommonService } from 'src/app/shared/common.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {

  private baseUrl: string;
  private headers: any;
  id: string;
  page: any;
  data: any;
  postList: PostResponse[];
  postShareList: sharePost[];
  size: number = 0;
  constructor(
    private http: HttpClient,
    private commonService: CommonService,
    private router:Router
  ) {
    this.baseUrl = this.commonService.webApiUrl;
    this.headers = this.commonService.createHeadersOption(
      localStorage.getItem('token')
    );
  }

  ngOnInit(): void {
      this.getAllPost()
        .pipe(first())
        .subscribe(
          (datas) => {
            this.data = datas;
            this.postList = this.data.content;
            this.size = this.page.size;
          },
          (error) => console.log(error)
        );
  }
  getAllPost() {
    this.page = {
      index: 0,
      size: 5,
    };
    return this.http.post(`${this.baseUrl}/admin/post/getall`, this.page, {
      headers: this.headers,
    });
  }
  loadAdd() {
    this.size = this.page.size + 5;
    this.page = {
      index: 0,
      size: this.size,
    };
    this.http
      .post(`${this.baseUrl}/admin/post/getall`, this.page, {
        headers: this.headers,
      })
      .pipe(first())
      .subscribe(
        (datas) => {
          this.data = datas;
          this.postList = this.data.content;
        },
        (error) => console.log(error)
      );
  }
}
