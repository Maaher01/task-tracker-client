import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, catchError, tap, BehaviorSubject } from 'rxjs';
import { User } from '../models/user.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private authUrl = 'http://localhost:3000/api/user';
  private currentUserSubject: BehaviorSubject<User | null>;
  public currentUser$: Observable<User | null>;

  constructor(private http: HttpClient, public router: Router) {
    this.currentUserSubject = new BehaviorSubject(
      this.getUserFromLocalStorage()
    );
    this.currentUser$ = this.currentUserSubject.asObservable();
  }

  register(user: any): Observable<any> {
    let signUpUrl = `${this.authUrl}/signup`;
    return this.http.post(signUpUrl, user).pipe(
      tap((res: any) => {
        this.setUser(res.data.user);
      }),
      catchError(this.handleError)
    );
  }

  login(user: any): Observable<any> {
    let loginUrl = `${this.authUrl}/login`;
    return this.http.post<any>(loginUrl, user).pipe(
      tap((res: any) => {
        this.setUser(res.data.user);
      }),
      catchError(this.handleError)
    );
  }

  logout() {
    localStorage.removeItem('user');
    this.currentUserSubject.next(null);
    this.router.navigateByUrl('/user/login');
  }

  resetUserPassword(payload: any) {
    let resetPasswordUrl = `${this.authUrl}/forgotpassword`;
    return this.http.patch<any>(resetPasswordUrl, payload).pipe(
      tap((res: any) => {
        localStorage.removeItem('user');
        this.router.navigateByUrl('/user/login');
      }),
      catchError(this.handleError)
    );
  }

  setUser(user: any): void {
    localStorage.setItem('user', JSON.stringify(user));
    this.currentUserSubject.next(user);
  }

  get isLoggedIn(): Boolean {
    const user = this.getUserFromLocalStorage();
    return user ? true : false;
  }

  getUserFromLocalStorage() {
    const token = localStorage.getItem('user');
    if (token) {
      return JSON.parse(token);
    }
    return null;
  }

  private handleError(response: HttpErrorResponse) {
    let errorResponse: any = {};
    errorResponse['status'] = response.status;
    errorResponse['message'] = response.error.error;
    return throwError(() => errorResponse);
  }
}
