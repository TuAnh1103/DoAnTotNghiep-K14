import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-authen-recovery',
  templateUrl: './authen-recovery.component.html',
  styleUrls: ['./authen-recovery.component.css']
})
export class AuthenRecoveryComponent implements OnInit {
  code:string;
  constructor(private dialogRef:MatDialogRef<AuthenRecoveryComponent>) { }

  ngOnInit(): void {
  }
  authentication(){
    this.dialogRef.close(this.code);
  }
  close(){
    this.dialogRef.close(this.code);
  }
}
