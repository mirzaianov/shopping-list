import type { Task } from '../../types';
import SortableTaskList from './sortable-task-list';

interface TaskListProps {
  tasks: Task[];
}

export default function TaskList({ tasks }: TaskListProps) {
  return <SortableTaskList tasks={tasks} />;
}
