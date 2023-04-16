import { first } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UserDetail } from 'src/app/core/models/user-detail';
import { CommonService } from 'src/app/shared/common.service';

@Component({
  selector: 'app-image-list',
  templateUrl: './image-list.component.html',
  styleUrls: ['./image-list.component.css']
})
export class ImageListComponent implements OnInit {
  private baseUrl:string;
  private headers:any;
  users:UserDetail[];
  page:any;
  data:any;
  constructor(private http:HttpClient,private commonService:CommonService) {
    this.baseUrl=this.commonService.webApiUrl;
    this.headers=this.commonService.createHeadersOption(localStorage.getItem('token'));
    this.getAllUser();
   }

  ngOnInit(): void {
  }
  getAllUser(){
    this.page={
      index:0,
      size:5
    };
    this.http.post(`${this.baseUrl}/admin/user/all`,this.page,{headers:this.headers})
    .pipe(first())
    .subscribe(
      (datas)=>{
        console.log(datas);
        this.data=datas;
        this.users=this.data.content as UserDetail[];
        console.log(this.users);
      },
      (error)=>{
        console.log(error);
      }
    )
  }
}
