import { HttpClient, HttpRequest, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MyService {
  private apiUrl = 'http://192.168.180.181:1234';

  constructor(private http: HttpClient) {}

  private getToken() {
    const token = sessionStorage.getItem('token');
    console.log(token);

    return token;
  }
  private getHeader(): HttpHeaders {
    let headers = new HttpHeaders();

    headers = headers.set('Authorization', `Bearer ${this.getToken()}`);
    console.log(headers);

    return headers;
  }

  getData(url: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${url}`, { headers: this.getHeader() });
  }
  removeData(url: string) {
    return this.http.delete<any>(`${this.apiUrl}/${url}`, { headers: this.getHeader() });
  }
  postData(url: string, newItem: any) {
    return this.http.post(`${this.apiUrl}/${url}`, newItem, { headers: this.getHeader() });
  }
}
