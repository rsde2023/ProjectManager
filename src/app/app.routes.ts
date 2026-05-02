import { Routes } from '@angular/router';
import { ContactFormComponent } from './features/projects/components/contact-form/contact-form';
import { ProjectListComponent } from './features/projects/components/project-list/project-list';
import { LayoutComponent } from './features/projects/components/layout/layout';
export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', redirectTo: 'projects', pathMatch: 'full' },
      { path: 'projects', component: ProjectListComponent },
      { path: 'contact', component: ContactFormComponent }
    ]
  },
  {path: '**', redirectTo: 'projects'  }
];