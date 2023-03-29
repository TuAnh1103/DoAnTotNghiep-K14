import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { first } from 'rxjs';
import { PostResponse } from 'src/app/core/models/post.model.ts';
import { SlideInterface } from 'src/app/core/types/slide.interface';
import { CommonService } from 'src/app/shared/common.service';

@Component({
  selector: 'app-news-timeline',
  templateUrl: './news-timeline.component.html',
  styleUrls: ['./news-timeline.component.css']
})
export class NewsTimelineComponent implements OnInit {
  private baseUrl:string;
  private headers:any;
  id:string;
  page: any;
  data:any;
  postList:PostResponse[];
  constructor(private route:ActivatedRoute,private http:HttpClient,private commonService:CommonService) {
    this.baseUrl=this.commonService.webApiUrl;
    this.headers=this.commonService.createHeadersOption(localStorage.getItem("token"));
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params)=>{
      this.id = params.get('id');
      this.getAllPost().pipe(first())
      .subscribe(
        (datas)=>{
          this.data=datas;
          this.postList=this.data.content;
        }
      )
    })
  }
  getAllPost(){
    this.page={
      index:0,
      size:5
    };
    return this.http.post(`${this.baseUrl}/post/all/${this.id}`, this.page, {
      headers: this.headers
    });
  }

}
