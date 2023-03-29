import { MessageResponse } from 'src/app/core/models/message-response.ts';
import { CommonService } from 'src/app/shared/common.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Following, Followings } from 'src/app/core/models/followings.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { first } from 'rxjs';

@Component({
  selector: 'app-timeline-following',
  templateUrl: './timeline-following.component.html',
  styleUrls: ['./timeline-following.component.css']
})
export class TimelineFollowingComponent implements OnInit {
  private baseUrl: string;
  private headers: any;
  listFollowing: Following[];
  page: any;
  data:Followings;
  messageResponse:MessageResponse;
  id:string;
  checkUser:boolean;
  constructor(private snackBar: MatSnackBar,private route: ActivatedRoute,private http:HttpClient,private commonService:CommonService) {
    this.baseUrl = this.commonService.webApiUrl;
    this.headers = this.commonService.createHeadersOption(
      localStorage.getItem('token')
    );
    }
  ngOnInit(): void {
    this.route.paramMap.subscribe((params)=>{
      this.id = params.get('id');
      this.getAllFollowing()
      .pipe(first())
      .subscribe(
        (datas)=>{
          this.data=datas as Followings;
          this.listFollowing=this.data.content;
        },
        (error)=>{
          console.log(error);
        }
      )
      if(this.id === localStorage.getItem('userId'))
      {
        this.checkUser = true;
      }
      else{
        this.checkUser = false;
      }
    })
  }
  getAllFollowing() {
    this.page={
      index:0,
      size:10
    };
    return this.http.post(`${this.baseUrl}/follow/following/${this.id}`, this.page, {
      headers: this.headers
    });
  }
}
