import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'priorityColor',
})
export class PriorityColorPipe implements PipeTransform {
  transform(priority: string) {
    switch (priority?.toLowerCase()) {
      case 'high':
        return { 'bg-red-100': true, 'text-red-700': true };
      case 'medium':
        return { 'bg-orange-100': true, 'text-orange-700': true };
      case 'low':
        return { 'bg-green-100': true, 'text-green-700': true };
      default:
        return { 'bg-gray-100': true, 'text-gray-600': true };
    }
  }
}
