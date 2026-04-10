import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Project, Task, ProjectStatus } from '../../../../models/project.model';

@Component({
  selector: 'app-edit-project',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './edit-project.html',
})
export class EditProjectComponent implements OnChanges {
  @Input() project: Project | null = null;
  @Output() close = new EventEmitter<void>();
  @Output() projectUpdated = new EventEmitter<Project>();
  
  editProject: Project = {
    id: 0,
    name: '',
    description: '',
    status: '',
    tasks: []
  };
  
  successMessage: string = '';

  statusOptions: ProjectStatus[] = ['pending', 'In Progress', 'completed'];
  priorityOptions: string[] = ['Low', 'Medium', 'High'];

  ngOnChanges(changes: SimpleChanges) {
    if (changes['project'] && this.project) {
      this.editProject = {
        ...this.project,
        tasks: this.project.tasks.map(task => ({ ...task }))
      };
    }
  }

  onSubmit() {
    // Émettre le projet mis à jour (la validation HTML est déjà faite)
    this.projectUpdated.emit(this.editProject);
    this.successMessage = 'Projet modifié avec succès !';
    
    setTimeout(() => {
      this.cancel();
    }, 1500);
  }

  cancel() {
    this.close.emit();
  }

  onModalContentClick(event: MouseEvent) {
    event.stopPropagation();
  }

  removeTask(index: number) {
    this.editProject.tasks.splice(index, 1);
  }

  newTask: Task = {
    title: '',
    priority: 'Medium',
    status: 'pending'
  };

  addTask() {
    if (this.newTask.title.trim()) {
      this.editProject.tasks.push({
        title: this.newTask.title,
        priority: this.newTask.priority,
        status: this.newTask.status
      });
      this.newTask = {
        title: '',
        priority: 'Medium',
        status: 'pending'
      };
    }
  }
}