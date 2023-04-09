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
  favoriteList: Favorite[];
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
      favorites: this.fb.array([], Validators.required)
    });
    this.baseUrl = this.commonService.webApiUrl;
    this.headers = this.commonService.createHeadersOption(
      localStorage.getItem('token')
    );
  }

  ngOnInit(): void {
    this.loadData();
    this.getAllFavorites();
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
  }
  loadData() {
    this.userService
      .getUserDetal(`${this.baseUrl}/user/me`, { headers: this.headers })
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
    };
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
