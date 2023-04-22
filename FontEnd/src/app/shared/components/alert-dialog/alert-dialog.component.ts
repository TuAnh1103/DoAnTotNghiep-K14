import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-alert-dialog',
  templateUrl: './alert-dialog.component.html',
  styleUrls: ['./alert-dialog.component.css']
})
export class AlertDialogComponent implements OnInit {

  content:string;
  constructor(private router:Router,private dialogRef:MatDialogRef<AlertDialogComponent>,@Inject(MAT_DIALOG_DATA)data) {
    this.content=data.content.message;
   }

  ngOnInit() {
  }
  close(){
    this.dialogRef.close();
    this.router.navigateByUrl("/home");
  }
}
