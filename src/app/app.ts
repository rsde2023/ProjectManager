import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { ProjectListComponent } from './features/projects/components/project-list/project-list';
import { AddProjectComponent } from './features/projects/components/add-project/add-project';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Project } from './models/project.model';

@Component({
  selector: 'app-root',
  imports: [ProjectListComponent, AddProjectComponent, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  showModal = false;
  projects: Project[] = [];
  title = 'project-manager';

  // Injection du platformId
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  // Ouvrir le modal
  openAddProjectModal() {
    this.showModal = true;
  }

  // Fermer le modal
  closeModal() {
    this.showModal = false;
  }

  ngOnInit() {
    // Protection SSR ici
    if (isPlatformBrowser(this.platformId)) {
      const savedProjects = localStorage.getItem('projects');
      if (savedProjects) {
        this.projects = JSON.parse(savedProjects);
      }
    }
  }

  onProjectAdded(project: Project) {
    this.projects.push(project);
    this.saveProjectsToLocalStorage();
    this.closeModal(); 
  }

  onProjectDeleted(projectId: number) {
    this.projects = this.projects.filter(project => project.id !== projectId);
    this.saveProjectsToLocalStorage();
    console.log(`Projet avec l'ID ${projectId} supprimé`);
  }

  private saveProjectsToLocalStorage() {
    // Protection SSR ici aussi
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('projects', JSON.stringify(this.projects));
    }
  }
}