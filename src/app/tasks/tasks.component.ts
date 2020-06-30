import { Component, OnInit, OnDestroy } from '@angular/core';
import { TasksService } from './tasks.service';
import { Task } from '../models/task.model';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { AddTaskComponent } from './add-task/add-task.component';

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

  constructor(private tasksService: TasksService, public dialog: MatDialog) { }

  ngOnInit() {
    this.fetchTasks();
  }

  fetchTasks() {
    this.tasksService.fetchTasks();
    this.priorityTasksSub = this.tasksService.getTasksObservable().subscribe(data => {
      this.priorityTasks = data.priorityTasks;
      this.recurrentTasks = data.recurrentTasks;
      this.totalTaskHours = data.totalTaskHours;
    });
  }

  ngOnDestroy() {
    this.priorityTasksSub.unsubscribe();
    this.recurrentTasksSub.unsubscribe();
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
    const dialogRef = this.dialog.open(AddTaskComponent, {
      width: '40%',
      data: { mode: 'create' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.tasksService.fetchTasks();
      }
    });
  }
}
