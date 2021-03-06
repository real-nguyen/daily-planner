import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { Goal } from '../models/goal.model'
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';

const BACKEND_URL = environment.apiUrl + '/goals';

@Injectable({ providedIn: 'root' })
export class GoalsService {
  private goals: Goal[] = [];
  private goalsObservable = new Subject<{goals: Goal[]}>();

  constructor(private http: HttpClient) {}

  getGoalsObservable() {
    return this.goalsObservable.asObservable();
  }

  fetchGoals() {
    this.http
    .get<{goals: any}>(BACKEND_URL)
    .pipe(
      map(data => {
        return {
          goals: data.goals.map(goal => {
            return {
              id: goal._id,
              goal: goal.goal,
              done: goal.done
            }
          })
        }
      })
    )
    .subscribe(res => {
      this.goals = res.goals;
      this.goalsObservable.next({
        goals: [...this.goals]
      });
    });
  }

  addGoal(goal: string) {
    const data = {
      goal: goal,
      done: false
    };
    this.http.post<{ id: string, goal: string, done: boolean }>(BACKEND_URL, data)
    .subscribe(res => {
      const transformedGoal = {
        id: res.id,
        goal: res.goal,
        done: res.done
      };
      this.goals.push(transformedGoal);
      this.goalsObservable.next({
        goals: [...this.goals]
      });
    });
  }

  markDone(id: string, checked: boolean) {
    this.http.post(BACKEND_URL + '/' + id, { done: checked }).subscribe();
  }

  editGoal(goal: Goal) {
    return this.http.patch<{ message: string }>(BACKEND_URL + '/' + goal.id, { goal: goal });
  }

  deleteGoal(id: string) {
    // Return observable so that component can fetch goals again on subscription
    return this.http.delete(BACKEND_URL + '/' + id);
  }
}
