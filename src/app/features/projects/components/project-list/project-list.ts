import { Component } from '@angular/core';
import { TaskListComponent } from '../task-list/task-list';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-project-list',
  imports: [TaskListComponent, CommonModule],
  templateUrl: './project-list.html',
  styleUrl: './project-list.css',
})
export class ProjectListComponent {
  Projects = [
    {
      name: 'Project 1',
      description: 'This is the first project.',
      status: 'In Progress',
      tasks: [
        { title: 'task1', priority: 'High', status: 'In Progress' },
        { title: 'task2', priority: 'Low', status: 'pending' }
      ]
    },
     {
      name: 'Project 2',
      description: 'This is the second project.',
      status: 'completed',
      tasks: [
        { title: 'task1', priority: 'High', status: 'completed' }
      ]
    },
     {
      name: 'Project 3',
      description: 'This is the third project.',
      status: 'pending',
      tasks: [
        { title: 'task1', priority: 'Medium', status: 'pending' }
      ]
    }
  ];
}
