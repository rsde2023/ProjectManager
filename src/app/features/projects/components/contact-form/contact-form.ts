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
      email: new FormControl('', [Validators.required, Validators.email])
    });
  }

  // Getter pour faciliter l'accès au contrôle email dans le template
  get email() {
    return this.contactForm.get('email');
  }

  onSubmit(): void {
    console.log('Formulaire soumis:', this.contactForm.value);
  }
}