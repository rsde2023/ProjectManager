import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'priorityColor',
})
export class PriorityColorPipe implements PipeTransform {
  transform(priority: string): string {
    switch (priority?.toLowerCase()) {
          case 'high':
        return 'bg-red-100 text-red-700';
      case 'medium':
        return 'bg-amber-100 text-amber-700';
      case 'low':
        return 'bg-green-100 text-green-700';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  }
}