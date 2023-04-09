import { CommonService } from 'src/app/shared/common.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { first } from 'rxjs';
import { FileResponse } from 'src/app/core/models/file-response.model';

@Component({
  selector: 'app-photos',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.css']
})
export class PhotosComponent implements OnInit {
  private baseUrl:string;
  private headers:any;

  id:string;
  imagePostList:FileResponse[];

  constructor(private route:ActivatedRoute,private http:HttpClient,
    private commonService:CommonService) {
      this.baseUrl=this.commonService.webApiUrl;
      this.headers=this.commonService.createHeadersOption(localStorage.getItem('token'));
    }

  ngOnInit() {
    this.route.paramMap.subscribe((params)=>{
      this.id=params.get('id');
    })
    this.getAllImage().pipe(first())
    .subscribe(
      (datas)=>{
        this.imagePostList=datas as FileResponse[];
        console.log(datas);
        console.log(this.imagePostList);
      },
      (error)=>{
        console.log(error);
      }
    )
  }
  getAllImage(){
    return this.http.get(`${this.baseUrl}/post/all/image/${this.id}`,{headers:this.headers});
  }
}
