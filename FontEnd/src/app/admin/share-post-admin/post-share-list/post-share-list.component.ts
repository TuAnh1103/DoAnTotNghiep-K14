import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs';
import { sharePost } from 'src/app/core/models/post.model.ts';
import { CommonService } from 'src/app/shared/common.service';

@Component({
  selector: 'app-post-share-list',
  templateUrl: './post-share-list.component.html',
  styleUrls: ['./post-share-list.component.css']
})
export class PostShareListComponent implements OnInit {
  private baseUrl:string;
  private headers:any;
  id:string;
  page: any;
  data:any;
  postShareList:sharePost[];
  size:number=0;
  constructor(private route:ActivatedRoute,private http:HttpClient,private commonService:CommonService,private router:Router) {
    this.baseUrl=this.commonService.webApiUrl;
    this.headers=this.commonService.createHeadersOption(localStorage.getItem("token"));
  }

  ngOnInit(): void {
    // this.route.paramMap.subscribe((params)=>{
      // this.id = params.get('id');
      this.id=localStorage.getItem('userId');
      this.getAllShare().pipe(first())
      .subscribe(
        (datas)=>{
          this.data=datas;
          this.postShareList=this.data.content;
          this.size=this.page.size;
        },
        (error)=>{
          console.log(error);
        }
      )
    // })
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
    this.size=this.page.size + 2;
    this.page={
      index:0,
      size:this.size
    }
    this.http.post(`${this.baseUrl}/share/all/${this.id}`, this.page, {
      headers: this.headers
    }).pipe(first())
    .subscribe(
      (datas)=>{
        this.data = datas;
        this.postShareList = this.data.content;
        this.size=this.page.size;
      },
      error=>console.log(error)
    )
  }
  updatePostShare($event:any){

      this.getAllShare().pipe(first())
      .subscribe(
        (datas)=>{
          this.data=datas;
          this.postShareList=this.data.content;
          this.size=this.page.size;
          this.router.navigate(['/timeline', this.id, 'share']);
        },
        (error)=>{
          console.log(error);
        }
      )
  }

}
