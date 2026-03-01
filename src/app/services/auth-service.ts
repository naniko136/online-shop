import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, catchError, tap, throwError } from 'rxjs';
import { ILoginRequest, IRegisterRequest } from '../models/auth';
import { Cartservice } from './cartservice';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private Cartservice = inject(Cartservice);
  private http = inject(HttpClient);
  private router = inject(Router);
  private apiUrl = 'https://api.everrest.educata.dev/auth';
  private isLoggedInSubject = new BehaviorSubject<boolean>(!!localStorage.getItem('token'));

  isLoggedIn$ = this.isLoggedInSubject.asObservable();

  signIn(data: ILoginRequest) {
    return this.http.post<{ access_token: string }>(`${this.apiUrl}/sign_in`, data).pipe(
      tap((response) => {
        const token = response.access_token;
        localStorage.setItem('token', token);

        const payload = JSON.parse(atob(token.split('.')[1]));
        localStorage.setItem('userId', payload._id);

        this.isLoggedInSubject.next(true);
      }),
      catchError((error) => {
        return throwError(() => error);
      }),
    );
  }

  register(data: IRegisterRequest) {
    return this.http.post(`${this.apiUrl}/sign_up`, data).pipe(
      catchError((error) => {
        return throwError(() => error);
      }),
    );
  }

  logOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    this.Cartservice.clearCart();

    this.isLoggedInSubject.next(false);
    this.router.navigate(['/log-in']);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }
}
