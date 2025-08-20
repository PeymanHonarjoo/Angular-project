import { HttpClient, HttpRequest, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, pipe, catchError, of } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class MyService {
  private apiUrl = 'http://192.168.180.181:1234';

  constructor(private http: HttpClient, private toastr: ToastrService, private router: Router) {}

  private getToken() {
    const token = sessionStorage.getItem('token');
    console.log(token);

    return token;
  }
  private getHeader(): HttpHeaders {
    let headers = new HttpHeaders();

    if (headers) {
      headers = headers.set('Authorization', `Bearer ${this.getToken()}`);
      console.log(headers);
    }

    return headers;
  }

  handleError(err: any) {
    const errorStatus = err.status;
    const errMessage = err.message;
    this.toastr.error(errMessage, `Error ${errorStatus}`);
    if (errorStatus == 401) {
      this.router.navigate(['/login']);
      sessionStorage.removeItem('token');
    }
  }

  getData(url: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${url}`, { headers: this.getHeader() }).pipe(
      catchError((err: any) => {
        this.handleError(err);
        console.error(err);
        return of(null);
      })
    );
  }
  removeData(url: string) {
    return this.http.delete<any>(`${this.apiUrl}/${url}`, { headers: this.getHeader() }).pipe(
      catchError((err: any) => {
        this.handleError(err);
        console.error(err);
        return of(null);
      })
    );
  }
  postData(url: string, newItem: any) {
    return this.http.post(`${this.apiUrl}/${url}`, newItem, { headers: this.getHeader() }).pipe(
      catchError((err: any) => {
        this.handleError(err);
        console.error(err);
        return of(null);
      })
    );
  }
}
