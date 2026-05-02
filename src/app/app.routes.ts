import { Routes } from '@angular/router';
import { ContactFormComponent } from './features/projects/components/contact-form/contact-form';
import { ProjectListComponent } from './features/projects/components/project-list/project-list';
import { LayoutComponent } from './features/projects/components/layout/layout';
import { RegisterComponent } from './features/projects/components/register/register';
import { UserFormComponent } from './features/projects/components/user-form/user-form';
import { DynamicFormComponent } from './features/projects/components/dynamic-form/dynamic-form';
import { AddressFormComponent } from './features/projects/components/address-form/address-form';
import { ErrorDemoComponent } from './features/projects/components/error-demo/error-demo';
export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', redirectTo: 'projects', pathMatch: 'full' },
      { path: 'projects', component: ProjectListComponent },
      { path: 'contact', component: ContactFormComponent },
      { path: 'register', component: RegisterComponent },
      { path: 'user-form', component: UserFormComponent },
      { path: 'dynamic-form', component: DynamicFormComponent },
      { path: 'address-form', component: AddressFormComponent },
      { path: 'error-demo', component: ErrorDemoComponent }
    ],
  },
  { path: '**', redirectTo: 'projects' },
];
