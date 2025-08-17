import { HttpClient, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MyService {
  private apiUrl = 'http://localhost:3000/posts'; // Replace with your actual API URL

  constructor(private http: HttpClient) {}

  getData(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }
  removeData(url: string) {
    return this.http.delete<any>(`${this.apiUrl}/${url}`);
  }
  postData(newItem: any) {
    return this.http.post(this.apiUrl, newItem);
  }
}
