import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { first } from 'rxjs';
import { CommentResponse } from 'src/app/core/models/comment.model';
import { CommonService } from 'src/app/shared/common.service';
import { EditCommentComponent } from 'src/app/shared/components/edit-comment/edit-comment.component';

@Component({
  selector: 'app-comment-post-news',
  templateUrl: './comment-post-news.component.html',
  styleUrls: ['./comment-post-news.component.css']
})
export class CommentPostNewsComponent implements OnInit, OnChanges {
  @Output() updateComment = new EventEmitter<string>();
  @Input() comment: CommentResponse;
  @Input() auth_post:string;
  private baseUrl:string;
  private headers:any;
  page: any;
  myid:string;
   constructor(private dialog:MatDialog,private http:HttpClient,private commonService:CommonService) {
     this.baseUrl=this.commonService.webApiUrl;
     this.headers=this.commonService.createHeadersOption(localStorage.getItem('userId'));
   }
   ngOnInit(): void {
    this.myid=localStorage.getItem('userId');
   }
   ngOnChanges(changes: SimpleChanges) {
     this.comment=changes['comment'].currentValue;
   }
   opendetailcomment(){
    const dialogRef=this.dialog.open(EditCommentComponent,{
      hasBackdrop:false,
      panelClass: 'warning-dialog',
      autoFocus: false,
      width:"500px",
      data:{
        comment:this.comment
      }
    });
    dialogRef.afterClosed().subscribe((datas)=>
    {
      this.updateComment.emit(datas);
    }
    );
   }
}
