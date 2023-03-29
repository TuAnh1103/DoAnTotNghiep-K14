import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonService } from 'src/app/shared/common.service';

@Component({
  selector: 'app-timeline-follower',
  templateUrl: './timeline-follower.component.html',
  styleUrls: ['./timeline-follower.component.css']
})
export class TimelineFollowerComponent implements OnInit {

  id:string;
  constructor(private route: ActivatedRoute,private http:HttpClient,private commonService:CommonService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params)=>{
      this.id = params.get('id');
    })
  }
}
