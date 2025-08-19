import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MyService } from '../../my-service';
import { Router } from '@angular/router';

interface User {
  id: '';
  name: '';
  email: '';
  password: '';
  mobile: '';
}

@Component({
  selector: 'app-form-page',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './form-page.html',
  styleUrl: './form-page.css',
})
export class FormPage {
  loginForm: FormGroup;
  user: User[] = [];

  ngOnInit() {
    this.myService.getData('users').subscribe({
      next: (response) => {
        this.user = response;
        console.log('Data recieved: ', response);
      },
      error: (error) => {
        console.error('Error fetching data: ', error);
      },
    });
  }

  constructor(private fb: FormBuilder, private myService: MyService, private router: Router) {
    this.loginForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      mobile: ['', [Validators.required, Validators.pattern(/^09\d{9}$/)]],
    });
  }
  get name() {
    return this.loginForm.get('name');
  }
  get email() {
    return this.loginForm.get('email');
  }
  get password() {
    return this.loginForm.get('password');
  }
  get mobile() {
    return this.loginForm.get('mobile');
  }

  onSubmit() {
    console.log(this.loginForm);

    if (this.loginForm.valid) {
      const maxId =
        this.user && this.user.length > 0 ? Math.max(...this.user.map((u) => +u.id)) : -1;

      const newId = (maxId + 1).toString();
      const formValue = { id: newId, ...this.loginForm.value };

      this.myService.postData('users', formValue).subscribe({
        next: (response) => {
          console.log('Login data: ', response);
          this.loginForm.reset();
          this.router.navigate(['/about']);
        },
        error: (err) => {
          console.error('Error adding item:', err);
        },
      });
    } else {
      console.log('is not validated');
      this.loginForm.markAllAsTouched();
    }
  }
}
