import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-delete-task',
  templateUrl: './delete-task.component.html',
  styleUrls: ['./delete-task.component.scss'],
})
export class DeleteTaskComponent {
  heading: string;
  body: string;
  public errorResponse!: string;

  constructor(
    private dialogRef: MatDialogRef<DeleteTaskComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public taskService: TaskService
  ) {
    this.heading = data.heading;
    this.body = data.body;
  }

  deleteTask(id: number) {
    this.taskService.deleteTask(id).subscribe({
      next: () => {
        this.dialogRef.close();
        window.location.reload();
      },
      error: (err) => {
        this.errorResponse = err.message;
      },
    });
  }

  close() {
    this.dialogRef.close();
  }
}
