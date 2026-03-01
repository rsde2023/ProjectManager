import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
    name: 'priorityColor',
})
export class PriorityColorPipe implements PipeTransform {
    transform(priority: string): string {
        switch (priority.toLowerCase()) {
            case 'high':
                return 'text-red-500';
            case 'medium':
                return 'text-orange-500';
            case 'low':
                return 'text-green-500';
            default:
                return 'text-gray-500';
        }
    }
}