import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class ValidationService {
  // 1. Méthode principale pour obtenir le message d'erreur
  getErrorMessage(control: AbstractControl | null): string {
    if (!control || !control.errors || !control.touched) {
      return '';
    }

    const errors = control.errors;

    // Ordre de priorité des erreurs
    if (errors['required']) {
      return 'Ce champ est obligatoire';
    }
    if (errors['email']) {
      return 'Veuillez entrer une adresse email valide (ex: nom@domaine.com)';
    }
    if (errors['minlength']) {
      const requiredLength = errors['minlength'].requiredLength;
      return `Ce champ doit contenir au moins ${requiredLength} caractères`;
    }
    if (errors['maxlength']) {
      const requiredLength = errors['maxlength'].requiredLength;
      return `Ce champ ne peut pas dépasser ${requiredLength} caractères`;
    }
    if (errors['min']) {
      const min = errors['min'].min;
      return `La valeur minimale est ${min}`;
    }
    if (errors['max']) {
      const max = errors['max'].max;
      return `La valeur maximale est ${max}`;
    }
    if (errors['pattern']) {
      return 'Format invalide';
    }

    // 2. Erreurs personnalisées
    if (errors['passwordStrength']) {
      const strengthErrors = errors['passwordStrength'];
      const messages: string[] = [];
      if (strengthErrors.minLength) messages.push('8 caractères minimum');
      if (strengthErrors.uppercase) messages.push('une majuscule');
      if (strengthErrors.lowercase) messages.push('une minuscule');
      if (strengthErrors.number) messages.push('un chiffre');
      if (strengthErrors.specialChar) messages.push('un caractère spécial (!@#$%^&*...)');
      return `Mot de passe faible: ${messages.join(', ')}`;
    }

    if (errors['mismatch']) {
      return 'Les mots de passe ne correspondent pas';
    }

    if (errors['emailExists']) {
      return 'Cet email existe déjà. Veuillez en utiliser un autre';
    }

    if (errors['minCompetences']) {
      const required = errors['minCompetences'].required;
      const actual = errors['minCompetences'].actual;
      return `Ajoutez au moins ${required} compétences (actuellement: ${actual})`;
    }

    return 'Champ invalide';
  }

  // 3. Méthode pour vérifier si un contrôle a une erreur spécifique ET est touché
  hasError(control: AbstractControl | null, errorType: string): boolean {
    if (!control) return false;
    return control.touched && control.hasError(errorType);
  }

  // Méthode utilitaire pour obtenir la première erreur
  getFirstError(control: AbstractControl | null): string | null {
    if (!control || !control.errors || !control.touched) return null;
    const errorKeys = Object.keys(control.errors);
    if (errorKeys.length === 0) return null;
    return this.getErrorMessage(control);
  }
}
