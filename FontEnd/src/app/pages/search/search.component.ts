import { ActivatedRoute } from '@angular/router';
 import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/shared/common.service';
import { UserDetail } from 'src/app/core/models/user-detail';
import { first } from 'rxjs';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  private baseUrl:string;
  private headers:any;
  key:string;
  users:UserDetail[];
  userFilterRequest:any;
  data:any;
  constructor(private http:HttpClient,private commonService:CommonService,private route:ActivatedRoute) {
    this.baseUrl=this.commonService.webApiUrl;
    this.headers=this.commonService.createHeadersOption(localStorage.getItem('token'));
   }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params)=>{
      this.key = params.get('key');
      this.getUsersByKey();
    })
  }
  getUsersByKey(){
    this.userFilterRequest={
      size:5,
      index:0,
      keyword:this.key
    };
    console.log(this.userFilterRequest);
    this.http.post(`${this.baseUrl}/user/searchKey`, this.userFilterRequest,{headers:this.headers})
    .pipe(first())
    .subscribe(
      (datas)=>{
        console.log(datas);
        this.users=datas as UserDetail[];
      },
      (error)=>{
        console.log(error);
      }
    )
  }

}
