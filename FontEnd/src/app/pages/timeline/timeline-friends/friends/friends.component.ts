import { FriendRequest, FriendRequests } from 'src/app/core/models/friend-request.model';
import { MessageResponse } from 'src/app/core/models/message-response.ts';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { first } from 'rxjs';
import { Friend, Friends } from 'src/app/core/models/friends.model';
import { CommonService } from 'src/app/shared/common.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.css']
})
export class FriendsComponent implements OnInit {
  @Output() update1 = new EventEmitter<number>();
  id:string;
  private baseUrl: string;
  private headers: any;
  listFriend: Friend[];
  friends:Friend[];
  page: any;
  data:Friends;
  checkUser:boolean;
  myId:string;
  messageResponse:MessageResponse;
  dataFriendRequest:FriendRequests;
  listFriendRequest: FriendRequest[];
  size:number=0;
  index:number=0;
  countFriend:number=0;
  countFriendRequest:number=0;
  myFriends:Number[];
  myRequestFriendsByMy:Number[];
  myRequestFriendsToMy:Number[];
  myFollowing:Number[];
  friendId:number;
  constructor(private snackBar: MatSnackBar,private route: ActivatedRoute,private http: HttpClient, private commonService: CommonService) {
    this.baseUrl = this.commonService.webApiUrl;
    this.headers = this.commonService.createHeadersOption(
      localStorage.getItem('token')
    );
    this.myId=localStorage.getItem('userId');
    this.getAllMyFriend();
    this.getAllRequestFriendByMy();
    this.getAllRequestFriendToMy();
    this.getAllFollowing();
  }
  ngOnInit(): void {
    this.route.paramMap.subscribe((params)=>{
      this.id = params.get('id');
      this.friendId=Number.parseInt(params.get('id'));
      this.getQuantityFriend();
      this.getQuantityFriendRequest();
      this.getAllFriend()
      .pipe(first())
      .subscribe(
      (datas)=>{
        this.data=datas as Friends;
        this.listFriend=this.data.content;
      },
      (error)=>{
        console.log(error);
      }
    )
    this.checkUserFriend();
    })
  }
  checkUserFriend(){
    if(this.id === localStorage.getItem('userId'))
    {
      this.checkUser = true;
    }
    else{
      this.checkUser = false;
    }
  }
  getAllFriend() {
    this.page={
      index:0,
      size:5
    };
    return this.http.post(`${this.baseUrl}/friends/getall/${this.id}`, this.page, {
      headers: this.headers
    });
  }
  getQuantityFriend(){
    this.http.get(`${this.baseUrl}/friends/count/${this.id}`, {
      headers: this.headers
    }).pipe(first())
    .subscribe(
      (datas)=>{
        this.countFriend = datas as number;
        console.log(this.countFriend);
      },
      error=>console.log(error)
    )
  }
  getQuantityFriendRequest(){
    this.http.get(`${this.baseUrl}/friendrequest/count`, {
      headers: this.headers
    }).pipe(first())
    .subscribe(
      (datas)=>{
        this.countFriendRequest = datas as number;
        console.log(this.countFriendRequest);
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
    this.http.post(`${this.baseUrl}/friends/getall/${this.id}`, this.page, {
      headers: this.headers
    }).pipe(first())
    .subscribe(
      (datas)=>{
        this.data=datas as Friends;
        this.friends=this.data.content;
        for(var i = 0; i < this.friends.length ; i++){
          this.listFriend.push(this.friends[i]);
      }
      },
      error=>console.log(error)
    )
  }
  loadDataFriend(){
    this.getAllFriend()
    .pipe(first())
    .subscribe(
    (datas)=>{
      this.data=datas as Friends;
      this.listFriend=this.data.content;
    },
    (error)=>{
      console.log(error);
    });
  }
  loadDataFriendRequest(){
    this.http.post(`${this.baseUrl}/friendrequest`, this.page, {
      headers: this.headers
    }) .pipe(first())
    .subscribe(
    (datas)=>{
      this.dataFriendRequest=datas as FriendRequests;
      this.listFriendRequest=this.data.content;
    },
    (error)=>{
      console.log(error);
    });
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
      this.getAllFriend()
      .pipe(first())
      .subscribe(
      (datas)=>{
        this.data=datas as Friends;
        this.listFriend=this.data.content;
      },
      (error)=>{
        console.log(error);
      });
      this.checkUserFriend();
      this.getAllMyFriend();
      this.getAllRequestFriendByMy();
      this.getAllRequestFriendToMy();
      this.getAllFollowing();
    },
    (error:HttpErrorResponse)=>{
      this.messageResponse=error.error;
      this.showSnackbarError(this.messageResponse.message,'',1000);
    })
  }
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
          this.getAllMyFriend();
          this.getAllRequestFriendByMy();
          this.getAllRequestFriendToMy();
          this.getAllFollowing();
          this.getAllFriend()
          .pipe(first())
          .subscribe(
          (datas)=>{
            this.data=datas as Friends;
            this.listFriend=this.data.content;
          },
          (error)=>{
            console.log(error);
          });
        },
        (error:HttpErrorResponse)=>{
          this.messageResponse=error.error;
          this.showSnackbarError(this.messageResponse.message,'',1000);
        })
  }
  update(){
    this.getQuantityFriendRequest();
    this.getQuantityFriend();
    this.update1.emit(this.countFriend);

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
      this.getAllFollowing();

    },
    (error:HttpErrorResponse)=>{
      this.messageResponse=error.error;
      console.log(error);
      this.showSnackbarError(this.messageResponse.message,'','2000');
    })
  }
  showSnackbarSucsess(content, action, duration) {
    this.snackBar.open(content, action, {
      duration: 1000,
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
      this.getQuantityFriend();
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
      this.getAllFollowing();
    },
    (error:HttpErrorResponse)=>{
      this.messageResponse=error.error;
      console.log(error);
      this.showSnackbarError(this.messageResponse.message,'','2000');
    })
  }
}
