import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, map, throwError } from 'rxjs';
import { Task } from '../models/task.interface';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private taskUrl = 'http://localhost:3000/api/task';
  public currentUser: any;

  constructor(private http: HttpClient, private authService: AuthService) {
    this.authService.currentUser$.subscribe(
      (user) => (this.currentUser = user)
    );
  }

  getUserTasks(id: number): Observable<any> {
    return this.http.post<any>(this.taskUrl, { userid: id }).pipe(
      map((res) => res.data),
      catchError(this.handleError)
    );
  }

  addTask(
    title: string,
    content: string,
    status: string,
    id: number
  ): Observable<any> {
    return this.http
      .post<any>(`${this.taskUrl}/add`, {
        title: title,
        content: content,
        status: status,
        userid: id,
      })
      .pipe(catchError(this.handleError));
  }

  editTask(task: Partial<Task>, id: number): Observable<any> {
    return this.http
      .put<any>(`${this.taskUrl}/${id}`, task)
      .pipe(catchError(this.handleError));
  }

  deleteTask(id: number): Observable<any> {
    return this.http
      .delete<any>(`${this.taskUrl}/${id}`)
      .pipe(catchError(this.handleError));
  }

  private handleError(response: HttpErrorResponse) {
    let errorResponse: any = {};
    errorResponse['status'] = response.status;
    errorResponse['message'] = response.error.error;
    return throwError(() => errorResponse);
  }
}
