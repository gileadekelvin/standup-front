import { Task } from '../Task/Task';

export type TaskListProps = {
  title: string;
  color: string;
  tasks: readonly (Task | null)[] | null;
};
