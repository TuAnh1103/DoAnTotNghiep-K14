import { Component, OnInit } from '@angular/core';
import { UserDetail } from 'src/app/core/models/user-detail';

@Component({
  selector: 'app-shortcuts',
  templateUrl: './shortcuts.component.html',
  styleUrls: ['./shortcuts.component.css']
})
export class ShortcutsComponent implements OnInit {
  id:string;
  constructor() {
    this.id = localStorage.getItem("userId");
   }
  ngOnInit(): void {
  }

}
