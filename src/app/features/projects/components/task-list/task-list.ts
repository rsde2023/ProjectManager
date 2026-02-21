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
  priorityClasses: Record<string, string> = {
    'High': 'bg-red-100 text-red-800',
    'Medium': 'bg-orange-100 text-orange-800',
    'Low': 'bg-green-100 text-green-800'
  };
 statusClasses: Record<string, string> = {
    pending: 'bg-yellow-100 text-yellow-800',
    'In Progress': 'bg-blue-100 text-blue-800',
    completed: 'bg-green-100 text-green-800'
  };
  
}