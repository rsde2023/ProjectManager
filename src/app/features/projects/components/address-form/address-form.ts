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
  selector: 'app-address-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './address-form.html',
})
export class AddressFormComponent implements OnInit {
  // Formulaire principal
  userForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    // 1. Création du FormGroup avec adresse imbriquée et FormArray d'adresses
    this.userForm = this.fb.group({
      // Informations personnelles
      nom: ['', [Validators.required, Validators.minLength(2)]],
      prenom: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],

      // QUESTION 1: Adresse imbriquée (simple)
      adresse: this.fb.group({
        rue: ['', Validators.required],
        codePostal: ['', [Validators.required, Validators.pattern('^[0-9]{5}$')]],
        ville: ['', Validators.required],
        pays: ['France', Validators.required],
      }),

      // QUESTION 2: FormArray d'adresses multiples
      adresses: this.fb.array([this.createAddressGroup()]),
    });
  }

  // ========== GETTERS ==========

  // Getter pour les informations personnelles
  get nom() {
    return this.userForm.get('nom');
  }
  get prenom() {
    return this.userForm.get('prenom');
  }
  get email() {
    return this.userForm.get('email');
  }

  // 3. Getter pour l'adresse imbriquée
  get adresse(): FormGroup {
    return this.userForm.get('adresse') as FormGroup;
  }

  // Getter pour le FormArray d'adresses
  get adresses(): FormArray {
    return this.userForm.get('adresses') as FormArray;
  }

  // ========== QUESTION 1: ADRESSE IMBRIQUÉE ==========

  // Mettre à jour l'adresse (exemple)
  updateAdresse() {
    this.adresse.patchValue({
      rue: '10 Rue de Paris',
      codePostal: '75001',
      ville: 'Paris',
      pays: 'France',
    });
  }

  // ========== QUESTION 2: FORMULAIRES DYNAMIQUES ==========

  // 2. Créer un FormGroup pour une adresse
  createAddressGroup(): FormGroup {
    return this.fb.group({
      type: ['domicile', Validators.required],
      rue: ['', Validators.required],
      codePostal: ['', [Validators.required, Validators.pattern('^[0-9]{5}$')]],
      ville: ['', Validators.required],
    });
  }

  // Ajouter une adresse
  addAddress(): void {
    this.adresses.push(this.createAddressGroup());
  }

  // Supprimer une adresse
  removeAddress(index: number): void {
    if (this.adresses.length > 1) {
      this.adresses.removeAt(index);
    }
  }

  // 3. Vérifier qu'au moins une adresse est requise
  get hasAddressError(): boolean {
    return this.adresses.length === 0;
  }

  // Soumission
  onSubmit(): void {
    if (this.userForm.valid && !this.hasAddressError) {
      console.log('Formulaire soumis:', this.userForm.value);
      alert('Formulaire soumis avec succès !');
    } else {
      this.userForm.markAllAsTouched();
      if (this.hasAddressError) {
        alert('Ajoutez au moins une adresse');
      } else {
        alert('Veuillez remplir correctement tous les champs');
      }
    }
  }

  // Réinitialisation
  resetForm(): void {
    // Réinitialiser avec une seule adresse
    while (this.adresses.length) {
      this.adresses.removeAt(0);
    }
    this.adresses.push(this.createAddressGroup());
    this.userForm.reset();
    this.userForm.patchValue({
      adresse: { pays: 'France' },
    });
  }
}
