import { Component } from '@angular/core';
import { TaskListComponent } from '../task-list/task-list';
import { CommonModule } from '@angular/common';
import { Details } from '../details/details';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-project-list',
  imports: [TaskListComponent, CommonModule, Details, FormsModule],
  templateUrl: './project-list.html',
  styleUrl: './project-list.css',
})
export class ProjectListComponent {
  selectedProject: Project | null = null;
  //method to update selected project when a project is clicked
  selectProject(project: Project) {
    console.log("Clicked project:", project);
    this.selectedProject = project;
  }
  closeModal() {
    console.log("closeModal() called in ProjectListComponent - THIS SHOULD APPEAR");
    console.log("Setting selectedProject to null");
    this.selectedProject = null;
  }
statusConfigs: Record<string, StatusStyle> = {
  'completed': {
    bgColor: '#22c55e',    // green-500
    badgeBg: '#dcfce7',    // green-100
    badgeText: '#15803d',  // green-700
    label: 'Completed'
  },
  'pending': {
    bgColor: '#f97316',    // orange-500
    badgeBg: '#ffedd5',    // orange-100
    badgeText: '#c2410c',  // orange-700
    label: 'Pending'
  },
  'In Progress': {
    bgColor: '#3b82f6',    // blue-500
    badgeBg: '#dbeafe',    // blue-100
    badgeText: '#1d4ed8',  // blue-700
    label: 'In Progress'
  }
};
  // Helper method to get status config
  getStatusConfig(status: string): StatusStyle {
    return this.statusConfigs[status] || this.statusConfigs['pending'];
  }
  searchTerm: string = '';
  get filteredProjects(): Project[] {
    if (!this.searchTerm.trim()) return this.Projects;
    return this.Projects.filter(p =>
      p.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }
  Projects: Project[] = [
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
      name: 'project management',
      description: 'A web app that helps teams manage, lead and track projects with task assignments, progress visualization, and collaboration features.',
      status: 'In Progress',
      tasks: []
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
