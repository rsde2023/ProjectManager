import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  // Liste simulée des emails déjà existants
  private existingEmails: string[] = [
    'admin@example.com',
    'user@example.com',
    'test@example.com',
    'john.doe@example.com',
    'jane.doe@example.com',
    'contact@example.com',
    'info@example.com',
  ];

  /**
   * Vérifie si un email existe déjà (simule un appel API)
   * @param email L'email à vérifier
   * @returns Observable<boolean> - true si l'email existe, false sinon
   */
  checkEmailExists(email: string): Observable<boolean> {
    const normalizedEmail = email.trim().toLowerCase();

    // Simule un délai réseau de 1.5 secondes
    return of(this.existingEmails.includes(normalizedEmail)).pipe(
      delay(1500), // Délai simulé pour montrer le chargement
    );
  }

  /**
   * Ajouter un email à la liste (pour les tests)
   */
  addEmail(email: string): void {
    const normalizedEmail = email.trim().toLowerCase();

    if (normalizedEmail && !this.existingEmails.includes(normalizedEmail)) {
      this.existingEmails.push(normalizedEmail);
    }
  }
}
