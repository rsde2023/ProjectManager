import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormGroup,
  FormBuilder,
  ReactiveFormsModule,
  Validators,
  FormArray,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';

@Component({
  selector: 'app-dynamic-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './dynamic-form.html',
})
export class DynamicFormComponent implements OnInit {
  // Formulaire principal
  dynamicForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    // 1. Création du FormGroup avec FormArray
    this.dynamicForm = this.fb.group(
      {
        // FormArray pour les emails
        emails: this.fb.array([this.createEmailControl()]),
        // FormArray pour les compétences
        competences: this.fb.array([this.createCompetenceControl()]),
      },
      { validators: this.minCompetencesValidator(3) },
    ); // Validation personnalisée
  }

  // ========== PARTIE EMAILS ==========

  // 2. Méthode pour créer un contrôle email
  createEmailControl(): FormGroup {
    return this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      type: ['personnel', Validators.required],
    });
  }

  // 3. Getter pour le FormArray emails
  get emails(): FormArray {
    return this.dynamicForm.get('emails') as FormArray;
  }

  // 4. Ajouter un email
  addEmail(): void {
    this.emails.push(this.createEmailControl());
  }

  // 5. Supprimer un email
  removeEmail(index: number): void {
    if (this.emails.length > 1) {
      this.emails.removeAt(index);
    }
  }

  // ========== PARTIE COMPETENCES ==========

  // Méthode pour créer un contrôle compétence
  createCompetenceControl(): FormGroup {
    return this.fb.group({
      nom: ['', [Validators.required, Validators.minLength(2)]],
      niveau: [3, [Validators.required, Validators.min(1), Validators.max(5)]],
    });
  }

  // Getter pour le FormArray competences
  get competences(): FormArray {
    return this.dynamicForm.get('competences') as FormArray;
  }

  // Ajouter une compétence
  addCompetence(): void {
    this.competences.push(this.createCompetenceControl());
  }

  // Supprimer une compétence
  removeCompetence(index: number): void {
    this.competences.removeAt(index);
  }

  // 2. Validateur personnalisé pour le nombre minimum de compétences
  minCompetencesValidator(min: number) {
    return (group: AbstractControl): ValidationErrors | null => {
      const competences = group.get('competences') as FormArray;
      if (competences && competences.length > 0 && competences.length < min) {
        return { minCompetences: { required: min, actual: competences.length } };
      }
      return null;
    };
  }

  // Vérifier l'erreur de minimum de compétences
  get hasMinCompetencesError(): boolean {
    return this.dynamicForm.errors?.['minCompetences'] && this.competences.length > 0;
  }

  // Soumission du formulaire
  onSubmit(): void {
    if (this.dynamicForm.valid) {
      console.log('Formulaire soumis:', this.dynamicForm.value);
      alert('Formulaire soumis avec succès !');
    } else {
      this.dynamicForm.markAllAsTouched();
      alert('Veuillez remplir correctement tous les champs');
    }
  }

  // Réinitialisation
  resetForm(): void {
    // Réinitialiser avec un seul email et une seule compétence
    while (this.emails.length) {
      this.emails.removeAt(0);
    }
    this.emails.push(this.createEmailControl());

    while (this.competences.length) {
      this.competences.removeAt(0);
    }
    this.competences.push(this.createCompetenceControl());

    this.dynamicForm.reset();
  }
}
