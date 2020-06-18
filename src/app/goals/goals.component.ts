import { Component, OnInit, OnDestroy } from '@angular/core';

import { Goal } from '../models/goal.model';
import { Subscription } from 'rxjs';
import { GoalsService } from './goals.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-goals',
  templateUrl: './goals.component.html',
  styleUrls: ['./goals.component.scss']
})
export class GoalsComponent implements OnInit, OnDestroy {
  goals: Goal[];
  editMode = false;
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

  onCheck(event: Event, id: string) {
    const isChecked = (event.target as HTMLInputElement).checked;
    this.goalsService.markDone(id, isChecked);
  }

  onAddClick() {
    this.editMode = true;
  }

  addGoal(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.goalsService.addGoal(form.value.goal);
    form.reset();
    this.editMode = false;
  }

  cancel(form: NgForm) {
    form.reset();
    this.editMode = false;
  }
}
