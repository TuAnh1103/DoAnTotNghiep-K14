import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { first } from 'rxjs';
import { PostResponse, sharePost } from 'src/app/core/models/post.model.ts';
import { CommonService } from 'src/app/shared/common.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {
  private baseUrl: string;
  private headers: any;
  id: string;
  page: any;
  data: any;
  postList: PostResponse[];
  posts: PostResponse[];
  postShareList: sharePost[];
  size: number = 0;
  index:number=0;
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
      this.getAllPostNewsFeed()
        .pipe(first())
        .subscribe(
          (datas) => {
            this.data = datas;
            this.postList = this.data.content;
            this.size = this.page.size;
            this.index=this.page.index;
          },
          (error) => console.log(error)
        );
  }
  getAllPostNewsFeed() {
    this.page = {
      index: 0,
      size: 5,
    };
    return this.http.post(`${this.baseUrl}/post/newsfeed`, this.page, {
      headers: this.headers,
    });
  }
  updateNewfeed(event:any)
  {
    this.getAllPostNewsFeed()
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
  loadAdd() {
    this.index=this.page.index+1;
    this.size = this.page.size;
    this.page = {
      index: this.index,
      size: this.size,
    };
    this.http
      .post(`${this.baseUrl}/post/newsfeed`, this.page, {
        headers: this.headers,
      })
      .pipe(first())
      .subscribe(
        (datas) => {
          this.data = datas;
          this.posts=this.data.content;
          for(var i = 0; i < this.posts.length ; i++){
            this.postList.push(this.posts[i]);
        }
          console.log(this.postList);
        },
        (error) => console.log(error)
      );
  }
}
