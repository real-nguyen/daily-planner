import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Task } from '../models/task.model';
import { map } from 'rxjs/operators';
import { Subject } from 'rxjs';

const BACKEND_URL = environment.apiUrl + '/tasks';

@Injectable({ providedIn: 'root' })
export class TasksService {
  private priorityTasks: Task[] = [];
  private recurrentTasks: Task[] = [];
  private priorityTasksObservable = new Subject<{tasks: Task[]}>();
  private recurrentTasksObservable = new Subject<{tasks: Task[]}>();

  constructor(private http: HttpClient) {}

  fetchTasks() {
    this.http.get<{ priorityTasks: any, recurrentTasks: any }>(BACKEND_URL)
    .pipe(map(data => {
      return {
        priorityTasks: data.priorityTasks.tasks.map(task => {
          return {
            id: task._id,
            task: task.task,
            type: task.type.type,
            color: task.type.color,
            done: task.done,
            hoursRequired: task.hoursRequired
          }
        }),
        recurrentTasks: data.recurrentTasks.tasks.map(task => {
          return {
            id: task._id,
            task: task.task,
            type: task.type.type,
            color: task.type.color,
            done: task.done,
            hoursRequired: task.hoursRequired
          }
        })
      }
    }))
    .subscribe(res => {
      this.priorityTasks = res.priorityTasks;
      this.recurrentTasks = res.recurrentTasks;
      this.priorityTasksObservable.next({
        tasks: [...this.priorityTasks]
      });
      this.recurrentTasksObservable.next({
        tasks: [...this.recurrentTasks]
      });
    });
  }

  getPriorityTasksObservable() {
    return this.priorityTasksObservable.asObservable();
  }

  getRecurrentTasksObservable() {
    return this.recurrentTasksObservable.asObservable();
  }
}