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
            type: task.type,
            color: task.color,
            done: task.done,
            hoursRequired: task.hoursRequired
          }
        }),
        recurrentTasks: data.recurrentTasks.tasks.map(task => {
          return {
            id: task._id,
            task: task.task,
            type: task.type,
            color: task.color,
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

  markDone(id: string, checked: boolean) {
    this.http.put(BACKEND_URL + '/' + id, { done: checked }).subscribe();
  }

  deleteTask(id: string) {
    // Return observable so that component can fetch tasks again on subscription
    return this.http.delete(BACKEND_URL + '/' + id);
  }

  addTask(task: Task) {
    return this.http.post<{ message: string }>(BACKEND_URL, task);
  }

  getPriorityTasksObservable() {
    return this.priorityTasksObservable.asObservable();
  }

  getRecurrentTasksObservable() {
    return this.recurrentTasksObservable.asObservable();
  }
}
