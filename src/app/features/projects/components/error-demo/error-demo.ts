import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormBuilder, ReactiveFormsModule, Validators, FormArray } from '@angular/forms';
import { ValidationService } from '../services/validation';
import { ShowErrorDirective } from '../../../../directives/show-error';
import { CustomValidators } from '../../../../core/validators/custom-validators';

@Component({
  selector: 'app-error-demo',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ShowErrorDirective],
  templateUrl: './error-demo.html',
})
export class ErrorDemoComponent implements OnInit {
  demoForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    public validation: ValidationService, // 4. Service public pour utilisation dans template
  ) {}

  ngOnInit(): void {
    this.demoForm = this.fb.group(
      {
        nom: ['', [Validators.required, Validators.minLength(3)]],
        email: ['', [Validators.required, Validators.email]],
        age: ['', [Validators.required, Validators.min(18), Validators.max(99)]],
        password: ['', [Validators.required, CustomValidators.passwordStrengthValidator()]],
        confirmPassword: ['', [Validators.required]],
      },
      { validators: CustomValidators.matchPasswordValidator('password', 'confirmPassword') },
    );
  }

  get nom() {
    return this.demoForm.get('nom');
  }
  get email() {
    return this.demoForm.get('email');
  }
  get age() {
    return this.demoForm.get('age');
  }
  get password() {
    return this.demoForm.get('password');
  }
  get confirmPassword() {
    return this.demoForm.get('confirmPassword');
  }

  onSubmit(): void {
    if (this.demoForm.valid) {
      alert('Formulaire valide !');
      console.log(this.demoForm.value);
    } else {
      this.demoForm.markAllAsTouched();
    }
  }
}
