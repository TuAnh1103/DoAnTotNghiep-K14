import { CommentResponse } from './../../../../core/models/comment.model';
import { HttpClient } from '@angular/common/http';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { CommonService } from 'src/app/shared/common.service';

@Component({
  selector: 'app-comment-post',
  templateUrl: './comment-post.component.html',
  styleUrls: ['./comment-post.component.css']
})
export class CommentPostComponent implements OnInit,OnChanges {
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
