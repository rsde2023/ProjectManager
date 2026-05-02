import {
  AbstractControl,
  ValidationErrors,
  ValidatorFn,
  AsyncValidatorFn,
  FormGroup,
} from '@angular/forms';
import { Observable, of } from 'rxjs';
import { map, catchError, debounceTime, switchMap } from 'rxjs/operators';
import { UserService } from '../../features/projects/components/services/user';

export class CustomValidators {
  /**
   * Validateur synchrone de force du mot de passe
   */
  static passwordStrengthValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value || '';

      const hasUpperCase = /[A-Z]/.test(value);
      const hasLowerCase = /[a-z]/.test(value);
      const hasNumber = /[0-9]/.test(value);
      const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(value);
      const hasMinLength = value.length >= 8;

      const errors: any = {};
      let hasError = false;

      if (!hasUpperCase) {
        errors.uppercase = 'Doit contenir au moins une majuscule';
        hasError = true;
      }
      if (!hasLowerCase) {
        errors.lowercase = 'Doit contenir au moins une minuscule';
        hasError = true;
      }
      if (!hasNumber) {
        errors.number = 'Doit contenir au moins un chiffre';
        hasError = true;
      }
      if (!hasSpecialChar) {
        errors.specialChar = 'Doit contenir au moins un caractère spécial';
        hasError = true;
      }
      if (!hasMinLength) {
        errors.minLength = 'Doit contenir au moins 8 caractères';
        hasError = true;
      }

      return hasError ? { passwordStrength: errors } : null;
    };
  }

  /**
   * Validateur de correspondance des mots de passe
   */
  static matchPasswordValidator(
    passwordControlName: string,
    confirmPasswordControlName: string,
  ): ValidatorFn {
    return (formGroup: AbstractControl): ValidationErrors | null => {
      const password = formGroup.get(passwordControlName);
      const confirmPassword = formGroup.get(confirmPasswordControlName);

      if (!password || !confirmPassword) {
        return null;
      }

      if (password.value !== confirmPassword.value) {
        confirmPassword.setErrors({ ...confirmPassword.errors, mismatch: true });
        return { mismatch: 'Les mots de passe ne correspondent pas' };
      } else {
        if (confirmPassword.errors) {
          const { mismatch, ...otherErrors } = confirmPassword.errors;
          confirmPassword.setErrors(Object.keys(otherErrors).length ? otherErrors : null);
        }
        return null;
      }
    };
  }

  //  VALIDATEUR ASYNCHRONE

  /**
   * Validateur asynchrone pour vérifier si l'email existe déjà
   * @param userService Le service UserService injecté
   * @returns AsyncValidatorFn
   */
  static emailExistsValidator(userService: UserService): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      const normalizedEmail =
        typeof control.value === 'string' ? control.value.trim().toLowerCase() : '';

      // Ne pas valider si le champ est vide ou invalide synchrone
      if (!normalizedEmail || control.errors?.['required'] || control.errors?.['email']) {
        return of(null);
      }

      // Debounce pour éviter trop d'appels (attendre que l'utilisateur finisse de taper)
      return of(normalizedEmail).pipe(
        debounceTime(500), // Attend 500ms après la dernière frappe
        switchMap((email) => userService.checkEmailExists(email)),
        map((exists) => {
          return exists ? { emailExists: true } : null;
        }),
        catchError(() => of(null)), // En cas d'erreur, on ne bloque pas le formulaire
      );
    };
  }
}
