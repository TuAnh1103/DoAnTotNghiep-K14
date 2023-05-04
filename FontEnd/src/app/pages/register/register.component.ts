import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { first } from 'rxjs';
import { User } from 'src/app/core/models/user.model';
import { CustomvalidationService } from 'src/app/services/customvalidation.service';
import { AuthenticationDialogComponent } from 'src/app/shared/components/authentication-dialog/authentication-dialog.component';
import { CommonService } from 'src/app/shared/common.service';
import { MessageResponse } from 'src/app/core/models/message-response.ts';
import { Favorite } from 'src/app/core/models/favorite.model';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { ApiService } from 'src/app/core/service/api/api.service';
import { HelperService } from 'src/app/core/service/helper/helper.service';
import { AuthFirebaseService } from 'src/app/core/service/auth-firebase/auth-firebase.service';
import { MatOptionSelectionChange } from '@angular/material/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  private baseUrl:string;
  form:FormGroup;
  user:User;
  firstName:string;
  lastName:string;
  dob:Date;
  email:string;
  username:string;
  password:string;
  gender:string;
  password_confirmation:string;
  message?:string;
  messageResponse:MessageResponse;
  favoriteList: Favorite[];
  error:any[];
  selected:string[];
  fav = new FormControl('');
  city:any[];
  district:any[];
  tinh:any;
  huyen:any;
  constructor(private api:ApiService,private helper:HelperService,private auth:AuthFirebaseService,
    private snackBar: MatSnackBar,private dialog: MatDialog,
    private fb:FormBuilder,private http:HttpClient,
    private commonService:CommonService,private router:Router,
    private customValidator: CustomvalidationService) {
    this.baseUrl=this.commonService.webApiUrl;
    this.form=this.fb.group({
      firstName:['',Validators.required],
      lastName:['',Validators.required],
      dob:[null,Validators.required],
      email: ['', [Validators.required, Validators.email,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      gender:[],
      username:['',Validators.required,this.customValidator.userNameValidator.bind(this.customValidator)],
      password:['',Validators.compose([Validators.required, this.customValidator.patternValidator()])],
      password_confirmation:['',Validators.required],
      favorites: new FormControl(''),
      tinh:['',Validators.required],
      huyen:['',Validators.required]
    },
    {
      validator: this.customValidator.MatchPassword('password', 'password_confirmation'),
    });
    this.getAllCity();
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
  ngOnInit(): void {
    this.getAllFavorites();
    const ipnElement = document.querySelector('#ipnPassword')
    const btnElement = document.querySelector('#btnPassword')

    // step 2
    btnElement.addEventListener('click', function() {
      // step 3
      const currentType = ipnElement.getAttribute('type')
      // step 4
      ipnElement.setAttribute(
        'type',
        currentType === 'password' ? 'text' : 'password'
      )
    })
    const ipnElement1 = document.querySelector('#password_confirmation')
    const btnElement1 = document.querySelector('#btnPasswordConfim')

    // step 2
    btnElement1.addEventListener('click', function() {
      // step 3
      const currentType1 = ipnElement1.getAttribute('type')
      // step 4
      ipnElement1.setAttribute(
        'type',
        currentType1 === 'password' ? 'text' : 'password'
      )
    })
  }
  get f() { return this.form.controls; }
  onSubmit():void{
    this.message="";
    // this.auth.signup(this.email, 'Ta110301').then(data=>{
    //   this.api.createUser(data.user.uid, {
    //     name: this.username,
    //     email: this.email,
    //     uid: data.user.uid,
    //     conversations:[]
    //   }).then(()=>{
    //     localStorage.setItem('uid', data.user.uid)
    //      console.log("thanh cong");
    //   })
    // });
    console.log(this.form.value);

    const url=`${this.commonService.webApiUrl}/auth/register`;
    if(this.firstName&&this.lastName&&this.dob&&this.email&&this.gender&&this.username&&this.password)
    {
      this.showSnackbarSucsess('Mã xác thực đang được gửi đến email của bạn sau 10 giây....','Close','3000');
      this.http.post(url,this.form.value)
      .pipe(first())
      .subscribe(
        data=>{
          this.user = this.form.value;
          this.openDialog();
        },
        (error: HttpErrorResponse)=>{
          this.error=error.error;
          console.log(error);
          this.messageResponse=error.error;

          this.showSnackbarError(this.messageResponse.message,"",1000);
        }
      )
    }
    else{
      this.showSnackbarError("Bạn phải nhập đầy đủ các trường","",1000);
    }
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
  openDialog(){
    const dialogRef=this.dialog.open(AuthenticationDialogComponent,{
      hasBackdrop:false,
      data:{
        firstName:this.firstName,
        lastName:this.lastName,
        dob:this.dob,
        gender:this.gender,
        email:this.email,
        username:this.username,
        password:this.password,
        favoriteIds:this.form.get("favorites").value,
        address:this.huyen.name+"-"+this.tinh.name
      }
    });
  }
  showSnackbarSucsess(content, action, duration) {
    this.snackBar.open(content, action, {
      duration: 5000,
      verticalPosition: "top", // Allowed values are  'top' | 'bottom'
      horizontalPosition: "right",// Allowed values are 'start' | 'center' | 'end' | 'left' | 'right'
      panelClass: ["custom-style"]
  })}
  showSnackbarError(content, action, duration) {
    this.snackBar.open(content, action, {
      duration: 5000,
      verticalPosition: "top", // Allowed values are  'top' | 'bottom'
      horizontalPosition: "right",// Allowed values are 'start' | 'center' | 'end' | 'left' | 'right'
      panelClass: ["error-custom-style"]
  })}
}
