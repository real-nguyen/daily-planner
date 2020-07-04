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
  private freeTimeTasks: Task[] = [];
  private tasksObservable = new Subject<{
    priorityTasks: Task[],
    recurrentTasks: Task[],
    totalTaskHours: number
  }>();
  private freeTimeTasksObservable = new Subject<{freeTimeTasks: Task[]}>();

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
            done: task.done,
            hoursRequired: task.hoursRequired,
            note: task.note
          }
        }),
        recurrentTasks: data.recurrentTasks.tasks.map(task => {
          return {
            id: task._id,
            task: task.task,
            type: task.type,
            done: task.done,
            hoursRequired: task.hoursRequired,
            note: task.note
          }
        })
      }
    }))
    .subscribe(res => {
      this.priorityTasks = res.priorityTasks;
      this.recurrentTasks = res.recurrentTasks;
      // let is reassignable, const is not
      let totalTaskHours = 0;
      this.priorityTasks.forEach(task => totalTaskHours += task.hoursRequired);
      this.recurrentTasks.forEach(task => totalTaskHours += task.hoursRequired);
      this.tasksObservable.next({
        priorityTasks: [...this.priorityTasks],
        recurrentTasks: [...this.recurrentTasks],
        totalTaskHours: totalTaskHours
      });
    });
  }

  fetchFreeTimeTasks() {
    this.http.get<{ freeTimeTasks: any }>(BACKEND_URL + '/free-time')
    .pipe(map(data => {
      console.log(data)
      return {
        freeTimeTasks: data.freeTimeTasks.map(task => {
          return {
            id: task._id,
            task: task.task,
            type: task.type,
            done: task.done,
            hoursRequired: task.hoursRequired,
            note: task.note
          }
        })
      }
    }))
    .subscribe(res => {
      console.log(res);
      this.freeTimeTasks = res.freeTimeTasks;
      this.freeTimeTasksObservable.next({
        freeTimeTasks: [...this.freeTimeTasks]
      });
    });
  }

  markDone(id: string, checked: boolean) {
    this.http.post(BACKEND_URL + '/' + id, { done: checked }).subscribe();
  }

  deleteTask(id: string) {
    // Return observable so that component can fetch tasks again on subscription
    return this.http.delete(BACKEND_URL + '/' + id);
  }

  addTask(task: Task) {
    return this.http.post<{ message: string }>(BACKEND_URL, task);
  }

  editTask(task: Task) {
    return this.http.patch<{ message: string }>(BACKEND_URL + '/' + task.id, {task: task});
  }

  getTasksObservable() {
    return this.tasksObservable.asObservable();
  }

  getFreeTimeTasksObservable() {
    return this.freeTimeTasksObservable.asObservable();
  }
}
