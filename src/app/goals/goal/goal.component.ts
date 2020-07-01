import { Component, OnInit, Input } from '@angular/core';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { faTrashAlt } from '@fortawesome/free-regular-svg-icons';
import { Goal } from 'src/app/models/goal.model';
import { GoalsService } from '../goals.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-goal',
  templateUrl: './goal.component.html',
  styleUrls: ['./goal.component.scss']
})
export class GoalComponent implements OnInit {
  @Input() goal: Goal;
  editMode = false;
  faEdit = faEdit;
  faTrashAlt = faTrashAlt;

  constructor(private goalsService: GoalsService) { }

  ngOnInit(): void {
  }

  onCheck(event: Event, id: string) {
    const isChecked = (event.target as HTMLInputElement).checked;
    this.goalsService.markDone(id, isChecked);
  }


  onEditClick() {
    this.editMode = true;
  }

  editGoal(form: NgForm) {
    if (form.invalid) {
      return;
    }
    const goal: Goal = {
      id: this.goal.id,
      goal: form.value.goal,
      done: form.value.done
    };
    this.goalsService.editGoal(goal).subscribe(res => {
      form.reset();
      this.editMode = false;
      if (res) {
        this.goalsService.fetchGoals();
      }
    })
  }

  deleteGoal(id: string) {
    this.goalsService.deleteGoal(id).subscribe(() => {
      this.goalsService.fetchGoals();
    });
  }

  cancel(form: NgForm) {
    form.reset();
    this.editMode = false;
  }
}
