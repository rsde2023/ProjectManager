export type ProjectStatus = 'pending' | 'In Progress' | 'completed';

export interface Project {
  id: number;
  name: string;
  description: string;
  status: string;
  tasks: Task[];
}
export interface Task {
  title: string;
  priority: string;
  status: ProjectStatus;
}
export interface StatusStyle {
  bgColor?: string;      // For header bar (projects)
  badgeBg: string;       // For status badge background
  badgeText: string;     // For status badge text
  dotClass?: string;     // For task dot indicator
  label: string;         // Display label
}
export interface PriorityStyle {
  bgClass: string;
  textClass: string;
}