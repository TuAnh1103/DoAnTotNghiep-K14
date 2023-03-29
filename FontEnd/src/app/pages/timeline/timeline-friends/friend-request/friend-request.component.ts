import { MessageResponse } from 'src/app/core/models/message-response.ts';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { first } from 'rxjs';
import { FriendRequest, FriendRequests } from 'src/app/core/models/friend-request.model';
import { CommonService } from 'src/app/shared/common.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-friend-request',
  templateUrl: './friend-request.component.html',
  styleUrls: ['./friend-request.component.css']
})
export class FriendRequestComponent implements OnInit {
  id:string;
  private baseUrl: string;
  private headers: any;
  listFriendRequest: FriendRequest[];
  page: any;
  data:FriendRequests;
  checkUser:boolean;
  messageResponse:MessageResponse;
  constructor(private snackBar: MatSnackBar,private route: ActivatedRoute,private http: HttpClient, private commonService: CommonService) {
    this.baseUrl = this.commonService.webApiUrl;
    this.headers = this.commonService.createHeadersOption(
      localStorage.getItem('token')
    );
  }
  ngOnInit(): void {
    this.route.paramMap.subscribe((params)=>{
      this.id = params.get('id');
      console.log(this.id);
      if(this.id === localStorage.getItem('userId'))
      {
        this.checkUser = true;
        this.getAllFriendRequest()
        .pipe(first())
        .subscribe(
        (datas)=>{
          this.data=datas as FriendRequests;
          this.listFriendRequest=this.data.content;
        },
        (error)=>{
          console.log(error);
        });
      }
      else{
        this.checkUser = false;
      }
    })
  }
  getAllFriendRequest() {
    this.page={
      index:0,
      size:5
    };
    return this.http.post(`${this.baseUrl}/friendrequest`, this.page, {
      headers: this.headers
    });
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
      this.getAllFriendRequest()
        .pipe(first())
        .subscribe(
        (datas)=>{
          this.data=datas as FriendRequests;
          this.listFriendRequest=this.data.content;
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
  deleteRequest(userId:any){
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    })
    return this.http.post(`${this.baseUrl}/friendrequest/remove/${userId}`,'',{
      headers: headers
    }).pipe(first())
    .subscribe(
    (message)=>{
      this.messageResponse=message;
      this.showSnackbarSucsess(this.messageResponse.message,'',1000);
      this.getAllFriendRequest()
      .pipe(first())
      .subscribe(
      (datas)=>{
        this.data=datas as FriendRequests;
        this.listFriendRequest=this.data.content;
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
  showSnackbarSucsess(content, action, duration) {
    this.snackBar.open(content, action, {
      duration: 1000,
      verticalPosition: "bottom", // Allowed values are  'top' | 'bottom'
      horizontalPosition: "center",// Allowed values are 'start' | 'center' | 'end' | 'left' | 'right'
      panelClass: ["custom-style"]
  })}
  showSnackbarError(content, action, duration) {
    this.snackBar.open(content, action, {
      duration: 5000,
      verticalPosition: "bottom", // Allowed values are  'top' | 'bottom'
      horizontalPosition: "center",// Allowed values are 'start' | 'center' | 'end' | 'left' | 'right'
      panelClass: ["error-custom-style"]
  })}
}
