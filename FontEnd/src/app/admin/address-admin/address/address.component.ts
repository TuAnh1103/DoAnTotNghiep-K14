import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { first } from 'rxjs';
import { Address } from 'src/app/core/models/address.model';
import { CommonService } from 'src/app/shared/common.service';
import { ConfirmDialogComponent } from 'src/app/shared/components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css']
})
export class AddressComponent implements OnInit {
  private baseUrl:string;
  private headers:any;
  addressList:Address[];
  data:any;
  address:string;
  btnAdd:boolean=true;
  btnUpdate:boolean=false;
  idAddress:number;
  constructor(private http:HttpClient,private commonService:CommonService,private dialog: MatDialog,
    private snackBar: MatSnackBar) {
    this.baseUrl=this.commonService.webApiUrl;
    this.headers=this.commonService.createHeadersOption(localStorage.getItem('token'));
    this.getAllAddress();
  }

  ngOnInit(): void {
  }
  getAllAddress(){
    this.http.get(`${this.baseUrl}/admin/address/getall`,{headers:this.headers})
    .pipe(first())
    .subscribe(
      (datas)=>{
        console.log(datas);
        this.addressList=datas as Address[];
      },
      (error)=>{
        console.log(error);
      }
    )
  }
  addAddress(){
    let body={
      name:this.address
    };
    this.http.post(`${this.baseUrl}/admin/address`,body,{headers:this.headers})
    .pipe(first())
    .subscribe(
      (data)=>{
        this.showSnackbarSucsess("Thêm địa chỉ thành công!","",1000);
        this.getAllAddress();
      },
      (error)=>{
        this.showSnackbarError("Thêm địa chỉ không thành công!","",1000);
        console.log(error);
      }
    )
  }
  editAddress(choose:Address)
  {
    this.btnUpdate=true;
    this.btnAdd=false;
    this.address=choose.name;
    this.idAddress=choose.id;
  }
  backAdd(){
    this.btnUpdate=false;
    this.btnAdd=true;
    this.address="";
  }
  edit(){
    let body={
      name:this.address
    };
    this.http.post(`${this.baseUrl}/admin/address/${this.idAddress}`,body,{headers:this.headers})
    .pipe(first())
    .subscribe(
      (data)=>{
        this.showSnackbarSucsess("Sửa địa chỉ thành công!","",1000);
        this.getAllAddress();
      },
      (error)=>{
        this.showSnackbarError("Sửa địa chỉ không thành công!","",1000);
        console.log(error);
      }
    )
  }
  deleteAddress(a:Address)
  {
    const dialogRef = this.dialog.open(ConfirmDialogComponent,{
      hasBackdrop:false,
      data:{
        message: 'Bạn có muốn tiếp túc xóa địa chỉ không?',
        buttonText: {
          ok: 'Có',
          cancel: 'Không'
        }
      }
    });

    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.http.delete(`${this.baseUrl}/admin/address/${a.id}`,{headers:this.headers})
        .pipe(first())
        .subscribe(
          (data)=>{
            this.showSnackbarSucsess("Xóa địa chỉ thành công!","",1000);
            this.getAllAddress();
          },
          (error)=>{
            this.showSnackbarError("Xóa địa chỉ không thành công!","",1000);
            console.log(error)
          }
        )
      }
    });
  }
  reset(){
    this.address="";
  }
  showSnackbarSucsess(content, action, duration) {
    this.snackBar.open(content, action, {
      duration: 5000,
      verticalPosition: "top", // Allowed values are  'top' | 'bottom'
      horizontalPosition: "center",// Allowed values are 'start' | 'center' | 'end' | 'left' | 'right'
      panelClass: ["custom-style"]
  })}
  showSnackbarError(content, action, duration) {
    this.snackBar.open(content, action, {
      duration: 5000,
      verticalPosition: "top", // Allowed values are  'top' | 'bottom'
      horizontalPosition: "center",// Allowed values are 'start' | 'center' | 'end' | 'left' | 'right'
      panelClass: ["error-custom-style"]
  })}
}
