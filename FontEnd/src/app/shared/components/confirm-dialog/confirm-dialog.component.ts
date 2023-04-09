import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.css']
})
export class ConfirmDialogComponent implements OnInit {
  message: string = "Bạn có tiếp tục muốn xóa không?"
  confirmButtonText = "Tiếp tục"
  cancelButtonText = "Hủy"
  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private dialogRef: MatDialogRef<ConfirmDialogComponent>) {
      if(data){
    this.message = data.message || this.message;
    if (data.buttonText) {
      this.confirmButtonText = data.buttonText.ok || this.confirmButtonText;
      this.cancelButtonText = data.buttonText.cancel || this.cancelButtonText;
    }
      }
  }
  ngOnInit() {

  }
  onConfirmClick(): void {
    this.dialogRef.close(true);
  }
}
