import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from 'src/app/shared/common.service';

@Component({
  selector: 'app-nav-timeline',
  templateUrl: './nav-timeline.component.html',
  styleUrls: ['./nav-timeline.component.css']
})
export class NavTimelineComponent implements OnInit {
  private baseUrl:string;
  private headers:any;
  id:string;
  checkUser:boolean=false;
  constructor(private router:Router,private snackBar: MatSnackBar,private route: ActivatedRoute,
    private http:HttpClient,private commonService:CommonService) {
    this.baseUrl = this.commonService.webApiUrl;
    this.headers = this.commonService.createHeadersOption(localStorage.getItem('token'));
   }
  ngOnInit(): void {
    this.route.paramMap.subscribe((params)=>{
      this.id=params.get('id');
      if(this.id==localStorage.getItem('userId'))
      {
        this.checkUser=true;
      }
    })
  }
}
