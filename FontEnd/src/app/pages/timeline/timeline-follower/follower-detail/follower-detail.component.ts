import { MatSnackBar } from '@angular/material/snack-bar';
import { Component, OnInit } from '@angular/core';
import { Follower, Followers } from 'src/app/core/models/Followers.model';
import { MessageResponse } from 'src/app/core/models/message-response.ts';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { CommonService } from 'src/app/shared/common.service';
import { first } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-follower-detail',
  templateUrl: './follower-detail.component.html',
  styleUrls: ['./follower-detail.component.css']
})
export class FollowerDetailComponent implements OnInit {

  private baseUrl: string;
  private headers: any;
  id:string;
  listFollower: Follower[];
  followers: Follower[];
  page: any;
  data:Followers;
  messageResponse:MessageResponse;
  checkUser:boolean;
  myId:string;
  size:number=0;
  index:number=0;
  count:number=0;
  myFriends:Number[];
  myRequestFriendsByMy:Number[];
  myRequestFriendsToMy:Number[];
  myFollowing:Number[];
  constructor(private snackBar: MatSnackBar,private route: ActivatedRoute,private http: HttpClient, private commonService: CommonService) {
    this.baseUrl = this.commonService.webApiUrl;
    this.headers = this.commonService.createHeadersOption(
      localStorage.getItem('token')
    );
    this.myId=localStorage.getItem("userId");
    this.getAllMyFriend();
    this.getAllRequestFriendByMy();
    this.getAllRequestFriendToMy();
    this.getAllFollowing();
  }
  ngOnInit(): void {
    this.route.paramMap.subscribe((params)=>{
      this.id = params.get('id');
      this.getQuantityFollower();
      this.getAllFollower()
      .pipe(first())
      .subscribe(
        (datas)=>{
          this.data=datas as Followers;
          this.listFollower=this.data.content;
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
  getAllFollower() {
    this.page={
      index:0,
      size:5
    };
    return this.http.post(`${this.baseUrl}/follow/follower/${this.id}`, this.page, {
      headers: this.headers
    });
  }
  getQuantityFollower(){
    this.http.get(`${this.baseUrl}/follow/follower/count/${this.id}`, {
      headers: this.headers
    }).pipe(first())
    .subscribe(
      (data)=>{
        this.count = data as number;
      },
      error=>console.log(error)
    )
  }
  loadAdd(){
    this.size=this.page.size;
    this.index=this.page.index+1;
    this.page={
      index:this.index,
      size:this.size
    }
    this.http.post(`${this.baseUrl}/follow/follower/${this.id}`, this.page, {
      headers: this.headers
    }).pipe(first())
    .subscribe(
      (datas)=>{
          this.data=datas as Followers;
          this.followers=this.data.content;
          for(var i = 0; i < this.followers.length ; i++){
            this.listFollower.push(this.followers[i]);
        }
      },
      error=>console.log(error)
    )
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
      this.getAllMyFriend();
      this.getAllRequestFriendByMy();
      this.getAllRequestFriendToMy();
    },
    (error:HttpErrorResponse)=>{
      this.messageResponse=error.error;
      this.showSnackbarError(this.messageResponse.message,'',1000);
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
      this.getQuantityFollower();
      this.getAllFollowing();
      this.showSnackbarSucsess(this.messageResponse.message,'','2000');
    },
    (error:HttpErrorResponse)=>{
      this.messageResponse=error.error;
      console.log(error);
      this.showSnackbarError(this.messageResponse.message,'','2000');
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
  getAllFollowing(){
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
      this.getQuantityFollower();
      this.getAllFollowing();
    },
    (error:HttpErrorResponse)=>{
      this.messageResponse=error.error;
      console.log(error);
      this.showSnackbarError(this.messageResponse.message,'','2000');
    })
  }
}
