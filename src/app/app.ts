import { Component } from '@angular/core';
import { ProjectListComponent } from './features/projects/components/project-list/project-list';

@Component({
  selector: 'app-root',
  imports: [ProjectListComponent], 
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  title = 'project-manager';
}