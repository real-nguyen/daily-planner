import { Component, OnInit, OnDestroy } from '@angular/core';

import { Goal } from '../models/goal.model';
import { Subscription } from 'rxjs';
import { GoalsService } from './goals.service';

@Component({
  selector: 'app-goals',
  templateUrl: './goals.component.html',
  styleUrls: ['./goals.component.scss']
})
export class GoalsComponent implements OnInit, OnDestroy {
  goals: Goal[];
  private goalsSub: Subscription;

  constructor(private goalsService: GoalsService) { }

  ngOnInit() {
    this.goalsService.fetchGoals();
    this.goalsSub = this.goalsService.getGoalsObservable()
    .subscribe((data: {goals: Goal[]}) => {
      this.goals = data.goals
    });
  }

  ngOnDestroy() {
    this.goalsSub.unsubscribe();
  }

  onCheck(event: Event) {
    const isChecked = (event.target as HTMLInputElement).checked;
    if (isChecked) {

    } else {

    }
  }
}
