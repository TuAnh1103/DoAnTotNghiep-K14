import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonService } from 'src/app/shared/common.service';

@Component({
  selector: 'app-timeline-photos',
  templateUrl: './timeline-photos.component.html',
  styleUrls: ['./timeline-photos.component.css']
})
export class TimelinePhotosComponent implements OnInit {

  id:string;
  constructor(private route: ActivatedRoute,private http:HttpClient,private commonService:CommonService) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    console.log(this.id);
    
  }

}
