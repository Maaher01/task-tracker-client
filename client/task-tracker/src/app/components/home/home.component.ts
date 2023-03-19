import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { TaskService } from 'src/app/services/task.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AddTaskComponent } from '../add-task/add-task.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public currentUser: any;
  breakpoint: number;

  constructor(
    public authService: AuthService,
    public taskService: TaskService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.breakpoint = window.innerWidth <= 768 ? 1 : 1;
    this.authService.currentUser$.subscribe(
      (user) => (this.currentUser = user)
    );
    this.getUserTasks();
  }

  onResize(event) {
    this.breakpoint = event.target.innerWidth <= 768 ? 1 : 1;
  }

  getUserTasks() {
    this.taskService.getUserTasks(this.currentUser.id).subscribe();
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
}
