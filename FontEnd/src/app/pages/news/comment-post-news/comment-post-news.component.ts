import { HttpClient } from '@angular/common/http';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { CommentResponse } from 'src/app/core/models/comment.model';
import { CommonService } from 'src/app/shared/common.service';

@Component({
  selector: 'app-comment-post-news',
  templateUrl: './comment-post-news.component.html',
  styleUrls: ['./comment-post-news.component.css']
})
export class CommentPostNewsComponent implements OnInit, OnChanges {
  @Input() comment: CommentResponse;
  private baseUrl:string;
  private headers:any;
  page: any;
   constructor(private http:HttpClient,private commonService:CommonService) {
     this.baseUrl=this.commonService.webApiUrl;
     this.headers=this.commonService.createHeadersOption(localStorage.getItem('userId'));
   }
   ngOnInit(): void {

   }
   ngOnChanges(changes: SimpleChanges) {
     this.comment=changes['comment'].currentValue;
   }
}
