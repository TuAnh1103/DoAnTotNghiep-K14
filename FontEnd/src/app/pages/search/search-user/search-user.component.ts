import { first } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserDetail } from 'src/app/core/models/user-detail';
import { CommonService } from 'src/app/shared/common.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MessageResponse } from 'src/app/core/models/message-response.ts';

@Component({
  selector: 'app-search-user',
  templateUrl: './search-user.component.html',
  styleUrls: ['./search-user.component.css']
})
export class SearchUserComponent implements OnInit {

  private baseUrl:string;
  private headers:any;
  key:string;
  users:UserDetail[];
  usersList:UserDetail[];
  userFilterRequest:any;
  messageResponse:MessageResponse;
  checkUser:boolean;
  myId:string;
  index:number=0;
  size:number=0;
  data:any;
  myFriends:Number[];
  myRequestFriendsByMy:Number[];
  myRequestFriendsToMy:Number[];
  constructor(private snackBar: MatSnackBar,private http:HttpClient,private commonService:CommonService,private route:ActivatedRoute) {
    this.baseUrl=this.commonService.webApiUrl;
    this.headers=this.commonService.createHeadersOption(localStorage.getItem('token'));
    this.myId=localStorage.getItem('userId');
    this.getAllFriend();
    this.getAllRequestFriendByMy();
    this.getAllRequestFriendToMy();
   }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params)=>{
      this.key = params.get('key');
      console.log(this.key);
      this.getUsersByKey();
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
        console.log( this.myRequestFriendsToMy);
      },
      (error)=>{
        console.log(error);
      }
    )
  }
  confirmReqest(userId:any){
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
      this.getAllFriend();
      this.getAllRequestFriendByMy();
      this.getAllRequestFriendToMy();
    },
    (error:HttpErrorResponse)=>{
      this.messageResponse=error.error;
      this.showSnackbarError(this.messageResponse.message,'',1000);
    })
  }
  getUsersByKey(){
    this.userFilterRequest={
      size:5,
      index:0,
      keyword:this.key
    };
    this.http.post(`${this.baseUrl}/user/searchByKey`,this.userFilterRequest,{headers:this.headers})
    .pipe(first())
    .subscribe(
      (datas)=>{
        console.log(datas);
        this.data=datas;
        this.users=this.data.content as UserDetail[];
      },
      (error)=>console.log(error)
    )
  }
  checkUserFriend(id:string){
    if(id === localStorage.getItem('userId'))
    {
      this.checkUser = true;
    }
    else{
      this.checkUser = false;
    }
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
      this.getAllFriend();
      this.getAllRequestFriendByMy();
      this.getAllRequestFriendToMy();
    },
    (error:HttpErrorResponse)=>{
      this.messageResponse=error.error;
      this.showSnackbarError(this.messageResponse.message,'',1000);
    })
  }
  loadAdd(){
    this.size=this.userFilterRequest.size;
    this.index=this.userFilterRequest.index+1;
    this.userFilterRequest={
      index:this.index,
      size:this.size,
      keyword:this.key
    }
    this.http.post(`${this.baseUrl}/user/searchByKey`,this.userFilterRequest,{headers:this.headers})
    .pipe(first())
    .subscribe(
      (datas)=>{
        this.data=datas;
        this.usersList=this.data.content as UserDetail[];
        for(var i = 0; i < this.usersList.length ; i++){
          this.users.push(this.usersList[i]);
      }
      }
    )
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
}
