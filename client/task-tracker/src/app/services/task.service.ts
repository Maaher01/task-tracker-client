import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, tap, throwError, BehaviorSubject } from 'rxjs';
import { Task } from '../models/task.interface';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private taskUrl = 'http://localhost:3000/api/task';
  private todoTasksSubject = new BehaviorSubject<Task[]>([]);
  public todoTasks$!: Observable<Task[]>;
  private ongoingTasksSubject = new BehaviorSubject<Task[]>([]);
  public ongoingTasks$!: Observable<Task[]>;
  private doneTasksSubject = new BehaviorSubject<Task[]>([]);
  public doneTasks$!: Observable<Task[]>;

  constructor(private http: HttpClient) {
    this.todoTasks$ = this.todoTasksSubject.asObservable();
    this.ongoingTasks$ = this.ongoingTasksSubject.asObservable();
    this.doneTasks$ = this.doneTasksSubject.asObservable();
  }

  getUserTasks(id: number): Observable<Task[]> {
    return this.http.post<any>(this.taskUrl, { userid: id }).pipe(
      tap((res) => {
        const tasks = res.data;
        let todoTasks: Task[] = [];
        let ongoingTasks: Task[] = [];
        let doneTasks: Task[] = [];
        tasks.forEach((task: Task) => {
          if (task.status === 'To Do') {
            todoTasks.push(task);
          } else if (task.status === 'Ongoing') {
            ongoingTasks.push(task);
          } else if (task.status === 'Done') {
            doneTasks.push(task);
          }
        });
        this.todoTasksSubject.next(todoTasks);
        this.ongoingTasksSubject.next(ongoingTasks);
        this.doneTasksSubject.next(doneTasks);
      }),
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
