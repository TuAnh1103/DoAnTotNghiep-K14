import { first } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Favorite } from 'src/app/core/models/favorite.model';
import { CommonService } from 'src/app/shared/common.service';

@Component({
  selector: 'app-favorite-admin',
  templateUrl: './favorite-admin.component.html',
  styleUrls: ['./favorite-admin.component.css']
})
export class FavoriteAdminComponent implements OnInit {

  private baseUrl:string;
  private headers:any;
  favoriteList:Favorite[];
  data:any;
  constructor(private http:HttpClient,private commonService:CommonService) {
    this.baseUrl=this.commonService.webApiUrl;
    this.headers=this.commonService.createHeadersOption(localStorage.getItem('token'));
    this.getAllAddress();
  }

  ngOnInit(): void {
  }
  getAllAddress(){
    this.http.get(`${this.baseUrl}/admin/address/getall`,{headers:this.headers})
    .pipe(first())
    .subscribe(
      (datas)=>{
        this.favoriteList=datas as Favorite[];
      }
    )
  }
}
