import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(this.hasToken()); 
  isLoggedIn$ = this.loggedIn.asObservable();

  private apiUrl = `${environment.apiUrls}`;

  constructor(private http: HttpClient) {}

  register(user: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, user);
  }

  login(credentials: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials);
  }

  saveToken(token: string) {
    localStorage.setItem('token', token);
    this.loggedIn.next(true);  // Cập nhật trạng thái đăng nhập
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isLoggedIn(): boolean {
    const loggedIn = !!localStorage.getItem('token');  // Đồng bộ key "token"
    console.log('User logged in:', loggedIn);
    return loggedIn;
  }

  logout() {
    localStorage.removeItem('token');
    this.loggedIn.next(false); // Cập nhật trạng thái đăng xuất
  }

  private hasToken(): boolean {
    return !!localStorage.getItem('token');
  }
}
