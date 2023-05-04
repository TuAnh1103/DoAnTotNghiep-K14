import { UserService } from './../../core/service/user.service';
import { UserDetail } from './../../core/models/user-detail';
import { FileResponse } from './../../core/models/file-response.model';
import { first } from 'rxjs';
import { CommonService } from 'src/app/shared/common.service';
import { HttpClient } from '@angular/common/http';
import { Form, FormGroup, Validators, FormBuilder, FormArray, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Favorite } from 'src/app/core/models/favorite.model';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { Address } from 'src/app/core/models/address.model';
import { MatOptionSelectionChange } from '@angular/material/core';

@Component({
  selector: 'app-edit-profile-basic',
  templateUrl: './edit-profile-basic.component.html',
  styleUrls: ['./edit-profile-basic.component.scss'],
})
export class EditProfileBasicComponent implements OnInit {
  form: FormGroup;
  last_name: string;
  first_name: string;
  dob: string;
  bio: string;
  gender: string;
  hometown: any;
  current_city: any;
  selectedFile: File;
  baseUrl = '';
  body: any;
  image: FileResponse;
  status: number;
  userDetail: UserDetail;
  imageUrl: string;
  addressList:Address[];
  favoriteList: Favorite[];
  favorites:any[];
  selectedOption = [];
  city:any[];
  district:any[];
  tinh:string;
  huyen:string;
  address:any[];
  private headers: any;
  constructor(
    private snackBar: MatSnackBar,
    private fb: FormBuilder,
    private http: HttpClient,
    private commonService: CommonService,
    private userService: UserService
  ) {
    this.form = this.fb.group({
      last_name: ['', Validators.required],
      first_name: ['', Validators.required],
      dob: ['', Validators.required],
      bio: ['', Validators.required],
      hometown: [''],
      current_city: [''],
      gender: ['', Validators.required],
      // favorites: this.fb.array([], Validators.required)
      favorites:[this.selectedOption, [Validators.required]],
      tinh:[this.tinh,Validators.required],
      huyen:[this.huyen,Validators.required]
    });
    this.baseUrl = this.commonService.webApiUrl;
    this.headers = this.commonService.createHeadersOption(
      localStorage.getItem('token')
    );
    this.getAllAddress();
    this.loadData();
    this.getAllCity();
  }

  ngOnInit(): void {
    this.getAllFavorites();
  }
  getAllCity()
  {
   const host="https://provinces.open-api.vn/api/";
   this.http.get(`${host}`).pipe(first())
   .subscribe((datas)=>{
     this.city=datas as [];
   },
   error=>{
     console.log(error);
   })
  }
  choose(event:MatOptionSelectionChange,c:any){
    if(event.source.selected)
    {
    this.district=[];
    const host="https://provinces.open-api.vn/api/p";
    this.http.get(`${host}/${c.code}/?depth=2`).pipe(first())
    .subscribe((datas:any)=>{
      this.district=datas.districts as [];
    },
    error=>{
      console.log(error);
    })
   }
  }
  getAllAddress(){
    this.http.get(`${this.baseUrl}/user/getAddress`,{headers:this.headers})
    .pipe(first())
    .subscribe(
      (datas)=>{
        this.addressList=datas as Address[];
        console.log(datas);
      },
      (error)=>{
        console.log(error);
      }
    )
  }
  getAllFavorites(){
    this.http.get(`${this.baseUrl}/auth/favorite`)
    .pipe(first())
    .subscribe(
      (datas)=>{
        console.log(datas);
        this.favoriteList=datas as Favorite[];
      },
      (error)=>console.log(error)
    )
  }
  onChange(selectedOption: MatCheckboxChange) {
    const favorites = (<FormArray>(
      this.form.get("favorites")
    )) as FormArray;

    if (selectedOption.checked) {
      favorites.push(new FormControl(selectedOption.source.value));
    } else {
      const i = favorites.controls.findIndex(
        x => x.value === selectedOption.source.value
      );
      favorites.removeAt(i);
    }
    console.log(favorites);
  }
  loadData() {
    // const favorites = (<FormArray>(
    //   this.form.get("favorites")
    // )) as FormArray;
    this.http.get(`${this.baseUrl}/user/id/${localStorage.getItem('userId')}`, { headers: this.headers })
      .pipe(first())
      .subscribe(
        (data) => {
          console.log(data);
          this.userDetail = data as UserDetail;
          this.last_name = this.userDetail.last_name;
          this.first_name = this.userDetail.first_name;
          this.dob = this.userDetail.dob.toString();
          this.bio = this.userDetail.bio;
          this.gender = this.userDetail.gender.toString();
          this.image = this.userDetail.avatar_image as FileResponse;
          // this.userDetail.user_favorite.forEach((e)=>{
          //   this.favorites.push(e.id);
          //   favorites.push(new FormControl(e.id.toString()));
          // });
          this.userDetail.user_favorite.forEach((e)=>{
            this.selectedOption.push(e.id.toString());
          });
          if(this.userDetail.address!=null)
          {
            this.address=this.userDetail.address.split('-');
            this.tinh=this.address[1];
            this.huyen=this.address[0];
          }
          console.log(this.address);
        },
        (error) => {
          console.log(error);
        }
      );
  }
  updateProfile() {
    console.log(this.form.value);
    this.body = {
      last_name: this.last_name,
      first_name: this.first_name,
      dob: this.dob,
      bio: this.bio,
      hometown: this.hometown,
      current_city: this.current_city,
      gender: this.gender,
      favoriteIds:this.form.get("favorites").value,
      avatar_image: '',
      address:this.form.get("huyen").value+"-"+this.form.get("tinh").value
    };
    console.log(this.body);
    if (this.selectedFile) {
      this.upload(this.selectedFile)
        .pipe(first())
        .subscribe(
          (response) => {
            this.image = response as FileResponse;
            this.body.avatar_image = this.image[0].id;
            this.updateInfo(this.body);
          },
          (error) => console.log(error)
        );
    } else {
      this.updateInfo(this.body);
    }
  }
  updateInfo(body: any) {
    this.http
      .post(`${this.baseUrl}/user/update`, body, {
        headers: this.headers,
      })
      .pipe(first())
      .subscribe(
        (response) => {
          this.status = 0;
          this.loadData();
          this.showSnackbarSucsess('Cập nhật hồ sơ thành công!','',1000);
        },
        (error) => {
          this.status = 1;
          this.showSnackbarError('Cập nhật hồ sơ thất bại!','',1000);
        }
      );
  }
  selectFile(event) {
    this.selectedFile = event.target.files[0];
    this.upload(this.selectedFile)
      .pipe(first())
      .subscribe(
        (response) => {
          this.image = response[0] as FileResponse;
          this.body = {
            avatar_image: this.image.id,
          };
          this.showSnackbarSucsess('Tải ảnh đại diện lên thành công!','',1000);
        },
        (error) =>
        {
          this.showSnackbarError('Tải ảnh đại diện lên thất bại','',1000);
        }
      );
  }
  upload(file: File) {
    let formData = new FormData();
    formData.append('files', this.selectedFile);
    return this.http.post(`${this.baseUrl}/upload`, formData);
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
