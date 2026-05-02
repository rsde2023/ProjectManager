import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './contact-form.html',
})
export class ContactFormComponent implements OnInit {
  contactForm!: FormGroup;

  ngOnInit(): void {
    // Créer le FormGroup avec un FormControl "email"
    this.contactForm = new FormGroup({
      nom: new FormControl('', [Validators.required, Validators.minLength(2)]),
      prenom: new FormControl('', [Validators.required, Validators.minLength(2)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      telephone: new FormControl('', [Validators.pattern('0[1-9][0-9]{8}')]),
      message: new FormControl('', [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(200),
      ]),
    });
  }

  // Getter pour faciliter l'accès au contrôle email dans le template
  get nom() {
    return this.contactForm.get('nom');
  }

  get prenom() {
    return this.contactForm.get('prenom');
  }

  get email() {
    return this.contactForm.get('email');
  }

  get telephone() {
    return this.contactForm.get('telephone');
  }

  get message() {
    return this.contactForm.get('message');
  }
  onSubmit(): void {
    console.log('Formulaire soumis:', this.contactForm.value);
    alert('Message envoyé avec succès !');
  }
}
