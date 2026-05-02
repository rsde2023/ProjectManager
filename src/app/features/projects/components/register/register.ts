import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CustomValidators } from '../../../../core/validators/custom-validators';
import { UserService } from '../services/user';

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

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
  ) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      // Email avec validations synchrones ET asynchrones
      email: this.fb.control('', {
        validators: [Validators.required, Validators.email],
        asyncValidators: [CustomValidators.emailExistsValidator(this.userService)],
        updateOn: 'blur',
      }),
      username: ['', [Validators.required, Validators.minLength(3)]],

      // Groupe des mots de passe
      passwords: this.fb.group(
        {
          password: ['', [Validators.required, CustomValidators.passwordStrengthValidator()]],
          confirmPassword: ['', [Validators.required]],
        },
        { validators: CustomValidators.matchPasswordValidator('password', 'confirmPassword') },
      ),
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

  // Vérifier si la validation asynchrone est en cours
  get isEmailChecking(): boolean {
    return this.email?.status === 'PENDING';
  }

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
        username: this.username?.value,
        email: this.email?.value,
        password: this.password?.value,
      };
      console.log('Formulaire soumis:', formValue);

      // Ajouter l'email à la liste des existants pour les tests futurs
      this.userService.addEmail(this.email?.value);

      alert('Inscription réussie !');
      this.registerForm.reset();
    } else {
      this.registerForm.markAllAsTouched();
    }
  }
}
