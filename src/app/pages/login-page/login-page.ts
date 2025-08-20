import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Authentication } from '../../auth-service';
import { Router } from '@angular/router';

interface User {
  username: '';
  password: '';
}

@Component({
  selector: 'app-login-page',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login-page.html',
  styleUrl: './login-page.css',
})
export class LoginPage {
  loginForm: FormGroup;
  user: User[] = [];

  // ngOnInit() {
  //   this.authServise.getData().subscribe({
  //     next: (response) => {
  //       this.user = response;
  //       console.log('Data recieved: ', response);
  //     },
  //     error: (error) => {
  //       console.error('Error fetching data: ', error);
  //     },
  //   });
  // }
  name = '';
  constructor(
    private fb: FormBuilder,
    private authServise: Authentication,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }
  get username() {
    return this.loginForm.get('username');
  }

  get password() {
    return this.loginForm.get('password');
  }

  onSubmit() {
    console.log(this.loginForm);

    if (this.loginForm.valid) {
      this.authServise.login(this.loginForm.value).subscribe({
        next: (response: any) => {
          if (!response.hasError) {
            this.name = response.result.username;
            console.log('username: ', this.name);

            sessionStorage.setItem('token', response.result.token);
            this.router.navigate(['/']);
          }
          console.log('Login data: ', response);
          response;
          this.loginForm.reset();
        },
        error: (err: any) => {
          console.error('Error adding item:', err);
        },
      });
    } else {
      console.log('is not validated');
      this.loginForm.markAllAsTouched();
    }
  }
}
