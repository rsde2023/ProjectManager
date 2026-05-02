import { Directive, ElementRef, effect, input } from '@angular/core';

@Directive({
  selector: '[appHighlightStatus]',
  standalone: true,
})
export class HighlightStatusDirective {
  appHighlightStatus = input<string>('');

  constructor(private el: ElementRef) {
    effect(() => {
      const element = this.el.nativeElement;
      // Reset styles
      element.style.borderLeft = '4px solid transparent';
      switch (this.appHighlightStatus()) {
        case 'completed':
          element.style.borderLeft = '4px solid #22c55e'; // green
          break;
        case 'In Progress':
          element.style.borderLeft = '4px solid #3b82f6'; // blue
          break;
        case 'pending':
          element.style.borderLeft = '4px solid #f59e0b'; // orange
          break;
      }
    });
  }
}
