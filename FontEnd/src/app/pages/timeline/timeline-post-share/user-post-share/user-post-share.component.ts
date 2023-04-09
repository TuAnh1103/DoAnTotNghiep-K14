import { first } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit, Input, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import {
  CommentList,
  CommentResponse,
} from 'src/app/core/models/comment.model';
import { PostResponse, sharePost } from 'src/app/core/models/post.model.ts';
import { UserDetail } from 'src/app/core/models/user-detail';
import { SlideInterface } from 'src/app/core/types/slide.interface';
import { CommonService } from 'src/app/shared/common.service';
import { ShareDialogComponent } from 'src/app/shared/components/share-dialog/share-dialog.component';
import { ConfirmDialogComponent } from 'src/app/shared/components/confirm-dialog/confirm-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EditPostShareComponent } from 'src/app/shared/components/edit-post-share/edit-post-share.component';

@Component({
  selector: 'app-user-post-share',
  templateUrl: './user-post-share.component.html',
  styleUrls: ['./user-post-share.component.css'],
})
export class UserPostShareComponent implements OnInit {
  @Input() postshare: sharePost;
  @Output() updatePostShareEvent = new EventEmitter<string>();
  private baseUrl: string;
  private headers: any;
  form: FormGroup;
  id: string;
  content: string;
  page: any;
  data: any;
  slides: SlideInterface[];
  postId: number;
  commentList: CommentResponse[];
  commentData: any;
  user: UserDetail;
  open: boolean;
  liked: boolean;
  checked: boolean;
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private http: HttpClient,
    private commonService: CommonService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private router: Router
  ) {
    this.baseUrl = this.commonService.webApiUrl;
    this.headers = this.commonService.createHeadersOption(
      localStorage.getItem('token')
    );
    this.form = this.fb.group({
      content: ['', Validators.required],
      imageId: [null],
    });
  }
  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.id = params.get('id');
      this.slides = this.postshare.author_post.images;
      this.postId = this.postshare.author_post.id;
      this.open = false;
      console.log(this.postshare);
      this.liked = this.postshare.author_post.liked;
      this.checked = localStorage.getItem('userId') == this.id ? true : false;
      this.getAllCommentByPostId()
        .pipe(first())
        .subscribe(
          (datas) => {
            this.commentData = datas as CommentList;
            this.commentList = this.commentData.content;
          },
          (error) => {
            console.log(error);
          }
        );
      this.getUserByUserId();
    });
  }
  ngOnChanges(changes: SimpleChanges) {
    this.postshare = changes['post'].currentValue;
  }
  getAllCommentByPostId() {
    this.page = {
      index: 0,
      size: 5,
    };
    return this.http.post(
      `${this.baseUrl}/comment/all/${this.postId}`,
      this.page,
      {
        headers: this.headers,
      }
    );
  }
  openComment() {
    this.open = this.open ? false : true;
  }
  commentPost() {
    this.http
      .post(
        `${this.baseUrl}/comment/${this.postshare.author_post.id}`,
        this.form.value,
        {
          headers: this.headers,
        }
      )
      .pipe(first())
      .subscribe(
        (datas) => {
          this.form.reset();
          this.getAllCommentByPostId()
            .pipe(first())
            .subscribe(
              (datas) => {
                this.commentData = datas as CommentList;
                this.commentList = this.commentData.content;
                this.postshare.author_post.cmt_count += 1;
                this.open = true;
              },
              (error) => {
                console.log(error);
              }
            );
        },
        (error) => {
          console.log(error);
        }
      );
  }
  getUserByUserId() {
    this.http
      .get(`${this.baseUrl}/user/id/${localStorage.getItem('userId')}`, {
        headers: this.headers,
      })
      .pipe(first())
      .subscribe(
        (data) => {
          this.user = data as UserDetail;
        },
        (error) => {
          console.log(error);
        }
      );
  }
  likePost() {
    this.http
      .post(`${this.baseUrl}/like/${this.postshare.author_post.id}`, '', {
        headers: this.headers,
      })
      .pipe(first())
      .subscribe(
        (data) => {
          this.liked = this.liked ? false : true;
          if (this.liked) {
            this.postshare.author_post.like_count += 1;
          } else {
            this.postshare.author_post.like_count -= 1;
          }
        },
        (error) => {
          console.log(error);
        }
      );
  }
  sharePost() {
    this.openDialogShare();
  }
  openDialogShare() {
    const dialogRef = this.dialog.open(ShareDialogComponent, {
      hasBackdrop:false,
      width: '700px',
      data: {
        post: this.postshare.author_post,
        userCurrent: this.user,
      },
    });
  }
  editPost(id:number){
    const dialogRef = this.dialog.open(EditPostShareComponent, {
      hasBackdrop:false,
      width: '700px',
      data: {
        id:this.postshare.id,
        content:this.postshare.content,
        post: this.postshare.author_post,
        userCurrent: this.user,
      },
    });
    dialogRef.afterClosed().subscribe(() => {
        this.updatePostShareEvent.emit("load");
    });
  }
  deletePost(id:number){

    const dialogRef = this.dialog.open(ConfirmDialogComponent,{
      hasBackdrop:false,
      data:{
        message: 'Bạn có muốn tiếp túc xóa không?',
        buttonText: {
          ok: 'Có',
          cancel: 'Không'
        }
      }
    });

    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.http.post(`${this.baseUrl}/share/delete/${id}`,'',{headers:this.headers})
        .pipe(first())
        .subscribe(
          (data)=>{
            this.showSnackbarSucsess("Xóa bài viết chia sẻ thành công!","",1000);
            this.updatePostShareEvent.emit("load");
          },
          (error)=>{
            this.showSnackbarError("Xóa bài viết chia sẻ không thành công!","",1000);
            console.log(error)
          }
        )
      }
    });
  }
  showSnackbarSucsess(content, action, duration) {
    this.snackBar.open(content, action, {
      duration: 5000,
      verticalPosition: "top", // Allowed values are  'top' | 'bottom'
      horizontalPosition: "center",// Allowed values are 'start' | 'center' | 'end' | 'left' | 'right'
      panelClass: ["custom-style"]
  })}
  showSnackbarError(content, action, duration) {
    this.snackBar.open(content, action, {
      duration: 5000,
      verticalPosition: "top", // Allowed values are  'top' | 'bottom'
      horizontalPosition: "center",// Allowed values are 'start' | 'center' | 'end' | 'left' | 'right'
      panelClass: ["error-custom-style"]
  })}
}
