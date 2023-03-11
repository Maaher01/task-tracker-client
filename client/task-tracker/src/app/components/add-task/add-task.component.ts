import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TaskService } from 'src/app/services/task.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss'],
})
export class AddTaskComponent implements OnInit {
  heading: string;
  public currentUser: any;
  public errorResponse!: string;
  public statusList = [
    { id: 'To Do', value: 'To Do' },
    { id: 'Ongoing', value: 'Ongoing' },
    { id: 'Done', value: 'Done' },
  ];

  addTaskForm = this.fb.group({
    title: new FormControl('', [Validators.required]),
    content: new FormControl(''),
    status: new FormControl('', [Validators.required]),
  });

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AddTaskComponent>,
    @Inject(MAT_DIALOG_DATA) data: any,
    public taskService: TaskService,
    public authService: AuthService
  ) {
    this.heading = data.heading;
  }

  ngOnInit(): void {
    this.authService.currentUser$.subscribe(
      (user) => (this.currentUser = user)
    );
  }

  addTask() {
    this.taskService
      .addTask(
        this.addTaskForm.value['title']!,
        this.addTaskForm.value['content']!,
        this.addTaskForm.value['status']!,
        this.currentUser.id!
      )
      .subscribe({
        next: () => {
          this.dialogRef.close();
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
