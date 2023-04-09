import { first } from 'rxjs';
import { UserDetail } from './../../../core/models/user-detail';
import { CommonService } from 'src/app/shared/common.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Friend, Friends } from 'src/app/core/models/friends.model';

@Component({
  selector: 'app-list-friend',
  templateUrl: './list-friend.component.html',
  styleUrls: ['./list-friend.component.css'],
})
export class ListFriendComponent implements OnInit {
  private baseUrl: string;
  private headers: any;
  listFriend: Friend[];
  page: any;
  data:Friends;
  item:any;
  show:boolean=true;
  constructor(private http: HttpClient, private commonService: CommonService) {
    this.baseUrl = this.commonService.webApiUrl;
    this.headers = this.commonService.createHeadersOption(
      localStorage.getItem('token')
    );
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
  }
  ngOnInit(): void {
  }
  getAllFriend() {
    this.page={
      index:0,
      size:5
    };
    return this.http.post(`${this.baseUrl}/friends/getall/me`, this.page, {
      headers: this.headers
    });
  }
  showChat(friend:any){
    $('.chat-box').addClass('show');
  }
}
