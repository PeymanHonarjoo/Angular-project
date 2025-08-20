import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class Authentication {
  constructor(private http: HttpClient) {}
  apiUrl = 'http://192.168.180.181:1234/users/login';

  login(user: { username: string; password: string }) {
    return this.http.post(this.apiUrl, user);
  }
  isLoggedIn(): boolean {
    return !!sessionStorage.getItem('token');
  }
}
