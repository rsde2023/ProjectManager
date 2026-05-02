import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './user-form.html'
})
export class UserFormComponent implements OnInit {
  
  // Déclaration du FormGroup
  userForm!: FormGroup;
  
  // 1. Injection de FormBuilder dans le constructeur
  constructor(private fb: FormBuilder) {}
  
  ngOnInit(): void {
    // 2. Création du FormGroup avec FormBuilder
    this.userForm = this.fb.group({
      nom: ['', [Validators.required, Validators.minLength(2)]],
      prenom: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      age: ['', [Validators.required, Validators.min(18), Validators.max(100)]],
      ville: ['', [Validators.required, Validators.minLength(2)]]
    });
  }
  
  // 3. Getters pour chaque contrôle (méthodes utilitaires)
  get nom() {
    return this.userForm.get('nom');
  }
  
  get prenom() {
    return this.userForm.get('prenom');
  }
  
  get email() {
    return this.userForm.get('email');
  }
  
  get age() {
    return this.userForm.get('age');
  }
  
  get ville() {
    return this.userForm.get('ville');
  }
  
  // 4. Méthode pour marquer tous les champs comme "touched"
  markFormGroupTouched() {
    Object.keys(this.userForm.controls).forEach(key => {
      const control = this.userForm.get(key);
      control?.markAsTouched();
    });
  }
  
  // 5. Méthode pour réinitialiser le formulaire
  resetForm() {
    this.userForm.reset();
  }
  
  // Soumission du formulaire
  onSubmit() {
    if (this.userForm.valid) {
      console.log('Formulaire soumis:', this.userForm.value);
      alert('Utilisateur créé avec succès !');
      this.resetForm();
    } else {
      this.markFormGroupTouched();
      alert('Veuillez remplir correctement tous les champs');
    }
  }
}