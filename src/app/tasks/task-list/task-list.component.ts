import { Component, OnInit, OnDestroy } from '@angular/core';
import { TasksService } from '../tasks.service';
import { Task } from '../../models/task.model';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { AddTaskComponent } from '../add-task/add-task.component';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit, OnDestroy {
  priorityTasks: Task[];
  recurrentTasks: Task[];
  totalTaskHours = 0;
  private tasksSub: Subscription;

  constructor(private tasksService: TasksService, public dialog: MatDialog) { }

  ngOnInit() {
    this.tasksService.fetchTasks();
    this.tasksSub = this.tasksService.getTasksObservable().subscribe(data => {
      this.priorityTasks = data.priorityTasks;
      this.recurrentTasks = data.recurrentTasks;
      this.totalTaskHours = data.totalTaskHours;
    });
  }

  ngOnDestroy() {
    this.tasksSub.unsubscribe();
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
