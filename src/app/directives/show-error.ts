import { Directive, Input, TemplateRef, ViewContainerRef, OnInit, OnDestroy } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { Subscription } from 'rxjs';

@Directive({
  selector: '[appShowError]',
  standalone: true,
})
export class ShowErrorDirective implements OnInit, OnDestroy {
  private subscription: Subscription | null = null;

  @Input('appShowError') control: AbstractControl | null = null;
  @Input() errorType: string = '';

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
  ) {}

  ngOnInit(): void {
    if (!this.control) return;

    // Initial check
    this.updateView();

    // 3. S'abonner aux changements de statut
    this.subscription = this.control.statusChanges.subscribe(() => {
      this.updateView();
    });

    // Écouter aussi les changements de value (pour les erreurs async)
    this.subscription.add(
      this.control.valueChanges.subscribe(() => {
        this.updateView();
      }),
    );
  }

  private updateView(): void {
    if (!this.control) {
      this.viewContainer.clear();
      return;
    }

    const hasError = this.control.touched && this.control.hasError(this.errorType);

    if (hasError) {
      // Afficher le template
      if (this.viewContainer.length === 0) {
        this.viewContainer.createEmbeddedView(this.templateRef);
      }
    } else {
      // Cacher le template
      this.viewContainer.clear();
    }
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
