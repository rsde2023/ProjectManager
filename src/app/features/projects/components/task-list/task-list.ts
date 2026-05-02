import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HighlightStatusDirective } from '../../../../core/directives/highlight-status.directive';
import { PriorityColorPipe } from '../../../../core/pipes/priority-color.pipe';
import { Task, PriorityStyle, StatusStyle } from '../../../../models/project.model';
@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, HighlightStatusDirective, PriorityColorPipe],
  templateUrl: './task-list.html',
  styleUrls: ['./task-list.css'],
})
export class TaskListComponent {
  @Input() tasks: Task[] = [];
  // Priority configurations
  priorityConfigs: Record<string, PriorityStyle> = {
    High: { bgClass: 'bg-red-200', textClass: 'text-red-600' },
    Medium: { bgClass: 'bg-orange-200', textClass: 'text-orange-600' },
    Low: { bgClass: 'bg-green-200', textClass: 'text-green-600' },
  };

  // Shared status configurations
  statusConfigs: Record<string, StatusStyle> = {
    pending: {
      badgeBg: 'bg-yellow-50',
      badgeText: 'text-yellow-600',
      dotClass: 'bg-yellow-400',
      label: 'Pending',
    },
    'In Progress': {
      badgeBg: 'bg-blue-50',
      badgeText: 'text-blue-600',
      dotClass: 'bg-blue-400',
      label: 'In Progress',
    },
    completed: {
      badgeBg: 'bg-green-50',
      badgeText: 'text-green-600',
      dotClass: 'bg-green-400',
      label: 'Completed',
    },
  };

  getPriorityConfig(priority: string): PriorityStyle {
    return this.priorityConfigs[priority] || this.priorityConfigs['Low'];
  }

  getStatusConfig(status: string): StatusStyle {
    return this.statusConfigs[status] || this.statusConfigs['pending'];
  }
}
