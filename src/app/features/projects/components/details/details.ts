import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';
@Component({
  selector: 'app-details',
  imports: [CommonModule],
  templateUrl: './details.html',
})
export class Details {
  @Input() project!: Project;
  @Output() close = new EventEmitter<void>();
  closeModal() {
    console.log('closeModal() called in Details component');
    console.log('Emitting close event...');
    this.close.emit();
  }
  getProgress(): number {
    if (this.project.tasks.length === 0) return 0;
    return Math.round((this.project.tasks.filter(t => t.status === 'completed').length / this.project.tasks.length) * 100);
  }

}
