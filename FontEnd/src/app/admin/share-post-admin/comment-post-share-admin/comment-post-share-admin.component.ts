import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { CommentResponse } from 'src/app/core/models/comment.model';
import { CommonService } from 'src/app/shared/common.service';

@Component({
  selector: 'app-comment-post-share-admin',
  templateUrl: './comment-post-share-admin.component.html',
  styleUrls: ['./comment-post-share-admin.component.css']
})
export class CommentPostShareAdminComponent implements OnInit {

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
