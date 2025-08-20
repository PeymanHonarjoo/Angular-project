import { Component } from '@angular/core';
import { Router, RouterModule, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { Authentication } from '../../auth-service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-header',
  imports: [RouterModule, NgIf],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  isUserLoggedIn = false;
  constructor(private authService: Authentication, private router: Router) {}
  ngOnInit() {
    this.isUserLoggedIn = this.authService.isLoggedIn();
    this.router.events.pipe(filter((event) => event instanceof NavigationEnd)).subscribe(() => {
      this.isUserLoggedIn = this.authService.isLoggedIn();
    });
  }
  logOut() {
    sessionStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}
