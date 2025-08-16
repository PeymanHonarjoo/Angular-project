import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login-page',
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './login-page.html',
  styleUrl: './login-page.css'
})
export class LoginPage {
loginForm: FormGroup;

constructor(private fb: FormBuilder){
  this.loginForm = this.fb.group({
    email: ['',[Validators.required,Validators.email]],
    password: ['',[Validators.required,Validators.minLength(6)]],
    mobile: ['', [Validators.required,Validators.pattern(/^09\d{9}$/) 
]]
  })
}

get email(){
  return this.loginForm.get("email")
}
get password(){
  return this.loginForm.get("password")
}
get mobile(){
  return this.loginForm.get("mobile")
}

onSubmit(){
  if (this.loginForm.valid) {
    console.log(this.loginForm.value);
    this.loginForm.reset();
  }
  else{
    console.log("is not validated");
    this.loginForm.markAllAsTouched();
  }
}
}
