import { MessageResponse } from 'src/app/core/models/message-response.ts';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs';
import { UserDetail } from 'src/app/core/models/user-detail';
import { CommonService } from 'src/app/shared/common.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FileResponse } from 'src/app/core/models/file-response.model';
import { HeaderComponent } from '../../header/header.component';
import { Friend } from 'src/app/core/models/friends.model';

@Component({
  selector: 'app-header-timeline',
  templateUrl: './header-timeline.component.html',
  styleUrls: ['./header-timeline.component.css']
})
export class HeaderTimelineComponent implements OnInit {
  private baseUrl:string;
  private headers:any;
  id:string;
  user:UserDetail;
  checkUser:boolean;
  messageResponse:MessageResponse;
  selectedFile: File;
  cover_image:FileResponse;
  avatar_image:FileResponse;
  body:any;
  countFollower:number=0;
  countFriend:number=0;
  myFriends:Number[];
  myRequestFriendsByMy:Number[];
  myRequestFriendsToMy:Number[];
  friendId:number;
  constructor(private router:Router,private snackBar: MatSnackBar,private route: ActivatedRoute,private http:HttpClient,private commonService:CommonService) {
    this.baseUrl = this.commonService.webApiUrl;
    this.headers = this.commonService.createHeadersOption(localStorage.getItem('token'));
    this.getAllFriend();
    this.getAllRequestFriendByMy();
    this.getAllRequestFriendToMy();
  }
  ngOnInit(): void {
    this.route.paramMap.subscribe((params)=>{
      this.id=params.get('id');
      this.friendId=Number.parseInt(params.get('id'));
      console.log( this.friendId);
      this.getQuantityFollower();
      this.getQuantityFriend();
      this.getUserInfo();
      if(this.id === localStorage.getItem('userId'))
      {
        this.checkUser = true;
      }
      else{
        this.checkUser = false;
      }
    })
  }
  getAllFriend() {
    this.http.get(`${this.baseUrl}/friends/myfriend`, {
      headers: this.headers
    }).pipe(first())
    .subscribe(
      (datas)=>{
        this.myFriends=datas as number[];
        console.log( this.myFriends);
      },
      (error)=>{
        console.log(error);
      }
    )
  }
  getAllRequestFriendByMy()
  {
    this.http.get(`${this.baseUrl}/friendrequest/friendRequestByMe/${localStorage.getItem('userId')}`, {
      headers: this.headers
    }).pipe(first())
    .subscribe(
      (datas)=>{
        this.myRequestFriendsByMy=datas as number[];
        console.log( this.myRequestFriendsByMy);
      },
      (error)=>{
        console.log(error);
      }
    )
  }
  getAllRequestFriendToMy()
  {
    this.http.get(`${this.baseUrl}/friendrequest/friendRequestToMe/${localStorage.getItem('userId')}`, {
      headers: this.headers
    }).pipe(first())
    .subscribe(
      (datas)=>{
        this.myRequestFriendsToMy=datas as number[];
        this.getAllRequestFriendByMy();
        console.log( this.myRequestFriendsToMy);
      },
      (error)=>{
        console.log(error);
      }
    )
  }
  async getUserInfo(): Promise<any>{
    this.id = this.route.snapshot.paramMap.get('id');
    await this.http.get(`${this.baseUrl}/user/id/${this.id}`,{headers:this.headers})
    .pipe(first())
    .subscribe(
      (data)=>{
        this.user=data as UserDetail;
      },
      (error)=>{
        console.log(error)
      }
    )
  }
  getQuantityFollower(){
    this.http.get(`${this.baseUrl}/follow/follower/count/${this.id}`, {
      headers: this.headers
    }).pipe(first())
    .subscribe(
      (data)=>{
        this.countFollower = data as number;
      },
      error=>console.log(error)
    )
  }
  getQuantityFriend(){
    this.http.get(`${this.baseUrl}/friends/count/${this.id}`, {
      headers: this.headers
    }).pipe(first())
    .subscribe(
      (datas)=>{
        this.countFriend = datas as number;
      },
      error=>console.log(error)
    )
  }
  addFriend(){
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    })
    return this.http.post(`${this.baseUrl}/friendrequest/add/${this.id}`,'',{
      headers: headers
    }).pipe(first())
    .subscribe(
    (message)=>{
      this.messageResponse=message;
      this.showSnackbarSucsess(this.messageResponse.message,'','1000');
      this.getAllFriend();
      this.getAllRequestFriendByMy();
      this.getAllRequestFriendToMy();
    },
    (error:HttpErrorResponse)=>{
      this.messageResponse=error.error;
      this.showSnackbarError(this.messageResponse.message,'','1000');
    })
  }
  confirmReqest(){
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    })
    return this.http.post(`${this.baseUrl}/friendrequest/add/${this.id}`,'',{
      headers: headers
    }).pipe(first())
    .subscribe(
    (message)=>{
      this.messageResponse=message;
      this.showSnackbarSucsess(this.messageResponse.message,'',1000);
      this.getQuantityFriend();
      this.getAllFriend();
      this.getAllRequestFriendByMy();
      this.getAllRequestFriendToMy();
    },
    (error:HttpErrorResponse)=>{
      this.messageResponse=error.error;
      this.showSnackbarError(this.messageResponse.message,'',1000);
    })
  }
  selectFileAvatar(event){
    this.selectedFile=event.target.files[0];
    this.upload(this.selectedFile)
    .pipe(first())
    .subscribe(
      (response)=>{
        this.avatar_image = response[0] as FileResponse;
        this.body = {
          avatar_image: this.avatar_image.id
        };
        this.updateAvatarImage(this.body);
      },
      (error)=>{
        this.showSnackbarError("Tải ảnh lên thất bại!","",1000);
      }
    )

  }
  upload(file: File) {
    let formData = new FormData();
    formData.append('files', this.selectedFile);
    return this.http.post(`${this.baseUrl}/upload`, formData);
  }
  selectFileCover(event){
    this.selectedFile=event.target.files[0];
    this.upload(this.selectedFile)
    .pipe(first())
    .subscribe(
      (response)=>{
        this.cover_image = response[0] as FileResponse;
        this.body = {
          cover_image: this.cover_image.id
        };
        this.updateCoverImage(this.body);
      },
      (error)=>{
        this.showSnackbarError("Tải ảnh lên thất bại!","",1000);
      }
    )
  }
  updateCoverImage(body:any){
    this.http
    .post(`${this.baseUrl}/user/update`, body, {
      headers: this.headers,
    })
    .pipe(first())
    .subscribe(
      (response) => {
        this.getUserInfo();
        this.showSnackbarSucsess("Thay đổi ảnh bìa thành công!","",1000);
      },
      (error) => {
        this.showSnackbarError('Thay đổi ảnh bìa thất bại!','',1000);
      }
    );
  }
  updateAvatarImage(body:any){
    this.http
    .post(`${this.baseUrl}/user/update`, body, {
      headers: this.headers,
    })
    .pipe(first())
    .subscribe(
      (response) => {
        this.getUserInfo();
        this.showSnackbarSucsess("Thay đổi ảnh đại diện thành công!","",1000);
      },
      (error) => {
        this.showSnackbarError('Thay đổi ảnh đại diện thất bại!!','',1000);
      }
    );
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
  unfriend(userId:any){
    const headers = new HttpHeaders({
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        })
        return this.http.post(`${this.baseUrl}/friends/remove/${userId}`,'',{
          headers: headers
        }).pipe(first())
        .subscribe(
        (message)=>{
          this.messageResponse=message;
          this.showSnackbarSucsess(this.messageResponse.message,'',1000);
          this.getQuantityFriend();
          this.getAllFriend();
          this.getAllRequestFriendByMy();
          this.getAllRequestFriendToMy();
        },
        (error:HttpErrorResponse)=>{
          this.messageResponse=error.error;
          this.showSnackbarError(this.messageResponse.message,'',1000);
        })
  }
  unfriendrequest(userId:any)
  {
    this.http.post(`${this.baseUrl}/friendrequest/remove/${userId}`,'',{headers:this.headers})
    .pipe(first())
    .subscribe(
      (datas)=>{
        this.showSnackbarSucsess(this.messageResponse.message,'',1000);
        this.getAllFriend();
        this.getAllRequestFriendByMy();
        this.getAllRequestFriendToMy();
      },
      (error:HttpErrorResponse)=>{
        this.messageResponse=error.error;
        this.showSnackbarError(this.messageResponse.message,'',1000);
      })
  }
}
