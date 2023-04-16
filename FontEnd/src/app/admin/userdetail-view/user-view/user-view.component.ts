import { first } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Favorite } from 'src/app/core/models/favorite.model';
import { FileResponse } from 'src/app/core/models/file-response.model';
import { UserDetail } from 'src/app/core/models/user-detail';
import { UserService } from 'src/app/core/service/user.service';
import { CommonService } from 'src/app/shared/common.service';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-view',
  templateUrl: './user-view.component.html',
  styleUrls: ['./user-view.component.scss']
})
export class UserViewComponent implements OnInit {

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
  me:string;
  favorites:any=[];
  private headers: any;
  constructor(
    private snackBar: MatSnackBar,
    private fb: FormBuilder,
    private http: HttpClient,
    private commonService: CommonService,
    private userService: UserService,
    private route:ActivatedRoute
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
    this.route.paramMap.subscribe((params) => {
      this.me = params.get('userId');
    this.getAllFavorites();
    this.loadData(this.me);
    })
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
  loadData(id:string) {
    this.userService
      .getUserDetal(`${this.baseUrl}/user/id/${id}`, { headers: this.headers })
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
          this.userDetail.user_favorite.forEach((e)=>{
            this.favorites.push(e.id);

          });
          console.log(this.favorites);
        },
        (error) => {
          console.log(error);
        }
      );
  }

}
