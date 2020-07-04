import { Component, OnInit, OnDestroy } from '@angular/core';
import { Task } from '../models/task.model';
import { TasksService } from '../tasks/tasks.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-free-time',
  templateUrl: './free-time.component.html',
  styleUrls: ['./free-time.component.scss']
})
export class FreeTimeComponent implements OnInit, OnDestroy {
  freeTimeTasks: Task[];
  private freeTimeTasksSub: Subscription;

  constructor(private tasksService: TasksService) { }

  ngOnInit() {
    this.tasksService.fetchFreeTimeTasks();
    this.freeTimeTasksSub = this.tasksService.getFreeTimeTasksObservable().subscribe(data => {
      this.freeTimeTasks = data.freeTimeTasks;
    });
  }

  ngOnDestroy() {
    this.freeTimeTasksSub.unsubscribe();
  }
}
