import { Component, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Project, Task } from '../../../../models/project.model';

@Component({
  selector: 'app-add-project',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './add-project.html',
})
export class AddProjectComponent {
  errorMessage: string = ''; // Message d'erreur global
  
  @Output() close = new EventEmitter<void>();
  @Output() projectAdded = new EventEmitter<Project>();
  
  newProject = {
    name: '',
    description: '',
    status: ''
  };

  newTask = {
    title: '',
    priority: 'Medium',
    status: 'pending'
  };

  tasks: Task[] = [];
  successMessage: string = '';

  // Ajouter une tâche
  addTask() {
    if (this.newTask.title.trim()) {
      this.tasks.push({
        title: this.newTask.title,
        priority: this.newTask.priority,
        status: this.newTask.status as any
      });
      // Réinitialiser le formulaire de tâche après ajout
      this.newTask = {
        title: '',
        priority: 'Medium',
        status: 'pending'
      };
    }
  }

 

  // Réinitialiser complètement le formulaire
  private resetForm() {
    this.newProject = {
      name: '',
      description: '',
      status: ''
    };
    this.newTask = {
      title: '',
      priority: 'Medium',
      status: 'pending'
    };
    this.tasks = [];
    this.successMessage = '';
    this.errorMessage = '';
  }

  // Supprimer une tâche
  removeTask(index: number) {
    this.tasks.splice(index, 1);
  }

  closeModal() {
    this.close.emit();
  }

  // Soumettre le formulaire
  onSubmit() {
    // Réinitialiser le message d'erreur
    this.errorMessage = '';
    
    // Validation des champs requis
    if (!this.newProject.name.trim()) {
      this.errorMessage = 'Le nom du projet est obligatoire';
      return;
    }
    
    if (this.newProject.name.trim().length < 4) {
      this.errorMessage = 'Le nom doit comporter au moins 4 caractères';
      return;
    }
    
    if (!this.newProject.description.trim()) {
      this.errorMessage = 'La description du projet est obligatoire';
      return;
    }
    
    if (!this.newProject.status) {
      this.errorMessage = 'Le statut du projet est obligatoire';
      return;
    }
    
    // Créer le projet
    const project: Project = {
      id: Date.now(),
      name: this.newProject.name,
      description: this.newProject.description,
      status: this.newProject.status,
      tasks: [...this.tasks] // Créer une copie du tableau des tâches
    };
    
    // Émettre l'événement vers le parent
    this.projectAdded.emit(project);
    
    // Afficher le message de succès
    this.successMessage = `Le projet « ${this.newProject.name} » a été créé avec succès !`;
    
 
  }

  // Réinitialiser le formulaire via le bouton
  onReset(projectForm: any) {
    if (projectForm && projectForm.resetForm) {
      projectForm.resetForm();
    }
    this.resetForm();
  }

}