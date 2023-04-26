import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-privacy-dialog',
  templateUrl: './privacy-dialog.component.html',
  styleUrls: ['./privacy-dialog.component.css']
})
export class PrivacyDialogComponent implements OnInit {
  privacy:number;
  constructor(private dialogRef:MatDialogRef<PrivacyDialogComponent>,
    @Inject(MAT_DIALOG_DATA)data) { }

  ngOnInit(): void {
  }
  Done(){
    this.dialogRef.close(this.privacy);
  }
  Cancel(){
    this.dialogRef.close(this.privacy);
  }
}
