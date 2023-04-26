import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs';
import { PostResponse, sharePost } from 'src/app/core/models/post.model.ts';
import { SlideInterface } from 'src/app/core/types/slide.interface';
import { CommonService } from 'src/app/shared/common.service';

@Component({
  selector: 'app-news-timeline',
  templateUrl: './news-timeline.component.html',
  styleUrls: ['./news-timeline.component.css'],
})
export class NewsTimelineComponent implements OnInit {
  private baseUrl: string;
  private headers: any;
  id: string;
  page: any;
  data: any;
  postList: PostResponse[];
  postShareList: sharePost[];
  size: number = 0;
  index:number=0;
  posts:PostResponse[];
  constructor(
    private route: ActivatedRoute,
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
    this.route.paramMap.subscribe((params) => {
      this.id = params.get('id');
      this.getAllPost()
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
    });
  }
  getAllPost() {
    this.page = {
      index: 0,
      size: 5,
    };
    return this.http.post(`${this.baseUrl}/post/all/${this.id}`, this.page, {
      headers: this.headers,
    });
  }
  loadAdd() {
    this.size = this.page.size;
    this.index=this.page.index+1;
    this.page = {
      index: this.index,
      size: this.size,
    };
    this.http
      .post(`${this.baseUrl}/post/all/${this.id}`, this.page, {
        headers: this.headers,
      })
      .pipe(first())
      .subscribe(
        (datas) => {
          this.data = datas;
          this.posts= this.data.content;
          for(var i = 0; i < this.posts.length ; i++){
            this.postList.push(this.posts[i]);
        }
          console.log(this.postList);
        },
        (error) => console.log(error)
      );
  }
  updateNewfeed(event:any)
  {
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
  updatePost($event:any){
    this.getAllPost()
        .pipe(first())
        .subscribe(
          (datas) => {
            this.data = datas;
            this.postList = this.data.content;
            this.size = this.page.size;
            this.router.navigate(['/timeline', this.id]);
          },
          (error) => console.log(error)
    );
}
}
