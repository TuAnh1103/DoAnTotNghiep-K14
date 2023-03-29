import { PostResponse, PostResponseList } from './../../../../core/models/post.model.ts';
import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SlideInterface } from 'src/app/core/types/slide.interface';
import { CommonService } from 'src/app/shared/common.service';
import { first } from 'rxjs';

@Component({
  selector: 'app-user-post',
  templateUrl: './user-post.component.html',
  styleUrls: ['./user-post.component.css'],
})
export class UserPostComponent implements OnInit,OnChanges  {
  @Input() post: PostResponse;
  private baseUrl:string;
  private headers:any;
  id:string;
  page: any;
  data:any;
  slides: SlideInterface[];
  postId:number;
  constructor(private route:ActivatedRoute,private http:HttpClient,private commonService:CommonService) {
    this.baseUrl=this.commonService.webApiUrl;
    this.headers=this.commonService.createHeadersOption(localStorage.getItem("token"));

  }
  ngOnInit(): void {
    this.route.paramMap.subscribe((params)=>{
      this.id = params.get('id');
    })
    this.slides=this.post.images;
    this.postId=this.post.id;
  }
  ngOnChanges(changes: SimpleChanges) {
    this.post=changes['post'].currentValue;
  }
}
