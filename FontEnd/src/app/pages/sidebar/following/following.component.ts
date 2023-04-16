import { MessageResponse } from './../../../core/models/message-response.ts';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs';
import { Following, Followings } from 'src/app/core/models/followings.model';
import { CommonService } from 'src/app/shared/common.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-following',
  templateUrl: './following.component.html',
  styleUrls: ['./following.component.css']
})
export class FollowingComponent implements OnInit {

  private baseUrl: string;
  private headers: any;
  listFollowing: Following[];
  page: any;
  data:Followings;
  messageResponse:MessageResponse;
  constructor(private snackBar: MatSnackBar,private http: HttpClient, private commonService: CommonService) {
    this.baseUrl = this.commonService.webApiUrl;
    this.headers = this.commonService.createHeadersOption(
      localStorage.getItem('token')
    );
    this.getAllFollowing()
    .pipe(first())
    .subscribe(
      (datas)=>{
        this.data=datas as Followings;
        this.listFollowing=this.data.content;
        console.log(this.data.content);
        console.log(this.listFollowing);
      },
      (error)=>{
        console.log(error);
      }
    )
  }
  ngOnInit(): void {
  }
  getAllFollowing() {
    this.page={
      index:0,
      size:5
    };
    return this.http.post(`${this.baseUrl}/follow/following/me`, this.page, {
      headers: this.headers
    });
  }
  unfollow(id:number){
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    })
    return this.http.post(`${this.baseUrl}/follow/remove/${id}`,'',{
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
  showSnackbarSucsess(content, action, duration) {
    this.snackBar.open(content, action, {
      duration: 1000,
      verticalPosition: "bottom", // Allowed values are  'top' | 'bottom'
      horizontalPosition: "left",// Allowed values are 'start' | 'center' | 'end' | 'left' | 'right'
      panelClass: ["custom-style"]
  })}
  showSnackbarError(content, action, duration) {
    this.snackBar.open(content, action, {
      duration: 1000,
      verticalPosition: "bottom", // Allowed values are  'top' | 'bottom'
      horizontalPosition: "left",// Allowed values are 'start' | 'center' | 'end' | 'left' | 'right'
      panelClass: ["error-custom-style"]
  })}
}
