export interface Task {
  id: string;
  task: string;
  type: string;
  done?: boolean;
  hoursRequired?: number;
  note?: string;
}
