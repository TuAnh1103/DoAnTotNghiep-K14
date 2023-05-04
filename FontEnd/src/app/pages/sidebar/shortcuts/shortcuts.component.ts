import { Component, OnInit } from '@angular/core';
import { UserDetail } from 'src/app/core/models/user-detail';
import { ApiService } from 'src/app/core/service/api/api.service';

@Component({
  selector: 'app-shortcuts',
  templateUrl: './shortcuts.component.html',
  styleUrls: ['./shortcuts.component.css']
})
export class ShortcutsComponent implements OnInit {
  id:string;
  private api:ApiService;
  constructor() {
    this.id = localStorage.getItem("userId");
   }
  ngOnInit(): void {
  }
  logout(){
    localStorage.clear();
    this.api.clearData();
  }
}
