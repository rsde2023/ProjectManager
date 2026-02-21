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
      name: 'Smart Task Tracker',
      description: 'A web app that helps teams create, assign, and track tasks with priorities, deadlines, and progress visualization.',
      status: 'In Progress',
      tasks: [
        { title: 'Design database schema', priority: 'High', status: 'In Progress' },
        { title: 'Setup project repository', priority: 'Low', status: 'pending' }
      ]
    },
     {
      name: 'E-Commerce Website Launch',
      description: 'A responsive e-commerce website with product listings, shopping cart, and checkout functionality.',
      status: 'completed',
      tasks: [
        { title: 'UI Design', priority: 'High', status: 'completed' },
        { title: 'Market research', priority: 'Medium', status: 'completed' }

      ]
    },
     {
      name: 'Bug Tracking System',
      description: 'latform to report and manage software bugs.',
      status: 'pending',
      tasks: [
        { title: 'Setup project repository', priority: 'High', status: 'pending' },
        { title: 'Create bug reporting module', priority: 'Medium', status: 'pending' },
          { title: 'Content creation', priority: 'Low', status: 'pending' }, 
            { title: 'Testing and QA', priority: 'Medium', status: 'pending' }

      ]
    }
  ];
}
