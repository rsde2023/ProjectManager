import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CustomValidators } from '../../../../core/validators/custom-validators';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './register.html',

})
export class RegisterComponent implements OnInit {
  
  registerForm!: FormGroup;
  showPassword = false;
  showConfirmPassword = false;
  
  constructor(private fb: FormBuilder) {}
  
  ngOnInit(): void {
    this.registerForm = this.fb.group({
      // Champs standards
      username: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      
      // Groupe des mots de passe (avec validation personnalisée)
      passwords: this.fb.group({
        password: ['', [Validators.required, CustomValidators.passwordStrengthValidator()]],
        confirmPassword: ['', [Validators.required]]
      }, { validators: CustomValidators.matchPasswordValidator('password', 'confirmPassword') })
    });
  }
  
  // Getters pour faciliter l'accès
  get username() {
    return this.registerForm.get('username');
  }
  
  get email() {
    return this.registerForm.get('email');
  }
  
  get passwords() {
    return this.registerForm.get('passwords') as FormGroup;
  }
  
  get password() {
    return this.passwords.get('password');
  }
  
  get confirmPassword() {
    return this.passwords.get('confirmPassword');
  }
  
  // Méthode pour obtenir les erreurs de force du mot de passe
  getPasswordStrengthErrors(): string[] {
    const errors = this.password?.errors?.['passwordStrength'];
    if (!errors) return [];
    
    const errorMessages: string[] = [];
    if (errors.uppercase) errorMessages.push(errors.uppercase);
    if (errors.lowercase) errorMessages.push(errors.lowercase);
    if (errors.number) errorMessages.push(errors.number);
    if (errors.specialChar) errorMessages.push(errors.specialChar);
    if (errors.minLength) errorMessages.push(errors.minLength);
    
    return errorMessages;
  }
  
  // Vérifier la force du mot de passe (pourcentage)
  getPasswordStrength(): number {
    const value = this.password?.value || '';
    let strength = 0;
    
    if (/[A-Z]/.test(value)) strength += 20;
    if (/[a-z]/.test(value)) strength += 20;
    if (/[0-9]/.test(value)) strength += 20;
    if (/[!@#$%^&*(),.?":{}|<>]/.test(value)) strength += 20;
    if (value.length >= 8) strength += 20;
    
    return strength;
  }
  
  getPasswordStrengthColor(): string {
    const strength = this.getPasswordStrength();
    if (strength <= 40) return 'bg-red-500';
    if (strength <= 60) return 'bg-orange-500';
    if (strength <= 80) return 'bg-yellow-500';
    return 'bg-green-500';
  }
  
  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
  
  toggleConfirmPasswordVisibility() {
    this.showConfirmPassword = !this.showConfirmPassword;
  }
  
  onSubmit() {
    if (this.registerForm.valid) {
      const formValue = {
        username: this.registerForm.get('username')?.value,
        email: this.registerForm.get('email')?.value,
        password: this.passwords.get('password')?.value
      };
      console.log('Formulaire soumis:', formValue);
      alert('Inscription réussie !');
    } else {
      // Marquer tous les champs comme touchés pour afficher les erreurs
      this.registerForm.markAllAsTouched();
    }
  }
}