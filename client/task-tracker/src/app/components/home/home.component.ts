import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { TaskService } from 'src/app/services/task.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AddTaskComponent } from '../add-task/add-task.component';
import { EditTaskComponent } from '../edit-task/edit-task.component';

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
    public taskService: TaskService,
    private dialog: MatDialog
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

  openDialogToAdd() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    dialogConfig.data = {
      heading: 'Add a new task',
    };

    this.dialog.open(AddTaskComponent, dialogConfig);
  }

  openDialogToEdit() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    dialogConfig.data = {
      heading: 'Edit Task',
    };

    this.dialog.open(EditTaskComponent, dialogConfig);
  }
}
