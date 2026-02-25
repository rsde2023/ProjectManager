import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';
@Component({
  selector: 'app-details',
  imports: [CommonModule],
  templateUrl: './details.html',
})
export class Details {
  @Input() project! : Project;
  @Output() close = new EventEmitter<void>();
 closeModal() {
   console.log('closeModal() called in Details component');
    console.log('Emitting close event...');
    this.close.emit();
  }

}
