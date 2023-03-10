import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, map, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private taskUrl = 'http://localhost:3000/api/task';

  constructor(private http: HttpClient) {}

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

  editTask(
    title: string,
    content: string,
    status: string,
    id: number
  ): Observable<any> {
    return this.http
      .put<any>(this.taskUrl, {
        title: title,
        content: content,
        status: status,
        id: id,
      })
      .pipe(catchError(this.handleError));
  }

  // deleteTask(id: number) {
  //   return this.http
  //     .delete<any>(`${this.taskUrl}/:id`, { id: id })
  //     .pipe(catchError(this.handleError));
  // }

  private handleError(response: HttpErrorResponse) {
    let errorResponse: any = {};
    errorResponse['status'] = response.status;
    errorResponse['message'] = response.error.error;
    return throwError(() => errorResponse);
  }
}
