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
  userFilterRequest:any;
  messageResponse:MessageResponse;
  checkUser:boolean;
  myId:string;
  size:number=0;
  data:any;
  constructor(private snackBar: MatSnackBar,private http:HttpClient,private commonService:CommonService,private route:ActivatedRoute) {
    this.baseUrl=this.commonService.webApiUrl;
    this.headers=this.commonService.createHeadersOption(localStorage.getItem('token'));
    this.myId=localStorage.getItem('userId');
   }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params)=>{
      this.key = params.get('key');
      console.log(this.key);
      this.getUsersByKey();
    })
  }
  getUsersByKey(){
    this.userFilterRequest={
      size:5,
      index:0,
      keyword:this.key
    };
    this.http.post(`${this.baseUrl}/user/searchKey`,this.userFilterRequest,{headers:this.headers})
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
    },
    (error:HttpErrorResponse)=>{
      this.messageResponse=error.error;
      this.showSnackbarError(this.messageResponse.message,'',1000);
    })
  }
  loadAdd(){
    this.size=this.userFilterRequest.size + 5;
    this.userFilterRequest={
      index:0,
      size:this.size,
      keyword:this.key
    }
    this.http.post(`${this.baseUrl}/user/searchKey`,this.getUsersByKey,{headers:this.headers})
    .pipe(first())
    .subscribe(
      (datas)=>{
        console.log(datas);

        this.users=datas as UserDetail[];
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
