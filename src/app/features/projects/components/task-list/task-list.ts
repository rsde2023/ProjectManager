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

  getStatusColor(status: string): string {
    switch(status) {
      case 'pending': return 'border-yellow-500 bg-yellow-50';
      case 'In Progress': return 'border-blue-500 bg-blue-50';
      case 'completed': return 'border-green-500 bg-green-50';
      default: return 'border-gray-500 bg-gray-50';
    }
  }

  getPriorityBadge(priority: string): string {
    switch(priority) {
      case 'High': return 'bg-red-100 text-red-800';
      case 'Medium': return 'bg-orange-100 text-orange-800';
      case 'Low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  }
}