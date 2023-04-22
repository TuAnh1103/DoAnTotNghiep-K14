import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { first } from 'rxjs';
import { CommonService } from 'src/app/shared/common.service';

@Component({
  selector: 'app-home-admin',
  templateUrl: './home-admin.component.html',
  styleUrls: ['./home-admin.component.scss']
})
export class HomeAdminComponent implements OnInit {

  private baseUrl:string;
  private headers:any;
  page:any;
  constructor(private router:Router,private http:HttpClient,private commonService:CommonService) {
    this.baseUrl=this.commonService.webApiUrl;
    this.headers=this.commonService.createHeadersOption(localStorage.getItem('token'));
    this.http.get(`${this.baseUrl}/admin/address/getall`,{headers:this.headers})
    .pipe(first())
    .subscribe(
      (datas)=>{
        localStorage.setItem('admin',"superUser");
      },
      (error)=>{
        this.router.navigate(['/error']);
      }
    )
   }

  ngOnInit(): void {
  }

}
