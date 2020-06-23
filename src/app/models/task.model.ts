export interface Task {
  id: string;
  task: string;
  type: string;
  // From TaskType
  color: string;
  done: boolean;
  hoursRequired: number;
}
