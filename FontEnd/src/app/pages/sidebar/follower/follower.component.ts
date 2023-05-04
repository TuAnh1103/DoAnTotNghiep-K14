import { MatSnackBar } from '@angular/material/snack-bar';
import { MessageResponse } from './../../../core/models/message-response.ts';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs';
import { Follower, Followers } from 'src/app/core/models/Followers.model';
import { CommonService } from 'src/app/shared/common.service';

@Component({
  selector: 'app-follower',
  templateUrl: './follower.component.html',
  styleUrls: ['./follower.component.css']
})
export class FollowerComponent implements OnInit {

  private baseUrl: string;
  private headers: any;
  listFollower: Follower[];
  page: any;
  data:Followers;
  messageResponse:MessageResponse;
  constructor(private snackBar: MatSnackBar,private http: HttpClient, private commonService: CommonService) {
    this.baseUrl = this.commonService.webApiUrl;
    this.headers = this.commonService.createHeadersOption(
      localStorage.getItem('token')
    );
    this.getAllFollower()
    .pipe(first())
    .subscribe(
      (datas)=>{
        this.data=datas as Followers;
        this.listFollower=this.data.content;
      },
      (error)=>{
        console.log(error);
      }
    )
  }
  ngOnInit(): void {
  }
  getAllFollower() {
    this.page={
      index:0,
      size:5
    };
    return this.http.post(`${this.baseUrl}/follow/follower/me`, this.page, {
      headers: this.headers
    });
  }
  addFriend(id:number)
  {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    })
    return this.http.post(`${this.baseUrl}/friendrequest/add/${id}`,'',{
      headers: headers
    }).pipe(first())
    .subscribe(
    (message)=>{
      this.messageResponse=message;
      this.showSnackbarSucsess(this.messageResponse.message,'',2000);
    },
    (error:HttpErrorResponse)=>{
      this.messageResponse=error.error;
      this.showSnackbarError(this.messageResponse.message,'',2000);
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
      this.getAllFollower()
      .pipe(first())
      .subscribe(
        (datas)=>{
          this.data=datas as Followers;
          this.listFollower=this.data.content;
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
  showSnackbarSucsess(content, action, duration) {
    this.snackBar.open(content, action, {
      duration: 1000,
      verticalPosition: "top", // Allowed values are  'top' | 'bottom'
      horizontalPosition: "center",// Allowed values are 'start' | 'center' | 'end' | 'left' | 'right'
      panelClass: ["custom-style"]
  })}
  showSnackbarError(content, action, duration) {
    this.snackBar.open(content, action, {
      duration: 1000,
      verticalPosition: "top", // Allowed values are  'top' | 'bottom'
      horizontalPosition: "center",// Allowed values are 'start' | 'center' | 'end' | 'left' | 'right'
      panelClass: ["error-custom-style"]
  })}
}
