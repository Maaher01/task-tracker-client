import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public currentUser: any;
  public userTasks$: any;

  constructor(
    public authService: AuthService,
    public taskService: TaskService
  ) {}

  ngOnInit(): void {
    this.authService.currentUser$.subscribe(
      (user) => (this.currentUser = user)
    );
    this.getUserTasks();
  }

  getUserTasks() {
    this.userTasks$ = this.taskService.getUserTasks(this.currentUser.id);
  }
}
