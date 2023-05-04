import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CommentList, CommentResponse, CommentUpdate } from 'src/app/core/models/comment.model';
import { CommonService } from '../../common.service';
import { first } from 'rxjs';

@Component({
  selector: 'app-edit-comment',
  templateUrl: './edit-comment.component.html',
  styleUrls: ['./edit-comment.component.css']
})
export class EditCommentComponent implements OnInit {
  private baseUrl:string;
  private headers:any;
  commentDetail:CommentResponse;
  commentUpdate:any;
  content:string;
  constructor(
    private http:HttpClient,private commonService:CommonService,
    private dialogRef:MatDialogRef<EditCommentComponent>,@Inject(MAT_DIALOG_DATA)data) {
      this.baseUrl=this.commonService.webApiUrl;
      this.headers=this.commonService.createHeadersOption(localStorage.getItem('token'));
      this.commentDetail=data.comment;
    this.content=this.commentDetail.content;
  }
  ngOnInit(): void {
    console.log(this.commentDetail);
  }
  update(){
    this.commentUpdate={
    id:this.commentDetail.id,
    content:this.content,
    image_id:this.commentDetail.image_id
    }
    this.http.post(`${this.baseUrl}/comment/update`,this.commentUpdate,{headers:this.headers})
    .pipe(first())
    .subscribe(
      (datas)=>{
        console.log("oke");
        this.dialogRef.close("update");
      },
      (error)=>{
        console.log(error);
      }
    )
  }
  deletecomment(){
    this.http.post(`${this.baseUrl}/comment/delete/${this.commentDetail.id}`,'',{headers:this.headers})
    .pipe(first())
    .subscribe(
      (datas)=>{
        console.log("oke");
        this.dialogRef.close("delete");
      },
      (error)=>{
        console.log(error);
      }
    )
  }
  close(){
    this.dialogRef.close();
  }
}
