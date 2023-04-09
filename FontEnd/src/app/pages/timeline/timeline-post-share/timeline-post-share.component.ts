import { first } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostResponse, sharePost } from 'src/app/core/models/post.model.ts';
import { CommonService } from 'src/app/shared/common.service';

@Component({
  selector: 'app-timeline-post-share',
  templateUrl: './timeline-post-share.component.html',
  styleUrls: ['./timeline-post-share.component.css']
})
export class TimelinePostShareComponent implements OnInit {

  private baseUrl:string;
  private headers:any;
  id:string;
  page: any;
  data:any;
  postShareList:sharePost[];
  constructor(private route:ActivatedRoute,private http:HttpClient,private commonService:CommonService) {
    this.baseUrl=this.commonService.webApiUrl;
    this.headers=this.commonService.createHeadersOption(localStorage.getItem("token"));
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params)=>{
      this.id = params.get('id');
      this.getAllShare().pipe(first())
      .subscribe(
        (datas)=>{
          console.log(datas);
          this.data=datas;
          this.postShareList=this.data.content;
        }
      )
    })
  }
  getAllShare(){
    this.page={
      index:0,
      size:5
    };
    return this.http.post(`${this.baseUrl}/share/all/${this.id}`, this.page, {
      headers: this.headers
    });
  }

}
