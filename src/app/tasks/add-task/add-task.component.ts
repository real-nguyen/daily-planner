import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgForm } from '@angular/forms';
import { Task } from 'src/app/models/task.model';
import { TasksService } from '../tasks.service';

@Component({
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss']
})
export class AddTaskComponent {
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
  mode = 'create';

  constructor(
    public dialogRef: MatDialogRef<AddTaskComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private tasksService: TasksService) {
      this.mode = data.mode;
    }

  onCancelClick() {
    this.dialogRef.close();
  }

  addTask(form: NgForm) {
    if (form.invalid) {
      return;
    }

    if (this.mode === 'create') {
      const data: Task = {
        id: null,
        task: form.value.task,
        type: form.value.type,
        color: this.colorMap[form.value.type],
        hoursRequired: form.value.hoursRequired,
        done: false,
        note: form.value.note
      };
      this.tasksService.addTask(data).subscribe(res => {
        this.dialogRef.close(res.message);
      });
    }
  }
}
