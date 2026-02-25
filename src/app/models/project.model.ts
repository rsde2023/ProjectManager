type ProjectStatus = 'pending' | 'In Progress' | 'completed';

interface Project {
  name: string;
  description: string;
  status: string;
  tasks: Task[];
}
interface Task {
  title: string;
  priority: string;
  status: ProjectStatus;
}
 interface StatusStyle {
  bgColor?: string;      // For header bar (projects)
  badgeBg: string;       // For status badge background
  badgeText: string;     // For status badge text
  dotClass?: string;     // For task dot indicator
  label: string;         // Display label
}
interface PriorityStyle {
  bgClass: string;
  textClass: string;
}