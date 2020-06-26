import { Component, OnInit, OnDestroy } from '@angular/core';
import { TasksService } from './tasks.service';
import { Task } from '../models/task.model';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit, OnDestroy {
  priorityTasks: Task[];
  recurrentTasks: Task[];
  totalTaskHours = 0;
  private priorityTasksSub: Subscription;
  private recurrentTasksSub: Subscription;

  constructor(private tasksService: TasksService) { }

  ngOnInit() {
    this.tasksService.fetchTasks();
    this.priorityTasksSub = this.tasksService.getPriorityTasksObservable().subscribe(data => {
      this.priorityTasks = data.tasks;
      this.priorityTasks.forEach(task => this.totalTaskHours += task.hoursRequired);
    });
    this.priorityTasksSub = this.tasksService.getRecurrentTasksObservable().subscribe(data => {
      this.recurrentTasks = data.tasks;
      this.recurrentTasks.forEach(task => this.totalTaskHours += task.hoursRequired);
    });
  }

  ngOnDestroy() {
    this.priorityTasksSub.unsubscribe();
    this.recurrentTasksSub.unsubscribe();
    this.totalTaskHours = 0;
  }

  onCheck(event: Event, id: string) {
    const isChecked = (event.target as HTMLInputElement).checked;
    this.tasksService.markDone(id, isChecked);
  }

  deleteTask(id: string) {
    this.tasksService.deleteTask(id).subscribe(() => {
      this.tasksService.fetchTasks();
    });
  }

  onAddClick() {

  }

}
