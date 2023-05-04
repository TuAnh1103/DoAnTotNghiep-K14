import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { first } from 'rxjs';
import { Following, Followings } from 'src/app/core/models/followings.model';
import { MessageResponse } from 'src/app/core/models/message-response.ts';
import { CommonService } from 'src/app/shared/common.service';

@Component({
  selector: 'app-following-detail',
  templateUrl: './following-detail.component.html',
  styleUrls: ['./following-detail.component.css']
})
export class FollowingDetailComponent implements OnInit {

  private baseUrl: string;
  private headers: any;
  listFollowing: Following[];
  followings:Following[];
  page: any;
  data:Followings;
  messageResponse:MessageResponse;
  id:string;
  checkUser:boolean;
  myId:string;
  size:number=0;
  index:number=0;
  count:number=0;
  myFriends:Number[];
  myRequestFriendsByMy:Number[];
  myRequestFriendsToMy:Number[];
  myFollowing:Number[];
  constructor(private snackBar: MatSnackBar,private route: ActivatedRoute,private http:HttpClient,private commonService:CommonService) {
    this.baseUrl = this.commonService.webApiUrl;
    this.headers = this.commonService.createHeadersOption(
      localStorage.getItem('token')
    );
    this.myId=localStorage.getItem('userId');
    this.getAllMyFriend();
    this.getAllRequestFriendByMy();
    this.getAllRequestFriendToMy();
    this.getAllFollowingId();
    }
  ngOnInit(): void {
    this.route.paramMap.subscribe((params)=>{
      this.id = params.get('id');
      this.getQuantityFollowing();
      this.getAllFollowing()
      .pipe(first())
      .subscribe(
        (datas)=>{
          this.data=datas as Followings;
          this.listFollowing=this.data.content;
          this.size=this.page.size;
        },
        (error)=>{
          console.log(error);
        }
      )
      if(this.id === localStorage.getItem('userId'))
      {
        this.checkUser = true;
      }
      else{
        this.checkUser = false;
      }
    })
  }
  getAllFollowing() {
    this.page={
      index:0,
      size:5
    };
    return this.http.post(`${this.baseUrl}/follow/following/${this.id}`, this.page, {
      headers: this.headers
    });
  }
  loadAdd(){
    this.size=this.page.size;
    this.index=this.page.index+1;
    this.page={
      index:this.index,
      size:this.size
    }
    this.http.post(`${this.baseUrl}/follow/following/${this.id}`, this.page, {
      headers: this.headers
    }).pipe(first())
    .subscribe(
      (datas)=>{
        this.data=datas as Followings;
        this.followings=this.data.content;
        for(var i = 0; i < this.followings.length ; i++){
          this.listFollowing.push(this.followings[i]);
      }
      },
      error=>console.log(error)
    )
  }
  getQuantityFollowing(){
    this.http.get(`${this.baseUrl}/follow/following/count/${this.id}`, {
      headers: this.headers
    }).pipe(first())
    .subscribe(
      (data)=>{
        this.count = data as number;
      },
      error=>console.log(error)
    )
  }
  unfollow(userId:any){
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    })
    return this.http.post(`${this.baseUrl}/follow/remove/${userId}`,'',{
      headers: headers
    }).pipe(first())
    .subscribe(
    (message)=>{
      this.messageResponse=message;
      this.showSnackbarSucsess(this.messageResponse.message,'','2000');
      this.getQuantityFollowing();
      this.getAllFollowingId();
      this.getAllFollowing()
      .pipe(first())
      .subscribe(
        (datas)=>{
          this.data=datas as Followings;
          this.listFollowing=this.data.content;
        },
        (error)=>{
          console.log(error);
        }
      )
    },
    (error:HttpErrorResponse)=>{
      this.messageResponse=error.error;
      console.log(error);
      this.showSnackbarError(this.messageResponse.message,'','2000');
    })
  }
  follow(userId:any){
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    })
    return this.http.post(`${this.baseUrl}/follow/add/${userId}`,'',{
      headers: headers
    }).pipe(first())
    .subscribe(
    (message)=>{
      this.messageResponse=message;
      this.showSnackbarSucsess(this.messageResponse.message,'','2000');
      this.getAllFollowingId();
      this.getQuantityFollowing();
    },
    (error:HttpErrorResponse)=>{
      this.messageResponse=error.error;
      console.log(error);
      this.showSnackbarError(this.messageResponse.message,'','2000');
    })
  }
  addFriend(userId:any){
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    })
    return this.http.post(`${this.baseUrl}/friendrequest/add/${userId}`,'',{
      headers: headers
    }).pipe(first())
    .subscribe(
    (message)=>{
      this.messageResponse=message;
      this.showSnackbarSucsess(this.messageResponse.message,'',1000);
      this.getAllFollowingId();
      this.getAllMyFriend();
      this.getAllRequestFriendByMy();
      this.getAllRequestFriendToMy();
    },
    (error:HttpErrorResponse)=>{
      this.messageResponse=error.error;
      this.showSnackbarError(this.messageResponse.message,'',1000);
    })
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
  getAllMyFriend() {
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
  confirmReqest(userid:any){
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    })
    return this.http.post(`${this.baseUrl}/friendrequest/add/${userid}`,'',{
      headers: headers
    }).pipe(first())
    .subscribe(
    (message)=>{
      this.messageResponse=message;
      this.showSnackbarSucsess(this.messageResponse.message,'',1000);
      this.getAllMyFriend();
      this.getAllRequestFriendByMy();
      this.getAllRequestFriendToMy();
    },
    (error:HttpErrorResponse)=>{
      this.messageResponse=error.error;
      this.showSnackbarError(this.messageResponse.message,'',1000);
    })
  }
  getAllFollowingId(){
    this.http.get(`${this.baseUrl}/follow/following/id`, {
      headers: this.headers
    }).pipe(first())
    .subscribe(
      (datas)=>{
        this.myFollowing=datas as number[];
        console.log(this.myFollowing);
      },
      (error)=>{
        console.log(error);
      }
    )
  }
}
