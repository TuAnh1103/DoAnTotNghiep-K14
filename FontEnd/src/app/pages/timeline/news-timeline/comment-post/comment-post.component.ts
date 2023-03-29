import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { CommonService } from 'src/app/shared/common.service';

@Component({
  selector: 'app-comment-post',
  templateUrl: './comment-post.component.html',
  styleUrls: ['./comment-post.component.css']
})
export class CommentPostComponent implements OnInit {
 @Input() postId: number;
 private baseUrl:string;
 private headers:any;
 page: any;
  constructor(private http:HttpClient,private commonService:CommonService) {
    this.baseUrl=commonService.webApiUrl;
    this.headers=commonService.createHeadersOption(localStorage.getItem('userId'));
  }

  ngOnInit(): void {
    
  }
  getAllCommentByPostId(){
    this.page={
      index:0,
      size:5
    };
    return this.http.post(`${this.baseUrl}/comment/all/${this.postId}`, this.page, {
      headers: this.headers
    });
  }
}
