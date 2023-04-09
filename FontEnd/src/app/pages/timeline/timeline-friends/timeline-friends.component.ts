import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { first } from 'rxjs';
import { Friend, Friends } from 'src/app/core/models/friends.model';
import { CommonService } from 'src/app/shared/common.service';
import { FriendsComponent } from './friends/friends.component';
import { FriendRequestComponent } from './friend-request/friend-request.component';

@Component({
  selector: 'app-timeline-friends',
  templateUrl: './timeline-friends.component.html',
  styleUrls: ['./timeline-friends.component.css']
})
export class TimelineFriendsComponent implements OnInit {
  id:string='4';
  private baseUrl: string;
  private headers: any;
  listFriend: Friend[];
  page: any;
  data:Friends;
  checkUser:boolean;
  constructor(private route: ActivatedRoute,private http: HttpClient, private commonService: CommonService) {
    this.baseUrl = this.commonService.webApiUrl;
    this.headers = this.commonService.createHeadersOption(
      localStorage.getItem('token')
    );
  }
  ngOnInit(): void {
    this.route.paramMap.subscribe((params)=>{
      this.id = params.get('id');
      if(this.id === localStorage.getItem('userId'))
      {
        this.checkUser = true;
      }
      else{
        this.checkUser = false;
      }
    })
  }

}
