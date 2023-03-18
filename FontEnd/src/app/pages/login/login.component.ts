import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { first } from 'rxjs';
import { AuthService } from 'src/app/core/auth/auth.service';
import { LoginModel, Token } from 'src/app/core/models/login.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form:FormGroup;
  loginModel:LoginModel;
  accesstoken:Token;
  error:any;
  constructor(private fb:FormBuilder,private authService:AuthService,private router:Router) {
    this.form=this.fb.group({
      username:['',Validators.required],
      password:['',Validators.required]
    });
  }
  onSubmit()
  {
      this.loginModel=this.form.value;
      if(this.loginModel.username && this.loginModel.password){
        this.authService.login(this.loginModel)
        .pipe(first())
        .subscribe(
          data=>{
            console.log("User is logged");
            this.accesstoken=data as Token;
            console.log(this.accesstoken);
            localStorage.setItem("token",this.accesstoken.jwtToken);
            if(localStorage.getItem("token"))
            {
              console.log(localStorage.getItem("token"));
            this.router.navigateByUrl("/home");
            }
            else{
              this.router.navigateByUrl("/login");
            }
          },
          error=>{
            this.error="Username or password doesn't exist.Please check again!";
          }
        );
      }
      else{
          this.error="Username and password doesn't blank!";
      }
  }
  ngOnInit(): void {

  }
}
