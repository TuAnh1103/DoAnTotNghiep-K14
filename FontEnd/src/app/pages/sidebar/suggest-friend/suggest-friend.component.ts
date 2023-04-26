import { first } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Follower, Followers } from 'src/app/core/models/Followers.model';
import { CommonService } from 'src/app/shared/common.service';
import { MessageResponse } from 'src/app/core/models/message-response.ts';
import { Friend } from 'src/app/core/models/friends.model';
import { UserDetail } from 'src/app/core/models/user-detail';


@Component({
  selector: 'app-suggest-friend',
  templateUrl: './suggest-friend.component.html',
  styleUrls: ['./suggest-friend.component.css']
})
export class SuggestFriendComponent implements OnInit {

  private baseUrl: string;
  private headers: any;
  listSuggestFriend: UserDetail[];
  page: any;
  data:any;
  messageResponse:MessageResponse;
  constructor(private snackBar: MatSnackBar,private http: HttpClient, private commonService: CommonService) {
    this.baseUrl = this.commonService.webApiUrl;
    this.headers = this.commonService.createHeadersOption(
      localStorage.getItem('token')
    );
    this.getAllSuggestFriend()
    .pipe(first())
    .subscribe(
      (datas)=>{
        this.data=datas as UserDetail[];
        this.listSuggestFriend=this.data;
        console.log(datas);
      },
      (error)=>{
        console.log(error);
      }
    )
  }
  ngOnInit(): void {
  }
  getAllSuggestFriend() {
    return this.http.post(`${this.baseUrl}/friends/suggest`,'', {
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
