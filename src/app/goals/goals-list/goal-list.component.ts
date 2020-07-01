import { Component, OnInit, OnDestroy } from '@angular/core';

import { Goal } from '../../models/goal.model';
import { Subscription } from 'rxjs';
import { GoalsService } from '../goals.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-goal-list',
  templateUrl: './goal-list.component.html',
  styleUrls: ['./goal-list.component.scss']
})
export class GoalListComponent implements OnInit, OnDestroy {
  goals: Goal[];
  addMode = false;
  private goalsSub: Subscription;

  constructor(private goalsService: GoalsService) { }

  ngOnInit() {
    this.goalsService.fetchGoals();
    this.goalsSub = this.goalsService.getGoalsObservable()
    .subscribe((data: {goals: Goal[]}) => {
      this.goals = data.goals;
    });
  }

  ngOnDestroy() {
    this.goalsSub.unsubscribe();
  }

  onAddClick() {
    this.addMode = true;
  }

  addGoal(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.goalsService.addGoal(form.value.goal);
    form.reset();
    this.addMode = false;
  }

  cancel(form: NgForm) {
    form.reset();
    this.addMode = false;
  }

}
