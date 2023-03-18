import { FileResponse } from './../../core/models/file-response.model';
import { first } from 'rxjs';
import { CommonService } from 'src/app/shared/common.service';
import { HttpClient } from '@angular/common/http';
import { Form, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

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
  gender:string;
  hometown: any;
  current_city: any;
  selectedFile: File;
  baseUrl = '';
  body:any;
  image:FileResponse;
  status:number;
  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private commonService: CommonService
  ) {
    this.form = this.fb.group({
      last_name: ['', Validators.required],
      first_name: ['', Validators.required],
      dob: ['', Validators.required],
      bio: ['', Validators.required],
      hometown: [''],
      current_city: [''],
      gender:['',Validators.required]
    });
    this.baseUrl = this.commonService.webApiUrl;
  }

  ngOnInit(): void {
  }
  updateProfile() {
    this.body={
      last_name:this.last_name,
      first_name:this.first_name,
      dob:this.dob,
      bio:this.bio,
      hometown:this.hometown,
      current_city:this.current_city,
      gender:this.gender,
      avatar_image:""
    };
    if (this.selectedFile) {
      console.log("ok");
      this.upload(this.selectedFile)
      .pipe(first())
      .subscribe(
        (response)=>{
          this.image=response as FileResponse;
          this.body.avatar_image=this.image[0].id;
          this.updateInfo(this.body);
        },
        (error)=>console.log(error)
      )
    }
    else{
      console.log(this.body);
      this.updateInfo(this.body);
    }
  }
  updateInfo(body:any) {
    this.http.post(`${this.baseUrl}/user/update`, body, {
      headers: this.commonService.createHeadersOption(
        localStorage.getItem('token')
      ),
    })
    .pipe(first())
    .subscribe(
      (response)=>{
        this.status=0;
        console.log("ok update");
      },
      (error)=>{
        this.status=1;
        console.log(error);
      }
    );
  }
  selectFile(event) {
    this.selectedFile = event.target.files[0];
  }
  upload(file: File) {
    let formData = new FormData();
    formData.append('files', this.selectedFile);
    return this.http.post(`${this.baseUrl}/upload`, formData);
  }
}
