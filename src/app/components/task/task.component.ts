import { Component, Input } from '@angular/core';
import { Task } from 'src/app/models/task.interface';
import { EditTaskComponent } from '../edit-task/edit-task.component';
import { DeleteTaskComponent } from '../delete-task/delete-task.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
})
export class TaskComponent {
  @Input() task!: Task;

  constructor(private dialog: MatDialog) {}

  openDialogToEdit(task: Task) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    dialogConfig.data = {
      heading: 'Edit Task',
      task: task,
    };

    this.dialog.open(EditTaskComponent, dialogConfig);
  }

  openDialogToDelete(task: Task) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    dialogConfig.data = {
      heading: 'Confirmation',
      body: 'Are you sure you want to delete this task?',
      task: task,
    };

    this.dialog.open(DeleteTaskComponent, dialogConfig);
  }
}
