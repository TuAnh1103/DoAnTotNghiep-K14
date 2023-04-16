import { first } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Favorite } from 'src/app/core/models/favorite.model';
import { CommonService } from 'src/app/shared/common.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from 'src/app/shared/components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.css']
})
export class FavoriteComponent implements OnInit {

  private baseUrl:string;
  private headers:any;
  favoriteList:Favorite[];
  data:any;
  favorite:string;
  btnAdd:boolean=true;
  btnUpdate:boolean=false;
  idAddress:number;
  constructor(private http:HttpClient,private commonService:CommonService,private dialog: MatDialog,
    private snackBar: MatSnackBar) {
    this.baseUrl=this.commonService.webApiUrl;
    this.headers=this.commonService.createHeadersOption(localStorage.getItem('token'));
    this.getAllFavorite();
  }

  ngOnInit(): void {
  }
  getAllFavorite(){
    this.http.get(`${this.baseUrl}/admin/favorite/getall`,{headers:this.headers})
    .pipe(first())
    .subscribe(
      (datas)=>{
        this.favoriteList=datas as Favorite[];
      }
    )
  }
  addFavorite(){
    let body={
      favorite_name:this.favorite
    };
    this.http.post(`${this.baseUrl}/admin/favorite`,body,{headers:this.headers})
    .pipe(first())
    .subscribe(
      (data)=>{
        this.showSnackbarSucsess("Thêm sở thích thành công!","",1000);
        this.getAllFavorite();
      },
      (error)=>{
        this.showSnackbarError("Thêm sở thích không thành công!","",1000);
        console.log(error);
      }
    )
  }
  editFavorite(choose:Favorite)
  {
    this.btnUpdate=true;
    this.btnAdd=false;
    this.favorite=choose.favorite_name;
    this.idAddress=choose.id;
  }
  backAdd(){
    this.btnUpdate=false;
    this.btnAdd=true;
    this.favorite ="";
  }
  edit(){
    let body={
      favorite_name:this.favorite
    };
    this.http.post(`${this.baseUrl}/admin/favorite/${this.idAddress}`,body,{headers:this.headers})
    .pipe(first())
    .subscribe(
      (data)=>{
        this.showSnackbarSucsess("Sửa sở thích thành công!","",1000);
        this.getAllFavorite();
      },
      (error)=>{
        this.showSnackbarError("Sửa sở thích không thành công!","",1000);
        console.log(error);
      }
    )
  }
  deleteFavorite(a:Favorite)
  {
    const dialogRef = this.dialog.open(ConfirmDialogComponent,{
      hasBackdrop:false,
      data:{
        message: 'Bạn có muốn tiếp túc xóa sở thích không?',
        buttonText: {
          ok: 'Có',
          cancel: 'Không'
        }
      }
    });

    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.http.post(`${this.baseUrl}/admin/favorite/delete/${a.id}`,'',{headers:this.headers})
        .pipe(first())
        .subscribe(
          (data)=>{
            this.showSnackbarSucsess("Xóa sở thích thành công!","",1000);
            this.getAllFavorite();
          },
          (error)=>{
            this.showSnackbarError("Xóa sở thích không thành công!","",1000);
            console.log(error)
          }
        )
      }
    });
  }
  reset(){
    this.favorite="";
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
