import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs';
import { sharePost } from 'src/app/core/models/post.model.ts';
import { CommonService } from 'src/app/shared/common.service';

@Component({
  selector: 'app-post-share_new',
  templateUrl: './post-share_new.component.html',
  styleUrls: ['./post-share_new.component.css']
})
export class PostShare_newComponent implements OnInit {

  private baseUrl:string;
  private headers:any;
  id:string;
  page: any;
  data:any;
  postShareList:sharePost[];
  postShares:sharePost[];
  size:number=0;
  index:number=0;
  constructor(private route:ActivatedRoute,private http:HttpClient,private commonService:CommonService,private router:Router) {
    this.baseUrl=this.commonService.webApiUrl;
    this.headers=this.commonService.createHeadersOption(localStorage.getItem("token"));
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params)=>{
      this.id = params.get('id');
      this.getAllShare().pipe(first())
      .subscribe(
        (datas)=>{
          this.data=datas;
          this.postShareList=this.data.content;
          this.size=this.page.size;
          this.index=this.page.index;
        },
        (error)=>{
          console.log(error);
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
  loadAdd(){
    this.size=this.page.size;
    this.index=this.page.index+1;
    this.page={
      index:this.index,
      size:this.size
    }
    this.http.post(`${this.baseUrl}/share/all/${this.id}`, this.page, {
      headers: this.headers
    }).pipe(first())
    .subscribe(
      (datas)=>{
        this.data = datas;
        this.postShares = this.data.content;
        for(var i = 0; i <  this.postShares.length ; i++){
          this.postShareList.push(this.postShares[i]);
      }
        this.size=this.page.size;
        console.log(this.postShareList);
      },
      error=>console.log(error)
    )
  }
  updatePostShare($event:any){

      this.getAllShare().pipe(first())
      .subscribe(
        (datas)=>{
          this.data=datas;
          this.postShares=this.data.content;
          this.size=this.page.size;
          this.router.navigate(['/timeline', this.id, 'share']);
        },
        (error)=>{
          console.log(error);
        }
      )
  }
}

