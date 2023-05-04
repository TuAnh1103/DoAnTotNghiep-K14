import { CommentResponse } from './../../../../core/models/comment.model';
import { HttpClient } from '@angular/common/http';
import { Component, Input, OnChanges, OnInit, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CommonService } from 'src/app/shared/common.service';
import { EditCommentComponent } from 'src/app/shared/components/edit-comment/edit-comment.component';

@Component({
  selector: 'app-comment-post',
  templateUrl: './comment-post.component.html',
  styleUrls: ['./comment-post.component.css']
})
export class CommentPostComponent implements OnInit,OnChanges {
 @Output() updateComment = new EventEmitter<string>();
 @Input() comment: CommentResponse;
 private baseUrl:string;
 private headers:any;
 myid:string;
 page: any;
  constructor(
    private dialog:MatDialog,
    private http:HttpClient,private commonService:CommonService) {
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
