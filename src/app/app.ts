import { Component, OnInit } from '@angular/core';
import { ProjectListComponent } from './features/projects/components/project-list/project-list';
import { AddProjectComponent } from './features/projects/components/add-project/add-project';
import { CommonModule } from '@angular/common';
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
  // Ouvrir le modal
  openAddProjectModal() {
    this.showModal = true;
  }

  // Fermer le modal
  closeModal() {
    this.showModal = false;
  }
  ngOnInit() {
    // Charger les projets depuis localStorage au démarrage
    const savedProjects = localStorage.getItem('projects');
    if (savedProjects) {
      this.projects = JSON.parse(savedProjects);
    }
  }

  onProjectAdded(project: Project) {
    this.projects.push(project);
    this.saveProjectsToLocalStorage();
     this.closeModal(); 
  }
  onProjectDeleted(projectId: number) {
    // Filtrer pour supprimer le projet avec l'ID correspondant
    this.projects = this.projects.filter(project => project.id !== projectId);
    this.saveProjectsToLocalStorage();
    console.log(`Projet avec l'ID ${projectId} supprimé`);
  }

  onProjectUpdated(updatedProject: Project) {
    // Trouver et mettre à jour le projet
    const index = this.projects.findIndex(p => p.id === updatedProject.id);
    if (index !== -1) {
      this.projects[index] = updatedProject;
      this.saveProjectsToLocalStorage();
      console.log('Projet mis à jour:', updatedProject);
    }
  }

  private saveProjectsToLocalStorage() {
    localStorage.setItem('projects', JSON.stringify(this.projects));
  }
}