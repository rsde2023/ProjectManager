import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Task {
  title: string;
  priority: string;
  status: string;
}

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './task-list.html',
  styleUrls: ['./task-list.css']
})
export class TaskListComponent {
  @Input() tasks: Task[] = [];

  
}