import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.scss'],
})
export class EditTaskComponent implements OnInit {
  heading: string;
  public errorResponse!: string;
  public statusList = [
    { id: 'To Do', value: 'To Do' },
    { id: 'Ongoing', value: 'Ongoing' },
    { id: 'Done', value: 'Done' },
  ];

  editTaskForm = this.fb.group({
    title: new FormControl('', [Validators.required]),
    content: new FormControl(''),
    status: new FormControl('', [Validators.required]),
  });

  ngOnInit(): void {
    this.editTaskForm.patchValue({
      title: this.data.task.title,
      content: this.data.task.content,
      status: this.data.task.status,
    });
  }

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<EditTaskComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public taskService: TaskService
  ) {
    this.heading = data.heading;
  }

  editTask(id: number) {
    const payload = {
      title: this.editTaskForm.controls['title'].value!,
      content: this.editTaskForm.controls['content'].value!,
      status: this.editTaskForm.controls['status'].value!,
    };
    this.taskService.editTask(payload, id).subscribe({
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
