import { Component, OnInit } from '@angular/core';

import { Goal } from '../models/goal.model';

@Component({
  selector: 'app-goals',
  templateUrl: './goals.component.html',
  styleUrls: ['./goals.component.scss']
})
export class GoalsComponent implements OnInit {
  goals: Goal[];

  constructor() { }

  ngOnInit() {
    const dummyList = [
      {goal: 'Do this', done: true},
      {goal: 'Then do that', done: false},
      {goal: 'And finish', done: false}
    ];
    this.goals = dummyList;
  }

  onCheck(event: Event) {
    const isChecked = (event.target as HTMLInputElement).checked;
    if (isChecked) {

    } else {

    }
  }
}
