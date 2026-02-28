import { Directive, ElementRef, effect, input } from '@angular/core';

@Directive({
  selector: '[appHighlightStatus]',
  standalone: true
})
export class HighlightStatusDirective {
  appHighlightStatus = input<string>('');

  constructor(private el: ElementRef) {
    effect(() => {
      switch (this.appHighlightStatus()) {
        case 'completed':
          this.el.nativeElement.style.backgroundColor = '#f0fdf4';
          break;
        case 'In Progress':
          this.el.nativeElement.style.backgroundColor = '#eff6ff';
          break;
        case 'pending':
          this.el.nativeElement.style.backgroundColor = '#fffbeb';
          break;
        default:
          this.el.nativeElement.style.backgroundColor = 'transparent';
      }
    });
  }
}