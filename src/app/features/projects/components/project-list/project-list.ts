import { Component, OnChanges, SimpleChanges, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Project, StatusStyle } from '../../../../models/project.model';
import { TaskListComponent } from '../task-list/task-list';
import { Details } from '../details/details';
import { EditProjectComponent } from '../edit-project/edit-project';
import { AddProjectComponent } from '../add-project/add-project';

@Component({
  selector: 'app-project-list',
  standalone: true,
  imports: [CommonModule, FormsModule, TaskListComponent, Details, EditProjectComponent, AddProjectComponent],
  templateUrl: './project-list.html',
  styleUrls: ['./project-list.css']
})
export class ProjectListComponent implements OnChanges, OnInit {
  
  projects: Project[] = []; 
  selectedProject: Project | null = null;
  projectToEdit: Project | null = null;
  searchTerm: string = '';
  filteredProjects: Project[] = [];
  showModal = false;  
 activeMenuId: number | null = null;
  statusConfigs: Record<string, StatusStyle> = {
    'pending': {
      badgeBg: 'bg-yellow-50',
      badgeText: 'text-yellow-600',
      label: 'Pending'
    },
    'In Progress': {
      badgeBg: 'bg-blue-50',
      badgeText: 'text-blue-600',
      label: 'In Progress'
    },
    'completed': {
      badgeBg: 'bg-green-50',
      badgeText: 'text-green-600',
      label: 'Completed'
    }
  };

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit() {
    // Charger les projets depuis localStorage
    if (isPlatformBrowser(this.platformId)) {
      const savedProjects = localStorage.getItem('projects');
      if (savedProjects) {
        this.projects = JSON.parse(savedProjects);
        this.filterProjects();
      } else {
        // Projets par défaut si vide
        this.projects = [];
        this.filterProjects();
      }
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['projects']) {
      this.filterProjects();
    }
  }

  filterProjects() {
    if (!this.searchTerm.trim()) {
      this.filteredProjects = this.projects;
    } else {
      const term = this.searchTerm.toLowerCase();
      this.filteredProjects = this.projects.filter(p =>
        p.name.toLowerCase().includes(term) ||
        p.description.toLowerCase().includes(term)
      );
    }
  }

  onSearchChange() {
    this.filterProjects();
  }

  selectProject(project: Project) {
    this.selectedProject = project;
  }

  closeModal() {
    this.selectedProject = null;
  }

  // Méthodes pour le modal d'ajout
  openAddProjectModal() {
    this.showModal = true;
  }

  closeAddModal() {
    this.showModal = false;
  }

  onProjectAdded(project: Project) {
    this.projects.push(project);
    this.saveProjectsToLocalStorage();
    this.filterProjects();
    this.closeAddModal();
  }
  closeMenu() {
    this.activeMenuId = null;
  }

  // méthode pour ouvrir/fermer le menu
  toggleMenu(projectId: number, event: Event) {
    event.stopPropagation();
    if (this.activeMenuId === projectId) {
      this.activeMenuId = null;
    } else {
      this.activeMenuId = projectId;
    }
  }
  deleteProject(projectId: number, event: Event) {
    event.stopPropagation();
    if (confirm('Êtes-vous sûr de vouloir supprimer ce projet ?')) {
      this.projects = this.projects.filter((project) => project.id !== projectId);
      this.saveProjectsToLocalStorage();
      this.filterProjects();
      console.log(`Projet avec l'ID ${projectId} supprimé`);
      this.activeMenuId = null; 
    }
  }

  editProject(project: Project, event: Event) {
    event.stopPropagation();
    this.projectToEdit = project;
    this.activeMenuId = null;
  }

  closeEditModal() {
    this.projectToEdit = null;
  }

  updateProject(updatedProject: Project) {
    const index = this.projects.findIndex((p) => p.id === updatedProject.id);
    if (index !== -1) {
      this.projects[index] = updatedProject;
      this.saveProjectsToLocalStorage();
      this.filterProjects();
    }
    this.closeEditModal();
  }

  private saveProjectsToLocalStorage() {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('projects', JSON.stringify(this.projects));
    }
  }

  getStatusConfig(status: string): StatusStyle {
    return this.statusConfigs[status] || this.statusConfigs['pending'];
  }
}