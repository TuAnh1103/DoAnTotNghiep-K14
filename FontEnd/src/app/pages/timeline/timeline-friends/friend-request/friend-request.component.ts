import { MessageResponse } from 'src/app/core/models/message-response.ts';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
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
  @Output() update = new EventEmitter<string>();
  id:string;
  private baseUrl: string;
  private headers: any;
  listFriendRequest: FriendRequest[];
  FriendRequests: FriendRequest[]
  page: any;
  data:FriendRequests;
  checkUser:boolean;
  messageResponse:MessageResponse;
  size:number=0;
  index:number=0;
  countFriendRequest:number=0;
  constructor(private snackBar: MatSnackBar,private route: ActivatedRoute,private http: HttpClient, private commonService: CommonService) {
    this.baseUrl = this.commonService.webApiUrl;
    this.headers = this.commonService.createHeadersOption(
      localStorage.getItem('token')
    );
  }
  ngOnInit(): void {
    this.route.paramMap.subscribe((params)=>{
      this.id = params.get('id');
      this.getQuantityFriendRequest();
      if(this.id === localStorage.getItem('userId'))
      {
        this.checkUser = true;
        this.getAllFriendRequest()
        .pipe(first())
        .subscribe(
        (datas)=>{
          this.data=datas as FriendRequests;
          this.listFriendRequest=this.data.content;
          this.size=this.page.size;
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
  getQuantityFriendRequest(){
    this.http.get(`${this.baseUrl}/friendrequest/count`, {
      headers: this.headers
    }).pipe(first())
    .subscribe(
      (datas)=>{
        this.countFriendRequest = datas as number;
      },
      error=>console.log(error)
    )
  }
  loadAdd(){
    this.size=this.page.size;
    this.index=this.index+1;
    this.page={
      index:this.index,
      size:this.size
    }
    this.http.post(`${this.baseUrl}/friendrequest`, this.page, {
      headers: this.headers
    }).pipe(first())
    .subscribe(
      (datas)=>{
        this.data=datas as FriendRequests;
        this.FriendRequests=this.data.content;
          for(var i = 0; i < this.FriendRequests.length ; i++){
            this.listFriendRequest.push(this.FriendRequests[i]);
          }
      },
      error=>console.log(error)
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
      this.update.emit("load");
      this.getQuantityFriendRequest();
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
      this.getQuantityFriendRequest();
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
