import { AbstractControl, ValidationErrors, ValidatorFn, FormGroup } from '@angular/forms';

export class CustomValidators {
  static passwordStrengthValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value || '';

      // Vérifications
      const hasUpperCase = /[A-Z]/.test(value);
      const hasLowerCase = /[a-z]/.test(value);
      const hasNumber = /[0-9]/.test(value);
      const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(value);
      const hasMinLength = value.length >= 8;

      // Objet des erreurs
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
        errors.specialChar = 'Doit contenir au moins un caractère spécial (!@#$%^&*(),.?":{}|<>)';
        hasError = true;
      }
      if (!hasMinLength) {
        errors.minLength = 'Doit contenir au moins 8 caractères';
        hasError = true;
      }

      // Retourner l'objet d'erreur si des conditions ne sont pas remplies
      return hasError ? { passwordStrength: errors } : null;
    };
  }

  /**
   * Validateur de correspondance des mots de passe
   * Vérifie que password et confirmPassword sont identiques
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

      const passwordValue = password.value;
      const confirmPasswordValue = confirmPassword.value;

      if (passwordValue !== confirmPasswordValue) {
        // Ajouter l'erreur sur le confirmPassword
        confirmPassword.setErrors({ ...confirmPassword.errors, mismatch: true });
        return { mismatch: 'Les mots de passe ne correspondent pas' };
      } else {
        // Supprimer l'erreur mismatch si les mots de passe correspondent
        if (confirmPassword.errors) {
          const { mismatch, ...otherErrors } = confirmPassword.errors;
          confirmPassword.setErrors(Object.keys(otherErrors).length ? otherErrors : null);
        }
        return null;
      }
    };
  }

  /**
   * Version alternative : validateur qui retourne l'erreur sur le FormGroup
   */
  static matchPasswordValidatorV2(
    passwordControlName: string,
    confirmPasswordControlName: string,
  ): ValidatorFn {
    return (group: AbstractControl): ValidationErrors | null => {
      const password = group.get(passwordControlName)?.value;
      const confirmPassword = group.get(confirmPasswordControlName)?.value;

      return password === confirmPassword ? null : { mismatch: true };
    };
  }
}
