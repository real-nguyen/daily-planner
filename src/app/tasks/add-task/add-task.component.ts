import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html'
})
export class AddTaskComponent implements OnInit {
  task: string;
  type = "Priority";
  types = ["Priority", "Recurrent", "Free Time"];
  colorMap = {
    "Priority": "red",
    "Recurrent": "blue",
    "Free Time": "black"
  };
  hoursRequired: number;
  done: boolean;
  note: string;
  private mode = 'create';

  constructor() {
  }

  ngOnInit() {

  }
}
