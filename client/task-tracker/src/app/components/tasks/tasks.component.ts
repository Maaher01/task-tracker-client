import { Component, Input } from '@angular/core';
import { Task } from 'src/app/models/task.interface';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss'],
})
export class TasksComponent {
  @Input() tasks!: Task[];
  @Input() title: string = '';

  constructor(public taskService: TaskService) {}
}
