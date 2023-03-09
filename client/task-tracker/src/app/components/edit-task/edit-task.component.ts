import { Component, Inject } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TaskService } from 'src/app/services/task.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.scss'],
})
export class EditTaskComponent {
  heading: string;
  public currentUser: any;
  public errorResponse!: string;

  editTaskForm = this.fb.group({
    title: new FormControl('', [Validators.required]),
    content: new FormControl(''),
    status: new FormControl('', [Validators.required]),
  });

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<EditTaskComponent>,
    @Inject(MAT_DIALOG_DATA) data: any,
    public taskService: TaskService,
    public authService: AuthService
  ) {
    this.heading = data.heading;
  }

  editTask() {}

  close() {
    this.dialogRef.close();
  }
}
