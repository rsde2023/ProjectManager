import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Project, StatusStyle } from '../../../../models/project.model';
import { TaskListComponent } from '../task-list/task-list';
import { Details } from '../details/details';
import { EditProjectComponent } from '../edit-project/edit-project';


@Component({
  selector: 'app-project-list',
  standalone: true,
  imports: [CommonModule, FormsModule, TaskListComponent, Details, EditProjectComponent],
  templateUrl: './project-list.html',
  styleUrls: ['./project-list.css']
})
export class ProjectListComponent implements OnChanges {
  @Input() projects: Project[] = [];
  @Output() projectDeleted = new EventEmitter<number>();
  @Output() projectUpdated = new EventEmitter<Project>();
  selectedProject: Project | null = null;
   projectToEdit: Project | null = null;
  searchTerm: string = '';
  filteredProjects: Project[] = [];

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

 deleteProject(projectId: number, event: Event) {
    event.stopPropagation(); // Empêche la sélection du projet quand on clique sur supprimer
    if (confirm('Êtes-vous sûr de vouloir supprimer ce projet ?')) {
      this.projectDeleted.emit(projectId);
    }
  }

  // Ouvrir le formulaire d'édition
  editProject(project: Project, event: Event) {
    event.stopPropagation(); // Empêche l'ouverture des détails
    this.projectToEdit = project;
  }

  // Fermer le formulaire d'édition
  closeEditModal() {
    this.projectToEdit = null;
  }

  // Mettre à jour le projet après édition
  updateProject(updatedProject: Project) {
    this.projectUpdated.emit(updatedProject);
    this.closeEditModal();
  }

  getStatusConfig(status: string): StatusStyle {
    return this.statusConfigs[status] || this.statusConfigs['pending'];
  }
}